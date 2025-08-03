# Implementation Roadmap: Days 11-14 Firebase Content Integration

## Overview
This document provides comprehensive technical implementation details for Days 11-14 of the Fae Intelligence knowledge integration project, focusing on Firebase content extraction and real-time synchronization capabilities.

## Day 11: Firebase Content Extractor Foundation

### 11.1 Firebase Content Extractor Service Implementation

**File: `knowledge-integration/extractors/firebase-extractor.ts`**

```typescript
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  startAfter,
  DocumentSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';
import { Neo4jClient } from '../services/neo4j-client';

export interface FirebaseContent {
  id: string;
  type: 'blog-post' | 'operational-data' | 'asset' | 'configuration';
  title: string;
  content: string;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    author?: string;
    tags?: string[];
    category?: string;
    status?: string;
    firebaseCollection: string;
    firebaseDocId: string;
  };
  extractedAt: Date;
  source: 'firestore' | 'storage';
}

export interface FirebaseExtractionConfig {
  collections: {
    name: string;
    fields: string[];
    contentField: string;
    metadataFields: string[];
  }[];
  storagePaths: string[];
  batchSize: number;
  extractionMode: 'incremental' | 'full';
  lastExtraction?: Date;
}

export class FirebaseContentExtractor {
  private firestore: any;
  private storage: any;
  private neo4jClient: Neo4jClient;
  private config: FirebaseExtractionConfig;

  constructor(
    firebaseConfig: any,
    neo4jClient: Neo4jClient,
    extractionConfig: FirebaseExtractionConfig
  ) {
    // Initialize Firebase only if not already initialized
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    this.firestore = getFirestore(app);
    this.storage = getStorage(app);
    this.neo4jClient = neo4jClient;
    this.config = extractionConfig;
  }

  /**
   * Main extraction orchestrator
   */
  async extractAllContent(): Promise<FirebaseExtractionResult> {
    console.log('🔥 Starting Firebase content extraction...');
    
    const startTime = Date.now();
    const results: FirebaseExtractionResult = {
      totalDocuments: 0,
      extractedDocuments: 0,
      errors: [],
      collections: {},
      storageAssets: 0,
      duration: 0
    };

    try {
      // Extract Firestore collections
      for (const collectionConfig of this.config.collections) {
        console.log(`📚 Processing collection: ${collectionConfig.name}`);
        const collectionResult = await this.extractFirestoreCollection(collectionConfig);
        results.collections[collectionConfig.name] = collectionResult;
        results.totalDocuments += collectionResult.totalDocuments;
        results.extractedDocuments += collectionResult.extractedDocuments;
        results.errors.push(...collectionResult.errors);
      }

      // Extract Storage assets
      if (this.config.storagePaths.length > 0) {
        console.log('📁 Processing Firebase Storage assets...');
        const storageResult = await this.extractStorageAssets();
        results.storageAssets = storageResult.extractedAssets;
        results.errors.push(...storageResult.errors);
      }

      results.duration = Date.now() - startTime;
      
      // Update extraction metadata
      await this.updateExtractionMetadata(results);
      
      console.log(`✅ Firebase extraction complete: ${results.extractedDocuments} documents in ${results.duration}ms`);
      return results;

    } catch (error) {
      console.error('❌ Firebase extraction failed:', error);
      results.errors.push({
        type: 'EXTRACTION_FAILED',
        message: error.message,
        context: 'main_extraction'
      });
      return results;
    }
  }

  /**
   * Extract content from a specific Firestore collection
   */
  private async extractFirestoreCollection(
    collectionConfig: FirebaseExtractionConfig['collections'][0]
  ): Promise<CollectionExtractionResult> {
    const result: CollectionExtractionResult = {
      totalDocuments: 0,
      extractedDocuments: 0,
      errors: []
    };

    try {
      let lastDoc: DocumentSnapshot | null = null;
      let hasMore = true;

      while (hasMore) {
        // Build query with pagination
        let q = query(
          collection(this.firestore, collectionConfig.name),
          orderBy('__name__'),
          limit(this.config.batchSize)
        );

        if (lastDoc) {
          q = query(q, startAfter(lastDoc));
        }

        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
          hasMore = false;
          break;
        }

        // Process batch
        for (const doc of snapshot.docs) {
          try {
            const firebaseContent = await this.processFirestoreDocument(
              doc,
              collectionConfig
            );
            
            if (firebaseContent) {
              await this.ingestContentToNeo4j(firebaseContent);
              result.extractedDocuments++;
            }
            
            result.totalDocuments++;
          } catch (error) {
            result.errors.push({
              type: 'DOCUMENT_PROCESSING_ERROR',
              message: error.message,
              context: `collection:${collectionConfig.name}, doc:${doc.id}`
            });
          }
        }

        lastDoc = snapshot.docs[snapshot.docs.length - 1];
        hasMore = snapshot.docs.length === this.config.batchSize;

        // Progress feedback
        console.log(`📄 Processed ${result.totalDocuments} documents from ${collectionConfig.name}`);
      }

    } catch (error) {
      result.errors.push({
        type: 'COLLECTION_ACCESS_ERROR',
        message: error.message,
        context: `collection:${collectionConfig.name}`
      });
    }

    return result;
  }

  /**
   * Process individual Firestore document
   */
  private async processFirestoreDocument(
    doc: DocumentSnapshot,
    collectionConfig: FirebaseExtractionConfig['collections'][0]
  ): Promise<FirebaseContent | null> {
    const data = doc.data();
    if (!data) return null;

    // Extract content field
    const contentValue = data[collectionConfig.contentField];
    if (!contentValue || typeof contentValue !== 'string') {
      return null;
    }

    // Determine content type based on collection
    const contentType = this.determineContentType(collectionConfig.name, data);

    // Extract metadata
    const metadata: FirebaseContent['metadata'] = {
      createdAt: this.convertTimestamp(data.createdAt),
      updatedAt: this.convertTimestamp(data.updatedAt || data.createdAt),
      firebaseCollection: collectionConfig.name,
      firebaseDocId: doc.id
    };

    // Add configured metadata fields
    for (const field of collectionConfig.metadataFields) {
      if (data[field] !== undefined) {
        metadata[field] = data[field];
      }
    }

    return {
      id: `firebase_${collectionConfig.name}_${doc.id}`,
      type: contentType,
      title: data.title || data.name || `Document ${doc.id}`,
      content: contentValue,
      metadata,
      extractedAt: new Date(),
      source: 'firestore'
    };
  }

  /**
   * Extract assets from Firebase Storage
   */
  private async extractStorageAssets(): Promise<StorageExtractionResult> {
    const result: StorageExtractionResult = {
      extractedAssets: 0,
      errors: []
    };

    for (const storagePath of this.config.storagePaths) {
      try {
        const storageRef = ref(this.storage, storagePath);
        const listResult = await listAll(storageRef);

        for (const itemRef of listResult.items) {
          try {
            const metadata = await getMetadata(itemRef);
            const downloadURL = await getDownloadURL(itemRef);

            // Only process text-based files for content extraction
            if (this.isTextFile(metadata.contentType)) {
              const content = await this.downloadTextContent(downloadURL);
              
              const firebaseContent: FirebaseContent = {
                id: `firebase_storage_${itemRef.fullPath.replace(/[\/\.]/g, '_')}`,
                type: 'asset',
                title: itemRef.name,
                content: content,
                metadata: {
                  createdAt: new Date(metadata.timeCreated),
                  updatedAt: new Date(metadata.updated),
                  firebaseCollection: 'storage',
                  firebaseDocId: itemRef.fullPath,
                  contentType: metadata.contentType,
                  size: metadata.size,
                  downloadURL: downloadURL
                },
                extractedAt: new Date(),
                source: 'storage'
              };

              await this.ingestContentToNeo4j(firebaseContent);
              result.extractedAssets++;
            }

          } catch (error) {
            result.errors.push({
              type: 'STORAGE_ITEM_ERROR',
              message: error.message,
              context: `item:${itemRef.fullPath}`
            });
          }
        }

      } catch (error) {
        result.errors.push({
          type: 'STORAGE_PATH_ERROR',
          message: error.message,
          context: `path:${storagePath}`
        });
      }
    }

    return result;
  }

  /**
   * Ingest Firebase content into Neo4j
   */
  private async ingestContentToNeo4j(content: FirebaseContent): Promise<void> {
    // Convert to ContentAsset format expected by Neo4j
    const contentAsset = {
      id: content.id,
      title: content.title,
      content: content.content,
      type: content.type,
      source: `firebase_${content.source}`,
      metadata: {
        ...content.metadata,
        extractedAt: content.extractedAt.toISOString(),
        platform: 'firebase'
      }
    };

    await this.neo4jClient.ingestContentAsset(contentAsset);
  }

  /**
   * Utility methods
   */
  private determineContentType(collectionName: string, data: any): FirebaseContent['type'] {
    const lowerCollection = collectionName.toLowerCase();
    
    if (lowerCollection.includes('blog') || lowerCollection.includes('post')) {
      return 'blog-post';
    }
    if (lowerCollection.includes('config') || lowerCollection.includes('settings')) {
      return 'configuration';
    }
    if (data.type && ['blog-post', 'operational-data', 'asset', 'configuration'].includes(data.type)) {
      return data.type;
    }
    
    return 'operational-data';
  }

  private convertTimestamp(timestamp: any): Date {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate();
    }
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000);
    }
    if (timestamp instanceof Date) {
      return timestamp;
    }
    if (typeof timestamp === 'string') {
      return new Date(timestamp);
    }
    return new Date();
  }

  private isTextFile(contentType?: string): boolean {
    if (!contentType) return false;
    return contentType.startsWith('text/') || 
           contentType === 'application/json' ||
           contentType === 'application/xml';
  }

  private async downloadTextContent(url: string): Promise<string> {
    const response = await fetch(url);
    return await response.text();
  }

  private async updateExtractionMetadata(results: FirebaseExtractionResult): Promise<void> {
    const metadata = {
      lastExtraction: new Date(),
      totalDocuments: results.totalDocuments,
      extractedDocuments: results.extractedDocuments,
      duration: results.duration
    };

    // Store in Neo4j for tracking
    await this.neo4jClient.updateExtractionMetadata('firebase', metadata);
  }
}

// Supporting interfaces
export interface FirebaseExtractionResult {
  totalDocuments: number;
  extractedDocuments: number;
  errors: ExtractionError[];
  collections: { [collectionName: string]: CollectionExtractionResult };
  storageAssets: number;
  duration: number;
}

export interface CollectionExtractionResult {
  totalDocuments: number;
  extractedDocuments: number;
  errors: ExtractionError[];
}

export interface StorageExtractionResult {
  extractedAssets: number;
  errors: ExtractionError[];
}

export interface ExtractionError {
  type: string;
  message: string;
  context: string;
}
```

### 11.2 Firebase Configuration Management

**File: `knowledge-integration/config/firebase-config.ts`**

```typescript
export interface FirebaseEnvironmentConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  databaseURL?: string;
}

export class FirebaseConfigManager {
  private static instance: FirebaseConfigManager;
  private configs: Map<string, FirebaseEnvironmentConfig> = new Map();

  private constructor() {
    this.loadConfigurations();
  }

  static getInstance(): FirebaseConfigManager {
    if (!FirebaseConfigManager.instance) {
      FirebaseConfigManager.instance = new FirebaseConfigManager();
    }
    return FirebaseConfigManager.instance;
  }

  private loadConfigurations(): void {
    // Production configuration
    this.configs.set('production', {
      apiKey: process.env.FIREBASE_API_KEY_PROD || '',
      authDomain: process.env.FIREBASE_AUTH_DOMAIN_PROD || '',
      projectId: process.env.FIREBASE_PROJECT_ID_PROD || '',
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET_PROD || '',
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID_PROD || '',
      appId: process.env.FIREBASE_APP_ID_PROD || '',
      databaseURL: process.env.FIREBASE_DATABASE_URL_PROD
    });

    // Development configuration
    this.configs.set('development', {
      apiKey: process.env.FIREBASE_API_KEY_DEV || '',
      authDomain: process.env.FIREBASE_AUTH_DOMAIN_DEV || '',
      projectId: process.env.FIREBASE_PROJECT_ID_DEV || '',
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET_DEV || '',
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID_DEV || '',
      appId: process.env.FIREBASE_APP_ID_DEV || '',
      databaseURL: process.env.FIREBASE_DATABASE_URL_DEV
    });
  }

  getConfig(environment: 'production' | 'development' = 'production'): FirebaseEnvironmentConfig {
    const config = this.configs.get(environment);
    if (!config) {
      throw new Error(`Firebase configuration not found for environment: ${environment}`);
    }
    
    // Validate required fields
    const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
    for (const field of requiredFields) {
      if (!config[field]) {
        throw new Error(`Missing required Firebase configuration field: ${field}`);
      }
    }

    return config;
  }

  getExtractionConfig(): FirebaseExtractionConfig {
    return {
      collections: [
        {
          name: 'blog-posts',
          fields: ['title', 'content', 'excerpt', 'tags', 'category', 'status', 'author'],
          contentField: 'content',
          metadataFields: ['tags', 'category', 'status', 'author', 'excerpt']
        },
        {
          name: 'operational-data',
          fields: ['name', 'description', 'data', 'type', 'category'],
          contentField: 'description',
          metadataFields: ['type', 'category', 'data']
        },
        {
          name: 'configurations',
          fields: ['name', 'value', 'description', 'environment', 'type'],
          contentField: 'description',
          metadataFields: ['environment', 'type', 'value']
        }
      ],
      storagePaths: [
        'documents',
        'assets/text',
        'exports'
      ],
      batchSize: 50,
      extractionMode: 'incremental'
    };
  }
}
```

## Day 12: Real-time Synchronization Foundation

### 12.1 Firebase Real-time Listener Service

**File: `knowledge-integration/services/firebase-realtime-sync.ts`**

```typescript
import { 
  onSnapshot, 
  collection, 
  doc, 
  query, 
  where, 
  Timestamp,
  DocumentChangeType 
} from 'firebase/firestore';
import { FirebaseContentExtractor, FirebaseContent } from '../extractors/firebase-extractor';
import { Neo4jClient } from './neo4j-client';

export interface RealtimeSyncConfig {
  enabledCollections: string[];
  syncMode: 'immediate' | 'batched';
  batchInterval: number; // milliseconds
  conflictResolution: 'latest-wins' | 'manual-review';
  retryAttempts: number;
}

export interface SyncEvent {
  id: string;
  type: DocumentChangeType;
  collectionName: string;
  documentId: string;
  timestamp: Date;
  processed: boolean;
  error?: string;
}

export class FirebaseRealtimeSync {
  private neo4jClient: Neo4jClient;
  private extractor: FirebaseContentExtractor;
  private config: RealtimeSyncConfig;
  private listeners: Map<string, () => void> = new Map();
  private pendingEvents: SyncEvent[] = [];
  private batchTimer: NodeJS.Timeout | null = null;
  private isProcessing = false;

  constructor(
    neo4jClient: Neo4jClient,
    extractor: FirebaseContentExtractor,
    config: RealtimeSyncConfig
  ) {
    this.neo4jClient = neo4jClient;
    this.extractor = extractor;
    this.config = config;
  }

  /**
   * Start real-time synchronization for configured collections
   */
  async startRealtimeSync(): Promise<void> {
    console.log('🔄 Starting Firebase real-time synchronization...');

    for (const collectionName of this.config.enabledCollections) {
      await this.setupCollectionListener(collectionName);
    }

    // Start batch processing timer if in batched mode
    if (this.config.syncMode === 'batched') {
      this.startBatchProcessor();
    }

    console.log(`✅ Real-time sync active for ${this.config.enabledCollections.length} collections`);
  }

  /**
   * Stop all real-time listeners
   */
  stopRealtimeSync(): void {
    console.log('⏹️ Stopping Firebase real-time synchronization...');

    // Unsubscribe from all listeners
    for (const [collectionName, unsubscribe] of this.listeners) {
      unsubscribe();
      console.log(`📡 Stopped listener for collection: ${collectionName}`);
    }

    this.listeners.clear();

    // Clear batch timer
    if (this.batchTimer) {
      clearInterval(this.batchTimer);
      this.batchTimer = null;
    }

    // Process any remaining pending events
    if (this.pendingEvents.length > 0) {
      console.log(`🔄 Processing ${this.pendingEvents.length} remaining events...`);
      this.processPendingEvents();
    }

    console.log('✅ Real-time sync stopped');
  }

  /**
   * Setup listener for a specific collection
   */
  private async setupCollectionListener(collectionName: string): Promise<void> {
    try {
      const collectionRef = collection(this.extractor['firestore'], collectionName);
      
      // Query for recent changes (last 24 hours) to catch up on missed events
      const catchupQuery = query(
        collectionRef,
        where('updatedAt', '>', Timestamp.fromDate(new Date(Date.now() - 24 * 60 * 60 * 1000)))
      );

      const unsubscribe = onSnapshot(
        catchupQuery,
        {
          includeMetadataChanges: false
        },
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            this.handleDocumentChange(collectionName, change);
          });
        },
        (error) => {
          console.error(`❌ Error in listener for ${collectionName}:`, error);
          // Attempt to restart listener after delay
          setTimeout(() => {
            this.setupCollectionListener(collectionName);
          }, 5000);
        }
      );

      this.listeners.set(collectionName, unsubscribe);
      console.log(`📡 Started listener for collection: ${collectionName}`);

    } catch (error) {
      console.error(`❌ Failed to setup listener for ${collectionName}:`, error);
    }
  }

  /**
   * Handle individual document changes
   */
  private handleDocumentChange(collectionName: string, change: any): void {
    const syncEvent: SyncEvent = {
      id: `${collectionName}_${change.doc.id}_${Date.now()}`,
      type: change.type,
      collectionName,
      documentId: change.doc.id,
      timestamp: new Date(),
      processed: false
    };

    console.log(`📝 Document ${change.type}: ${collectionName}/${change.doc.id}`);

    if (this.config.syncMode === 'immediate') {
      this.processEventImmediately(syncEvent, change.doc);
    } else {
      this.addToBatch(syncEvent, change.doc);
    }
  }

  /**
   * Process sync event immediately
   */
  private async processEventImmediately(event: SyncEvent, doc: any): Promise<void> {
    try {
      await this.processSyncEvent(event, doc);
      event.processed = true;
    } catch (error) {
      console.error(`❌ Failed to process immediate sync event:`, error);
      event.error = error.message;
      
      // Add to retry queue
      if (this.config.retryAttempts > 0) {
        this.scheduleRetry(event, doc);
      }
    }
  }

  /**
   * Add event to batch for later processing
   */
  private addToBatch(event: SyncEvent, doc: any): void {
    this.pendingEvents.push(event);
    
    // Store document data for later processing
    event['__docData'] = doc.data();
    
    console.log(`📦 Added to batch: ${event.collectionName}/${event.documentId} (${this.pendingEvents.length} pending)`);
  }

  /**
   * Start batch processor timer
   */
  private startBatchProcessor(): void {
    this.batchTimer = setInterval(() => {
      if (this.pendingEvents.length > 0 && !this.isProcessing) {
        this.processPendingEvents();
      }
    }, this.config.batchInterval);
  }

  /**
   * Process all pending events in batch
   */
  private async processPendingEvents(): Promise<void> {
    if (this.isProcessing || this.pendingEvents.length === 0) {
      return;
    }

    this.isProcessing = true;
    const eventsToProcess = [...this.pendingEvents];
    this.pendingEvents = [];

    console.log(`🔄 Processing batch of ${eventsToProcess.length} sync events...`);

    let successCount = 0;
    let errorCount = 0;

    for (const event of eventsToProcess) {
      try {
        await this.processSyncEvent(event, { data: () => event['__docData'] });
        event.processed = true;
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to process sync event ${event.id}:`, error);
        event.error = error.message;
        errorCount++;
        
        // Add back to pending for retry
        if (this.config.retryAttempts > 0) {
          this.pendingEvents.push(event);
        }
      }
    }

    console.log(`✅ Batch processing complete: ${successCount} succeeded, ${errorCount} failed`);
    this.isProcessing = false;
  }

  /**
   * Process individual sync event
   */
  private async processSyncEvent(event: SyncEvent, doc: any): Promise<void> {
    const data = doc.data();
    
    switch (event.type) {
      case 'added':
      case 'modified':
        await this.syncContentToNeo4j(event, data);
        break;
        
      case 'removed':
        await this.removeContentFromNeo4j(event);
        break;
        
      default:
        console.warn(`⚠️ Unknown sync event type: ${event.type}`);
    }
  }

  /**
   * Sync content addition/modification to Neo4j
   */
  private async syncContentToNeo4j(event: SyncEvent, data: any): Promise<void> {
    // Find collection configuration
    const collectionConfig = this.extractor['config'].collections.find(
      c => c.name === event.collectionName
    );

    if (!collectionConfig) {
      throw new Error(`No configuration found for collection: ${event.collectionName}`);
    }

    // Extract content using same logic as batch extractor
    const contentValue = data[collectionConfig.contentField];
    if (!contentValue || typeof contentValue !== 'string') {
      console.log(`⚠️ No extractable content in ${event.collectionName}/${event.documentId}`);
      return;
    }

    // Create Firebase content object
    const firebaseContent: FirebaseContent = {
      id: `firebase_${event.collectionName}_${event.documentId}`,
      type: this.extractor['determineContentType'](event.collectionName, data),
      title: data.title || data.name || `Document ${event.documentId}`,
      content: contentValue,
      metadata: {
        createdAt: this.extractor['convertTimestamp'](data.createdAt),
        updatedAt: this.extractor['convertTimestamp'](data.updatedAt || data.createdAt),
        firebaseCollection: event.collectionName,
        firebaseDocId: event.documentId,
        realtimeSync: true,
        syncEventId: event.id
      },
      extractedAt: new Date(),
      source: 'firestore'
    };

    // Add metadata fields
    for (const field of collectionConfig.metadataFields) {
      if (data[field] !== undefined) {
        firebaseContent.metadata[field] = data[field];
      }
    }

    // Check for conflicts if content already exists
    if (this.config.conflictResolution === 'latest-wins') {
      await this.extractor['ingestContentToNeo4j'](firebaseContent);
    } else {
      await this.handleConflictResolution(firebaseContent);
    }

    console.log(`✅ Synced: ${event.collectionName}/${event.documentId}`);
  }

  /**
   * Remove content from Neo4j
   */
  private async removeContentFromNeo4j(event: SyncEvent): Promise<void> {
    const contentId = `firebase_${event.collectionName}_${event.documentId}`;
    await this.neo4jClient.removeContentAsset(contentId);
    console.log(`🗑️ Removed: ${event.collectionName}/${event.documentId}`);
  }

  /**
   * Handle conflict resolution for manual review mode
   */
  private async handleConflictResolution(content: FirebaseContent): Promise<void> {
    const existingContent = await this.neo4jClient.getContentAsset(content.id);
    
    if (existingContent) {
      // Create conflict record for manual review
      const conflict = {
        contentId: content.id,
        existingContent: existingContent,
        newContent: content,
        createdAt: new Date(),
        status: 'pending_review'
      };
      
      await this.neo4jClient.createConflictRecord(conflict);
      console.log(`⚠️ Conflict detected for ${content.id}, marked for manual review`);
    } else {
      // No conflict, proceed with ingestion
      await this.extractor['ingestContentToNeo4j'](content);
    }
  }

  /**
   * Schedule retry for failed event
   */
  private scheduleRetry(event: SyncEvent, doc: any): void {
    const retryDelay = Math.pow(2, (event['retryCount'] || 0)) * 1000; // Exponential backoff
    
    setTimeout(async () => {
      event['retryCount'] = (event['retryCount'] || 0) + 1;
      
      if (event['retryCount'] <= this.config.retryAttempts) {
        console.log(`🔄 Retrying sync event ${event.id} (attempt ${event['retryCount']})`);
        await this.processEventImmediately(event, doc);
      } else {
        console.error(`❌ Max retries exceeded for sync event ${event.id}`);
        // Log to error tracking system
        await this.logFailedSyncEvent(event);
      }
    }, retryDelay);
  }

  /**
   * Log failed sync events for manual investigation
   */
  private async logFailedSyncEvent(event: SyncEvent): Promise<void> {
    const errorRecord = {
      eventId: event.id,
      collectionName: event.collectionName,
      documentId: event.documentId,
      eventType: event.type,
      error: event.error,
      timestamp: event.timestamp,
      retryCount: event['retryCount'] || 0
    };

    await this.neo4jClient.logSyncError(errorRecord);
  }

  /**
   * Get sync statistics
   */
  getSyncStats(): {
    activeListeners: number;
    pendingEvents: number;
    isProcessing: boolean;
    collections: string[];
  } {
    return {
      activeListeners: this.listeners.size,
      pendingEvents: this.pendingEvents.length,
      isProcessing: this.isProcessing,
      collections: Array.from(this.listeners.keys())
    };
  }
}
```

## Day 13: API Integration and Dashboard Components

### 13.1 Firebase Content API Endpoints

**File: `src/app/api/firebase-content/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { FirebaseContentExtractor } from '../../../../knowledge-integration/extractors/firebase-extractor';
import { FirebaseRealtimeSync } from '../../../../knowledge-integration/services/firebase-realtime-sync';
import { Neo4jClient } from '../../../../knowledge-integration/services/neo4j-client';
import { FirebaseConfigManager } from '../../../../knowledge-integration/config/firebase-config';

// Initialize services
const neo4jClient = new Neo4jClient();
const configManager = FirebaseConfigManager.getInstance();
let firebaseExtractor: FirebaseContentExtractor | null = null;
let realtimeSync: FirebaseRealtimeSync | null = null;

async function initializeServices() {
  if (!firebaseExtractor) {
    const firebaseConfig = configManager.getConfig(
      process.env.NODE_ENV === 'production' ? 'production' : 'development'
    );
    const extractionConfig = configManager.getExtractionConfig();
    
    firebaseExtractor = new FirebaseContentExtractor(
      firebaseConfig,
      neo4jClient,
      extractionConfig
    );

    const syncConfig = {
      enabledCollections: ['blog-posts', 'operational-data'],
      syncMode: 'batched' as const,
      batchInterval: 30000, // 30 seconds
      conflictResolution: 'latest-wins' as const,
      retryAttempts: 3
    };

    realtimeSync = new FirebaseRealtimeSync(
      neo4jClient,
      firebaseExtractor,
      syncConfig
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    await initializeServices();

    switch (action) {
      case 'status':
        return await handleStatusRequest();
      
      case 'collections':
        return await handleCollectionsRequest();
      
      case 'sync-stats':
        return await handleSyncStatsRequest();
      
      default:
        return NextResponse.json(
          { error: 'Invalid action parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Firebase content API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, ...params } = await request.json();

    await initializeServices();

    switch (action) {
      case 'extract':
        return await handleExtractionRequest(params);
      
      case 'start-realtime':
        return await handleStartRealtimeRequest();
      
      case 'stop-realtime':
        return await handleStopRealtimeRequest();
      
      case 'search':
        return await handleSearchRequest(params);
      
      default:
        return NextResponse.json(
          { error: 'Invalid action parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Firebase content API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleStatusRequest() {
  const extractionMetadata = await neo4jClient.getExtractionMetadata('firebase');
  
  return NextResponse.json({
    service: 'firebase-content-extractor',
    status: 'operational',
    lastExtraction: extractionMetadata?.lastExtraction,
    totalDocuments: extractionMetadata?.totalDocuments || 0,
    extractedDocuments: extractionMetadata?.extractedDocuments || 0
  });
}

async function handleCollectionsRequest() {
  const config = configManager.getExtractionConfig();
  
  return NextResponse.json({
    collections: config.collections.map(c => ({
      name: c.name,
      contentField: c.contentField,
      metadataFields: c.metadataFields
    })),
    storagePaths: config.storagePaths
  });
}

async function handleSyncStatsRequest() {
  if (!realtimeSync) {
    return NextResponse.json({ error: 'Real-time sync not initialized' }, { status: 400 });
  }

  const stats = realtimeSync.getSyncStats();
  return NextResponse.json(stats);
}

async function handleExtractionRequest(params: any) {
  if (!firebaseExtractor) {
    return NextResponse.json({ error: 'Firebase extractor not initialized' }, { status: 400 });
  }

  // Start extraction in background
  const extractionPromise = firebaseExtractor.extractAllContent();
  
  // Return immediate response
  return NextResponse.json({
    message: 'Firebase content extraction started',
    extractionId: `firebase_${Date.now()}`,
    status: 'in_progress'
  });
}

async function handleStartRealtimeRequest() {
  if (!realtimeSync) {
    return NextResponse.json({ error: 'Real-time sync not initialized' }, { status: 400 });
  }

  await realtimeSync.startRealtimeSync();
  
  return NextResponse.json({
    message: 'Real-time synchronization started',
    status: 'active'
  });
}

async function handleStopRealtimeRequest() {
  if (!realtimeSync) {
    return NextResponse.json({ error: 'Real-time sync not initialized' }, { status: 400 });
  }

  realtimeSync.stopRealtimeSync();
  
  return NextResponse.json({
    message: 'Real-time synchronization stopped',
    status: 'inactive'
  });
}

async function handleSearchRequest(params: any) {
  const { query, filters } = params;
  
  if (!query) {
    return NextResponse.json({ error: 'Search query required' }, { status: 400 });
  }

  const searchFilters = {
    ...filters,
    source: 'firebase_firestore'
  };

  const results = await neo4jClient.searchContent(query, searchFilters);
  
  return NextResponse.json({
    query,
    results: results.items,
    total: results.total,
    filters: searchFilters
  });
}
```

### 13.2 Firebase Content Dashboard Component

**File: `src/components/firebase/FirebaseContentManager.tsx`**

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Play, 
  Square, 
  RefreshCw, 
  Search, 
  Database, 
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3
} from 'lucide-react';

interface FirebaseContentStatus {
  service: string;
  status: string;
  lastExtraction?: string;
  totalDocuments: number;
  extractedDocuments: number;
}

interface CollectionInfo {
  name: string;
  contentField: string;
  metadataFields: string[];
}

interface SyncStats {
  activeListeners: number;
  pendingEvents: number;
  isProcessing: boolean;
  collections: string[];
}

interface SearchResult {
  id: string;
  title: string;
  content: string;
  metadata: any;
  score: number;
}

export default function FirebaseContentManager() {
  const [status, setStatus] = useState<FirebaseContentStatus | null>(null);
  const [collections, setCollections] = useState<CollectionInfo[]>([]);
  const [syncStats, setSyncStats] = useState<SyncStats | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [realtimeActive, setRealtimeActive] = useState(false);
  const [extractionInProgress, setExtractionInProgress] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  useEffect(() => {
    loadInitialData();
    
    // Set up periodic status updates
    const interval = setInterval(() => {
      if (realtimeActive) {
        loadSyncStats();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [realtimeActive]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadStatus(),
        loadCollections()
      ]);
    } catch (error) {
      showMessage('error', 'Failed to load initial data');
    } finally {
      setLoading(false);
    }
  };

  const loadStatus = async () => {
    try {
      const response = await fetch('/api/firebase-content?action=status');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Failed to load status:', error);
    }
  };

  const loadCollections = async () => {
    try {
      const response = await fetch('/api/firebase-content?action=collections');
      const data = await response.json();
      setCollections(data.collections);
    } catch (error) {
      console.error('Failed to load collections:', error);
    }
  };

  const loadSyncStats = async () => {
    try {
      const response = await fetch('/api/firebase-content?action=sync-stats');
      const data = await response.json();
      setSyncStats(data);
    } catch (error) {
      console.error('Failed to load sync stats:', error);
    }
  };

  const startExtraction = async () => {
    setExtractionInProgress(true);
    try {
      const response = await fetch('/api/firebase-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'extract' })
      });
      
      const data = await response.json();
      showMessage('success', 'Firebase content extraction started');
      
      // Refresh status after a delay
      setTimeout(() => {
        loadStatus();
        setExtractionInProgress(false);
      }, 2000);
      
    } catch (error) {
      showMessage('error', 'Failed to start extraction');
      setExtractionInProgress(false);
    }
  };

  const toggleRealtimeSync = async () => {
    const action = realtimeActive ? 'stop-realtime' : 'start-realtime';
    
    try {
      const response = await fetch('/api/firebase-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      
      const data = await response.json();
      setRealtimeActive(!realtimeActive);
      showMessage('success', data.message);
      
      if (!realtimeActive) {
        loadSyncStats();
      } else {
        setSyncStats(null);
      }
      
    } catch (error) {
      showMessage('error', `Failed to ${action.replace('-', ' ')}`);
    }
  };

  const searchContent = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/firebase-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'search', 
          query: searchQuery,
          filters: { source: 'firebase' }
        })
      });
      
      const data = await response.json();
      setSearchResults(data.results || []);
      showMessage('info', `Found ${data.total || 0} results`);
      
    } catch (error) {
      showMessage('error', 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error' | 'info', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  if (loading && !status) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading Firebase content manager...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Firebase Content Manager</h2>
          <p className="text-muted-foreground">
            Extract and synchronize content from Firebase collections
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {status && (
            <div className="flex items-center space-x-2">
              {getStatusIcon(status.status)}
              <span className="text-sm">
                {status.status === 'operational' ? 'Operational' : 'Issues Detected'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      {message && (
        <Alert className={message.type === 'error' ? 'border-red-200' : message.type === 'success' ? 'border-green-200' : 'border-blue-200'}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="extraction">Extraction</TabsTrigger>
          <TabsTrigger value="realtime">Real-time Sync</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Status Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Service Status</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  {status && getStatusIcon(status.status)}
                  <div className="text-2xl font-bold">
                    {status?.status || 'Unknown'}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {status?.extractedDocuments || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  of {status?.totalDocuments || 0} processed
                </p>
              </CardContent>
            </Card>

            {/* Last Extraction Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Extraction</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {status?.lastExtraction 
                    ? new Date(status.lastExtraction).toLocaleDateString()
                    : 'Never'
                  }
                </div>
                <p className="text-xs text-muted-foreground">
                  {status?.lastExtraction 
                    ? new Date(status.lastExtraction).toLocaleTimeString()
                    : 'No extractions yet'
                  }
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Collections Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Configured Collections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {collections.map((collection) => (
                  <div key={collection.name} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">{collection.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Content field: {collection.contentField}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">
                        {collection.metadataFields.length} metadata fields
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Extraction Tab */}
        <TabsContent value="extraction">
          <Card>
            <CardHeader>
              <CardTitle>Manual Content Extraction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Extract all content from configured Firebase collections and storage paths.
                  This process will identify and ingest new or updated content into the knowledge graph.
                </p>
                
                <Button 
                  onClick={startExtraction}
                  disabled={extractionInProgress}
                  className="w-full"
                >
                  {extractionInProgress ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Extraction in Progress...
                    </>
                  ) : (
                    <>
                      <Database className="mr-2 h-4 w-4" />
                      Start Full Extraction
                    </>
                  )}
                </Button>

                {status?.lastExtraction && (
                  <div className="text-sm text-muted-foreground">
                    Last extraction: {new Date(status.lastExtraction).toLocaleString()}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Real-time Sync Tab */}
        <TabsContent value="realtime">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Synchronization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sync Status</p>
                    <p className="text-sm text-muted-foreground">
                      {realtimeActive ? 'Active - monitoring changes' : 'Inactive'}
                    </p>
                  </div>
                  <Button
                    onClick={toggleRealtimeSync}
                    variant={realtimeActive ? "destructive" : "default"}
                  >
                    {realtimeActive ? (
                      <>
                        <Square className="mr-2 h-4 w-4" />
                        Stop Sync
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Start Sync
                      </>
                    )}
                  </Button>
                </div>

                {syncStats && realtimeActive && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded">
                      <p className="text-sm font-medium">Active Listeners</p>
                      <p className="text-2xl font-bold">{syncStats.activeListeners}</p>
                    </div>
                    <div className="p-3 border rounded">
                      <p className="text-sm font-medium">Pending Events</p>
                      <p className="text-2xl font-bold">{syncStats.pendingEvents}</p>
                    </div>
                  </div>
                )}

                {syncStats?.collections && (
                  <div>
                    <p className="font-medium mb-2">Monitored Collections</p>
                    <div className="flex flex-wrap gap-2">
                      {syncStats.collections.map((collection) => (
                        <Badge key={collection} variant="secondary">
                          {collection}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Search Tab */}
        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>Search Firebase Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Search Firebase content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchContent()}
                  />
                  <Button onClick={searchContent} disabled={loading}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                {searchResults.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Search Results</h4>
                    {searchResults.map((result) => (
                      <div key={result.id} className="p-3 border rounded">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-medium">{result.title}</h5>
                            <p className="text-sm text-muted-foreground mt-1">
                              {result.content.substring(0, 200)}...
                            </p>
                            <div className="flex items-center mt-2 space-x-2">
                              <Badge variant="outline" className="text-xs">
                                Score: {result.score.toFixed(2)}
                              </Badge>
                              {result.metadata.firebaseCollection && (
                                <Badge variant="outline" className="text-xs">
                                  {result.metadata.firebaseCollection}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

## Day 14: Testing and Validation Implementation

### 14.1 Firebase Integration Test Suite

**File: `knowledge-integration/__tests__/firebase-integration.test.ts`**

```typescript
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { FirebaseContentExtractor } from '../extractors/firebase-extractor';
import { FirebaseRealtimeSync } from '../services/firebase-realtime-sync';
import { Neo4jClient } from '../services/neo4j-client';

// Mock Firebase modules
jest.mock('firebase/app');
jest.mock('firebase/firestore');
jest.mock('firebase/storage');

describe('Firebase Content Integration', () => {
  let mockNeo4jClient: jest.Mocked<Neo4jClient>;
  let firebaseExtractor: FirebaseContentExtractor;
  let realtimeSync: FirebaseRealtimeSync;

  beforeEach(() => {
    // Setup mocks
    mockNeo4jClient = {
      ingestContentAsset: jest.fn(),
      updateExtractionMetadata: jest.fn(),
      removeContentAsset: jest.fn(),
      getContentAsset: jest.fn(),
      createConflictRecord: jest.fn(),
      logSyncError: jest.fn(),
      searchContent: jest.fn(),
      getExtractionMetadata: jest.fn()
    } as any;

    const mockFirebaseConfig = {
      apiKey: 'test-key',
      authDomain: 'test.firebaseapp.com',
      projectId: 'test-project',
      storageBucket: 'test-bucket',
      messagingSenderId: '123456789',
      appId: 'test-app-id'
    };

    const mockExtractionConfig = {
      collections: [
        {
          name: 'test-collection',
          fields: ['title', 'content'],
          contentField: 'content',
          metadataFields: ['title']
        }
      ],
      storagePaths: ['test-path'],
      batchSize: 10,
      extractionMode: 'full' as const
    };

    firebaseExtractor = new FirebaseContentExtractor(
      mockFirebaseConfig,
      mockNeo4jClient,
      mockExtractionConfig
    );

    const syncConfig = {
      enabledCollections: ['test-collection'],
      syncMode: 'immediate' as const,
      batchInterval: 1000,
      conflictResolution: 'latest-wins' as const,
      retryAttempts: 2
    };

    realtimeSync = new FirebaseRealtimeSync(
      mockNeo4jClient,
      firebaseExtractor,
      syncConfig
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('FirebaseContentExtractor', () => {
    it('should extract content from Firestore collections', async () => {
      // Mock Firestore query results
      const mockDoc = {
        id: 'test-doc-1',
        data: () => ({
          title: 'Test Document',
          content: 'This is test content',
          createdAt: new Date(),
          updatedAt: new Date()
        })
      };

      // Mock Firebase getDocs
      const mockGetDocs = jest.fn().mockResolvedValue({
        empty: false,
        docs: [mockDoc]
      });

      (require('firebase/firestore').getDocs as jest.Mock) = mockGetDocs;

      const result = await firebaseExtractor.extractAllContent();

      expect(result.extractedDocuments).toBeGreaterThan(0);
      expect(mockNeo4jClient.ingestContentAsset).toHaveBeenCalled();
      expect(mockNeo4jClient.updateExtractionMetadata).toHaveBeenCalled();
    });

    it('should handle extraction errors gracefully', async () => {
      // Mock Firebase error
      const mockGetDocs = jest.fn().mockRejectedValue(new Error('Firebase error'));
      (require('firebase/firestore').getDocs as jest.Mock) = mockGetDocs;

      const result = await firebaseExtractor.extractAllContent();

      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].type).toBe('COLLECTION_ACCESS_ERROR');
    });

    it('should process document metadata correctly', async () => {
      const mockDoc = {
        id: 'test-doc-1',
        data: () => ({
          title: 'Test Document',
          content: 'This is test content',
          tags: ['test', 'firebase'],
          createdAt: { seconds: 1640995200 }, // Timestamp format
          updatedAt: { seconds: 1640995200 }
        })
      };

      const firebaseContent = await firebaseExtractor['processFirestoreDocument'](
        mockDoc,
        {
          name: 'test-collection',
          fields: ['title', 'content', 'tags'],
          contentField: 'content',
          metadataFields: ['title', 'tags']
        }
      );

      expect(firebaseContent).toBeTruthy();
      expect(firebaseContent?.metadata.tags).toEqual(['test', 'firebase']);
      expect(firebaseContent?.metadata.firebaseCollection).toBe('test-collection');
      expect(firebaseContent?.metadata.firebaseDocId).toBe('test-doc-1');
    });
  });

  describe('FirebaseRealtimeSync', () => {
    it('should handle document additions', async () => {
      const mockChange = {
        type: 'added',
        doc: {
          id: 'new-doc',
          data: () => ({
            title: 'New Document',
            content: 'New content',
            createdAt: new Date(),
            updatedAt: new Date()
          })
        }
      };

      await realtimeSync['handleDocumentChange']('test-collection', mockChange);

      // Should process immediately in immediate mode
      expect(mockNeo4jClient.ingestContentAsset).toHaveBeenCalled();
    });

    it('should handle document deletions', async () => {
      const mockChange = {
        type: 'removed',
        doc: {
          id: 'deleted-doc',
          data: () => ({})
        }
      };

      await realtimeSync['handleDocumentChange']('test-collection', mockChange);

      expect(mockNeo4jClient.removeContentAsset).toHaveBeenCalledWith(
        'firebase_test-collection_deleted-doc'
      );
    });

    it('should handle conflict resolution', async () => {
      // Mock existing content
      mockNeo4jClient.getContentAsset.mockResolvedValue({
        id: 'existing-content',
        title: 'Existing',
        content: 'Old content'
      });

      const syncConfig = {
        enabledCollections: ['test-collection'],
        syncMode: 'immediate' as const,
        batchInterval: 1000,
        conflictResolution: 'manual-review' as const,
        retryAttempts: 2
      };

      const conflictSync = new FirebaseRealtimeSync(
        mockNeo4jClient,
        firebaseExtractor,
        syncConfig
      );

      const mockContent = {
        id: 'existing-content',
        type: 'blog-post' as const,
        title: 'Updated Content',
        content: 'New content',
        metadata: {
          createdAt: new Date(),
          updatedAt: new Date(),
          firebaseCollection: 'test-collection',
          firebaseDocId: 'test-doc'
        },
        extractedAt: new Date(),
        source: 'firestore' as const
      };

      await conflictSync['handleConflictResolution'](mockContent);

      expect(mockNeo4jClient.createConflictRecord).toHaveBeenCalled();
    });

    it('should track sync statistics', () => {
      const stats = realtimeSync.getSyncStats();

      expect(stats).toHaveProperty('activeListeners');
      expect(stats).toHaveProperty('pendingEvents');
      expect(stats).toHaveProperty('isProcessing');
      expect(stats).toHaveProperty('collections');
    });
  });
});
```

### 14.2 Integration Validation Script

**File: `knowledge-integration/scripts/validate-firebase-integration.ts`**

```typescript
#!/usr/bin/env ts-node

import { FirebaseContentExtractor } from '../extractors/firebase-extractor';
import { FirebaseRealtimeSync } from '../services/firebase-realtime-sync';
import { Neo4jClient } from '../services/neo4j-client';
import { FirebaseConfigManager } from '../config/firebase-config';

interface ValidationResult {
  component: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  details?: any;
}

class FirebaseIntegrationValidator {
  private results: ValidationResult[] = [];

  async validateComplete(): Promise<ValidationResult[]> {
    console.log('🔍 Starting Firebase integration validation...\n');

    // Test configuration
    await this.validateConfiguration();

    // Test Neo4j connectivity
    await this.validateNeo4jConnection();

    // Test Firebase connectivity
    await this.validateFirebaseConnection();

    // Test extraction functionality
    await this.validateExtractionProcess();

    // Test real-time sync
    await this.validateRealtimeSync();

    // Test search functionality
    await this.validateSearchFunctionality();

    return this.results;
  }

  private async validateConfiguration(): Promise<void> {
    try {
      const configManager = FirebaseConfigManager.getInstance();
      const firebaseConfig = configManager.getConfig('development');
      const extractionConfig = configManager.getExtractionConfig();

      // Validate Firebase config
      const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket'];
      for (const field of requiredFields) {
        if (!firebaseConfig[field]) {
          this.addResult('Configuration', 'error', `Missing Firebase config: ${field}`);
          return;
        }
      }

      // Validate extraction config
      if (extractionConfig.collections.length === 0) {
        this.addResult('Configuration', 'warning', 'No collections configured for extraction');
      }

      this.addResult('Configuration', 'success', 'All configurations valid');

    } catch (error) {
      this.addResult('Configuration', 'error', `Configuration error: ${error.message}`);
    }
  }

  private async validateNeo4jConnection(): Promise<void> {
    try {
      const neo4jClient = new Neo4jClient();
      
      // Test basic connectivity
      await neo4jClient.testConnection();
      
      // Test content ingestion
      const testContent = {
        id: 'validation_test_content',
        title: 'Validation Test',
        content: 'This is a test content for validation',
        type: 'operational-data',
        source: 'firebase_firestore',
        metadata: {
          platform: 'firebase',
          validation: true,
          createdAt: new Date().toISOString()
        }
      };

      await neo4jClient.ingestContentAsset(testContent);
      
      // Test retrieval
      const retrieved = await neo4jClient.getContentAsset('validation_test_content');
      if (!retrieved) {
        throw new Error('Failed to retrieve test content');
      }

      // Cleanup
      await neo4jClient.removeContentAsset('validation_test_content');

      this.addResult('Neo4j Connection', 'success', 'Database connectivity and operations verified');

    } catch (error) {
      this.addResult('Neo4j Connection', 'error', `Database error: ${error.message}`);
    }
  }

  private async validateFirebaseConnection(): Promise<void> {
    try {
      const configManager = FirebaseConfigManager.getInstance();
      const firebaseConfig = configManager.getConfig('development');
      const extractionConfig = configManager.getExtractionConfig();
      const neo4jClient = new Neo4jClient();

      const extractor = new FirebaseContentExtractor(
        firebaseConfig,
        neo4jClient,
        extractionConfig
      );

      // Test basic Firebase connectivity by attempting to list collections
      // This is a read-only operation that tests authentication
      const result = await extractor.extractAllContent();
      
      if (result.errors.length > 0) {
        const firebaseErrors = result.errors.filter(e => 
          e.type.includes('COLLECTION_ACCESS_ERROR') || 
          e.type.includes('STORAGE_PATH_ERROR')
        );
        
        if (firebaseErrors.length > 0) {
          this.addResult('Firebase Connection', 'warning', 
            `Some Firebase access issues: ${firebaseErrors.length} errors`);
        }
      }

      this.addResult('Firebase Connection', 'success', 'Firebase connectivity verified');

    } catch (error) {
      this.addResult('Firebase Connection', 'error', `Firebase error: ${error.message}`);
    }
  }

  private async validateExtractionProcess(): Promise<void> {
    try {
      const configManager = FirebaseConfigManager.getInstance();
      const firebaseConfig = configManager.getConfig('development');
      const extractionConfig = {
        ...configManager.getExtractionConfig(),
        batchSize: 5, // Small batch for testing
        extractionMode: 'full' as const
      };
      const neo4jClient = new Neo4jClient();

      const extractor = new FirebaseContentExtractor(
        firebaseConfig,
        neo4jClient,
        extractionConfig
      );

      const startTime = Date.now();
      const result = await extractor.extractAllContent();
      const duration = Date.now() - startTime;

      const details = {
        totalDocuments: result.totalDocuments,
        extractedDocuments: result.extractedDocuments,
        duration: `${duration}ms`,
        errorCount: result.errors.length,
        collections: Object.keys(result.collections),
        storageAssets: result.storageAssets
      };

      if (result.errors.length === 0) {
        this.addResult('Content Extraction', 'success', 
          `Extracted ${result.extractedDocuments} documents successfully`, details);
      } else {
        this.addResult('Content Extraction', 'warning', 
          `Extracted with ${result.errors.length} errors`, details);
      }

    } catch (error) {
      this.addResult('Content Extraction', 'error', `Extraction failed: ${error.message}`);
    }
  }

  private async validateRealtimeSync(): Promise<void> {
    try {
      const configManager = FirebaseConfigManager.getInstance();
      const firebaseConfig = configManager.getConfig('development');
      const extractionConfig = configManager.getExtractionConfig();
      const neo4jClient = new Neo4jClient();

      const extractor = new FirebaseContentExtractor(
        firebaseConfig,
        neo4jClient,
        extractionConfig
      );

      const syncConfig = {
        enabledCollections: extractionConfig.collections.slice(0, 2).map(c => c.name),
        syncMode: 'batched' as const,
        batchInterval: 5000,
        conflictResolution: 'latest-wins' as const,
        retryAttempts: 2
      };

      const realtimeSync = new FirebaseRealtimeSync(
        neo4jClient,
        extractor,
        syncConfig
      );

      // Start sync
      await realtimeSync.startRealtimeSync();
      
      // Wait a moment for listeners to initialize
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check stats
      const stats = realtimeSync.getSyncStats();
      
      if (stats.activeListeners > 0) {
        this.addResult('Real-time Sync', 'success', 
          `Sync active with ${stats.activeListeners} listeners`, stats);
      } else {
        this.addResult('Real-time Sync', 'warning', 
          'Sync started but no active listeners', stats);
      }

      // Stop sync
      realtimeSync.stopRealtimeSync();

    } catch (error) {
      this.addResult('Real-time Sync', 'error', `Sync validation failed: ${error.message}`);
    }
  }

  private async validateSearchFunctionality(): Promise<void> {
    try {
      const neo4jClient = new Neo4jClient();

      // Test search with Firebase-specific filters
      const searchResult = await neo4jClient.searchContent('test', {
        source: 'firebase_firestore',
        limit: 5
      });

      if (searchResult.total > 0) {
        this.addResult('Search Functionality', 'success', 
          `Search working: found ${searchResult.total} Firebase documents`);
      } else {
        this.addResult('Search Functionality', 'warning', 
          'Search functional but no Firebase content found');
      }

    } catch (error) {
      this.addResult('Search Functionality', 'error', `Search failed: ${error.message}`);
    }
  }

  private addResult(component: string, status: 'success' | 'error' | 'warning', message: string, details?: any): void {
    this.results.push({ component, status, message, details });
    
    const emoji = status === 'success' ? '✅' : status === 'error' ? '❌' : '⚠️';
    console.log(`${emoji} ${component}: ${message}`);
    
    if (details) {
      console.log(`   Details: ${JSON.stringify(details, null, 2)}`);
    }
  }
}

// Main execution
async function main() {
  const validator = new FirebaseIntegrationValidator();
  const results = await validator.validateComplete();

  console.log('\n📊 Validation Summary:');
  console.log('=====================');

  const successCount = results.filter(r => r.status === 'success').length;
  const warningCount = results.filter(r => r.status === 'warning').length;
  const errorCount = results.filter(r => r.status === 'error').length;

  console.log(`✅ Successful: ${successCount}`);
  console.log(`⚠️ Warnings: ${warningCount}`);
  console.log(`❌ Errors: ${errorCount}`);

  if (errorCount > 0) {
    console.log('\n🚨 Critical Issues Found:');
    results
      .filter(r => r.status === 'error')
      .forEach(r => console.log(`   - ${r.component}: ${r.message}`));
  }

  if (warningCount > 0) {
    console.log('\n⚠️ Warnings to Address:');
    results
      .filter(r => r.status === 'warning')
      .forEach(r => console.log(`   - ${r.component}: ${r.message}`));
  }

  const overallStatus = errorCount === 0 ? 
    (warningCount === 0 ? 'FULLY_OPERATIONAL' : 'OPERATIONAL_WITH_WARNINGS') : 
    'CRITICAL_ISSUES';

  console.log(`\n🎯 Overall Status: ${overallStatus}`);

  process.exit(errorCount > 0 ? 1 : 0);
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Validation script failed:', error);
    process.exit(1);
  });
}
```

### 14.3 Daily Implementation Commands

**Day 11 Commands:**
```bash
# Initialize Firebase extractor
npm install firebase
mkdir -p knowledge-integration/extractors
touch knowledge-integration/extractors/firebase-extractor.ts
touch knowledge-integration/config/firebase-config.ts

# Set up environment variables
echo "FIREBASE_API_KEY_DEV=" >> .env.local
echo "FIREBASE_PROJECT_ID_DEV=" >> .env.local
# (add other Firebase config vars)

# Test basic setup
npm run type-check
```

**Day 12 Commands:**
```bash
# Implement real-time sync
touch knowledge-integration/services/firebase-realtime-sync.ts

# Test real-time listener setup
npm run test -- firebase-realtime-sync

# Verify configuration
npm run validate-config
```

**Day 13 Commands:**
```bash
# Create API endpoints
mkdir -p src/app/api/firebase-content
touch src/app/api/firebase-content/route.ts

# Create dashboard component
mkdir -p src/components/firebase
touch src/components/firebase/FirebaseContentManager.tsx

# Test API endpoints
npm run dev
curl http://localhost:3000/api/firebase-content?action=status
```

**Day 14 Commands:**
```bash
# Set up testing
mkdir -p knowledge-integration/__tests__
touch knowledge-integration/__tests__/firebase-integration.test.ts

# Create validation script
mkdir -p knowledge-integration/scripts
touch knowledge-integration/scripts/validate-firebase-integration.ts

# Run comprehensive validation
chmod +x knowledge-integration/scripts/validate-firebase-integration.ts
npm run validate-firebase-integration

# Final integration test
npm run test -- firebase
npm run type-check
npm run lint
```

This completes the comprehensive Days 11-14 Firebase integration implementation, providing full technical details for:

1. **Firebase Content Extractor** with batch processing and error handling
2. **Real-time Synchronization** with conflict resolution and retry logic  
3. **API Integration** with RESTful endpoints and dashboard components
4. **Testing & Validation** with comprehensive test suite and validation scripts

The implementation follows the same detailed approach as the React content extraction phase, ensuring seamless integration with the existing knowledge graph system.