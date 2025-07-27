export interface GraphData {
  nodes: { id: string; [key: string]: any }[]
  links: { source: string; target: string; [key: string]: any }[]
}

class KnowledgeGraphService {
  async getGraphData(): Promise<GraphData> {
    // In a real application, you would fetch this data from your Neo4j database.
    // For now, we'll use some mock data.
    const mockData: GraphData = {
      nodes: [
        { id: 'Fae Intelligence' },
        { id: 'AI Strategy' },
        { id: 'AI Training' },
        { id: 'AI Implementation' },
        { id: 'Manufacturing' },
        { id: 'SMBs' },
      ],
      links: [
        { source: 'Fae Intelligence', target: 'AI Strategy' },
        { source: 'Fae Intelligence', target: 'AI Training' },
        { source: 'Fae Intelligence', target: 'AI Implementation' },
        { source: 'AI Strategy', target: 'Manufacturing' },
        { source: 'AI Training', target: 'Manufacturing' },
        { source: 'AI Implementation', target: 'Manufacturing' },
        { source: 'AI Strategy', target: 'SMBs' },
        { source: 'AI Training', target: 'SMBs' },
        { source: 'AI Implementation', target: 'SMBs' },
      ],
    }

    return Promise.resolve(mockData)
  }
}

export const knowledgeGraphService = new KnowledgeGraphService()
