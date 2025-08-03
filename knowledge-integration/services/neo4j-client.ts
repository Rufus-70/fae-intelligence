import neo4j, { Driver, Session, Result } from 'neo4j-driver';

export interface ContentAsset {
  id: string;
  title: string;
  content: string;
  type: 'blog-post' | 'operational-data' | 'asset' | 'configuration';
  source: string;
  metadata: {
    [key: string]: any;
    extractedAt?: string;
    platform?: string;
  };
}

export interface SearchResult {
  items: ContentAsset[];
  total: number;
  facets?: any;
}

export class Neo4jClient {
  private driver: Driver | null = null;
  private uri: string;
  private username: string;
  private password: string;

  constructor() {
    this.uri = process.env.NEO4J_URI || 'bolt://localhost:7687';
    this.username = process.env.NEO4J_USERNAME || 'neo4j';
    this.password = process.env.NEO4J_PASSWORD || 'password';
  }

  async connect(): Promise<void> {
    if (!this.driver) {
      this.driver = neo4j.driver(
        this.uri,
        neo4j.auth.basic(this.username, this.password),
        {
          maxConnectionPoolSize: 50,
          connectionAcquisitionTimeout: 30000,
          disableLosslessIntegers: true
        }
      );
    }
  }

  async disconnect(): Promise<void> {
    if (this.driver) {
      await this.driver.close();
      this.driver = null;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.connect();
      const session = this.driver!.session();
      await session.run('RETURN 1 as test');
      await session.close();
      return true;
    } catch (error) {
      console.error('Neo4j connection test failed:', error);
      return false;
    }
  }

  async ingestContentAsset(content: ContentAsset): Promise<void> {
    await this.connect();
    const session = this.driver!.session();

    try {
      await session.run(`
        MERGE (c:ContentAsset {id: $id})
        SET c.title = $title,
            c.content = $content,
            c.type = $type,
            c.source = $source,
            c.metadata = $metadata,
            c.updatedAt = datetime()
        RETURN c
      `, {
        id: content.id,
        title: content.title,
        content: content.content,
        type: content.type,
        source: content.source,
        metadata: JSON.stringify(content.metadata)
      });
    } finally {
      await session.close();
    }
  }

  async getContentAsset(id: string): Promise<ContentAsset | null> {
    await this.connect();
    const session = this.driver!.session();

    try {
      const result = await session.run(`
        MATCH (c:ContentAsset {id: $id})
        RETURN c
      `, { id });

      if (result.records.length === 0) {
        return null;
      }

      const record = result.records[0];
      const node = record.get('c').properties;
      
      return {
        id: node.id,
        title: node.title,
        content: node.content,
        type: node.type,
        source: node.source,
        metadata: JSON.parse(node.metadata || '{}')
      };
    } finally {
      await session.close();
    }
  }

  async removeContentAsset(id: string): Promise<void> {
    await this.connect();
    const session = this.driver!.session();

    try {
      await session.run(`
        MATCH (c:ContentAsset {id: $id})
        DETACH DELETE c
      `, { id });
    } finally {
      await session.close();
    }
  }

  async searchContent(query: string, filters: any = {}): Promise<SearchResult> {
    await this.connect();
    const session = this.driver!.session();

    try {
      let cypher = `
        MATCH (c:ContentAsset)
        WHERE c.title CONTAINS $query OR c.content CONTAINS $query
      `;

      const params: any = { query };

      if (filters.source) {
        cypher += ` AND c.source = $source`;
        params.source = filters.source;
      }

      if (filters.type) {
        cypher += ` AND c.type = $type`;
        params.type = filters.type;
      }

      cypher += ` RETURN c ORDER BY c.updatedAt DESC`;

      if (filters.limit) {
        cypher += ` LIMIT $limit`;
        params.limit = parseInt(filters.limit);
      }

      const result = await session.run(cypher, params);

      const items: ContentAsset[] = result.records.map(record => {
        const node = record.get('c').properties;
        return {
          id: node.id,
          title: node.title,
          content: node.content,
          type: node.type,
          source: node.source,
          metadata: JSON.parse(node.metadata || '{}')
        };
      });

      return {
        items,
        total: items.length
      };
    } finally {
      await session.close();
    }
  }

  async updateExtractionMetadata(platform: string, metadata: any): Promise<void> {
    await this.connect();
    const session = this.driver!.session();

    try {
      await session.run(`
        MERGE (m:ExtractionMetadata {platform: $platform})
        SET m += $metadata,
            m.updatedAt = datetime()
        RETURN m
      `, { platform, metadata });
    } finally {
      await session.close();
    }
  }

  async getExtractionMetadata(platform: string): Promise<any> {
    await this.connect();
    const session = this.driver!.session();

    try {
      const result = await session.run(`
        MATCH (m:ExtractionMetadata {platform: $platform})
        RETURN m
      `, { platform });

      if (result.records.length === 0) {
        return null;
      }

      return result.records[0].get('m').properties;
    } finally {
      await session.close();
    }
  }

  async createConflictRecord(conflict: any): Promise<void> {
    await this.connect();
    const session = this.driver!.session();

    try {
      await session.run(`
        CREATE (c:ConflictRecord)
        SET c = $conflict,
            c.createdAt = datetime()
        RETURN c
      `, { conflict });
    } finally {
      await session.close();
    }
  }

  async logSyncError(error: any): Promise<void> {
    await this.connect();
    const session = this.driver!.session();

    try {
      await session.run(`
        CREATE (e:SyncError)
        SET e = $error,
            e.createdAt = datetime()
        RETURN e
      `, { error });
    } finally {
      await session.close();
    }
  }

  async getHealthStatus(): Promise<any> {
    await this.connect();
    const session = this.driver!.session();

    try {
      const result = await session.run(`
        CALL dbms.components() YIELD name, versions, edition
        RETURN name, versions, edition
      `);

      const contentCountResult = await session.run(`
        MATCH (c:ContentAsset)
        RETURN count(c) as totalContent
      `);

      const extractionMetaResult = await session.run(`
        MATCH (m:ExtractionMetadata)
        RETURN m.platform as platform, m.lastExtraction as lastExtraction
        ORDER BY m.updatedAt DESC
        LIMIT 10
      `);

      return {
        connected: true,
        database: result.records[0] ? {
          name: result.records[0].get('name'),
          version: result.records[0].get('versions')[0],
          edition: result.records[0].get('edition')
        } : null,
        contentAssets: contentCountResult.records[0]?.get('totalContent')?.toNumber() || 0,
        recentExtractions: extractionMetaResult.records.map(r => ({
          platform: r.get('platform'),
          lastExtraction: r.get('lastExtraction')
        }))
      };
    } catch (error) {
      return {
        connected: false,
        error: error instanceof Error ? error.message : String(error)
      };
    } finally {
      await session.close();
    }
  }
}