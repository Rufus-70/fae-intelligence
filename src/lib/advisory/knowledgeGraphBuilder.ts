// Knowledge Graph Builder for Advisory System
// Creates and manages relationships between pain points, solutions, and tools

import { db } from '../firebase';
import { collection, doc, setDoc, getDoc, updateDoc, addDoc } from 'firebase/firestore';

interface KnowledgeGraphNode {
  id: string;
  type: 'pain_point' | 'solution' | 'tool' | 'industry' | 'business_process';
  name: string;
  properties: Record<string, any>;
  source_documents: string[];
  confidence: number;
  created_at: Date;
  updated_at?: Date;
  user_verified?: boolean;
}

interface KnowledgeGraphRelationship {
  id: string;
  source_node: string;
  target_node: string;
  relationship_type: 'SOLVES' | 'IMPLEMENTS' | 'REQUIRES' | 'CAUSES' | 'PREVENTS';
  properties: Record<string, any>;
  weight: number;
  confidence: number;
  source_document: string;
  created_at: Date;
}

export class AdvisoryKnowledgeGraphBuilder {
  
  async buildAdvisoryGraph(extraction: any, documentId: string) {
    try {
      console.log('Building advisory knowledge graph...', { 
        painPointsCount: extraction.pain_points?.length || 0,
        solutionsCount: extraction.solutions?.length || 0,
        toolsCount: extraction.tools?.length || 0 
      });
      
      const nodesCreated = [];
      const relationshipsCreated = [];
      
      // Create nodes for pain points
      if (extraction.pain_points) {
        for (const painPoint of extraction.pain_points) {
          const nodeId = `pain_point_${this.generateId(painPoint.name)}`;
          await this.createOrUpdateNode({
            id: nodeId,
            type: 'pain_point',
            name: painPoint.name,
            properties: {
              category: painPoint.category,
              severity: painPoint.severity,
              symptoms: painPoint.symptoms || [],
              cost_impact: painPoint.cost_impact,
              industry_specific: painPoint.industry_specific || false
            },
            source_documents: [documentId],
            confidence: painPoint.confidence || 70,
            created_at: new Date()
          });
          nodesCreated.push(nodeId);
        }
      }
      
      // Create nodes for solutions
      if (extraction.solutions) {
        for (const solution of extraction.solutions) {
          const nodeId = `solution_${this.generateId(solution.name)}`;
          await this.createOrUpdateNode({
            id: nodeId,
            type: 'solution',
            name: solution.name,
            properties: {
              type: solution.type,
              implementation_difficulty: solution.implementation_difficulty,
              time_to_value: solution.time_to_value,
              typical_roi: solution.typical_roi,
              prerequisites: solution.prerequisites || []
            },
            source_documents: [documentId],
            confidence: solution.confidence || 75,
            created_at: new Date()
          });
          nodesCreated.push(nodeId);
          
          // Create relationships: solution SOLVES pain_point
          if (solution.addresses_pain_points) {
            for (const painPointName of solution.addresses_pain_points) {
              const relationshipId = await this.createRelationship({
                source_node: nodeId,
                target_node: `pain_point_${this.generateId(painPointName)}`,
                relationship_type: 'SOLVES',
                properties: {
                  effectiveness: 80,
                  evidence: solution.evidence || []
                },
                weight: 1.0,
                confidence: solution.confidence || 75,
                source_document: documentId
              });
              relationshipsCreated.push(relationshipId);
            }
          }
        }
      }
      
      // Create nodes for tools
      if (extraction.tools) {
        for (const tool of extraction.tools) {
          const nodeId = `tool_${this.generateId(tool.name)}`;
          await this.createOrUpdateNode({
            id: nodeId,
            type: 'tool',
            name: tool.name,
            properties: {
              category: tool.category,
              cost_range: tool.cost_range,
              vendor: tool.vendor || 'Unknown',
              complexity: tool.complexity,
              smb_suitability: tool.smb_suitability || 5
            },
            source_documents: [documentId],
            confidence: tool.confidence || 70,
            created_at: new Date()
          });
          nodesCreated.push(nodeId);
          
          // Create relationships: tool IMPLEMENTS solution
          if (tool.implements_solutions) {
            for (const solutionName of tool.implements_solutions) {
              const relationshipId = await this.createRelationship({
                source_node: nodeId,
                target_node: `solution_${this.generateId(solutionName)}`,
                relationship_type: 'IMPLEMENTS',
                properties: {
                  automation_level: 70,
                  setup_complexity: tool.complexity
                },
                weight: 1.0,
                confidence: tool.confidence || 70,
                source_document: documentId
              });
              relationshipsCreated.push(relationshipId);
            }
          }
        }
      }
      
      console.log('Knowledge graph built successfully', {
        nodesCreated: nodesCreated.length,
        relationshipsCreated: relationshipsCreated.length
      });
      
      return { 
        success: true, 
        nodes_created: nodesCreated.length,
        relationships_created: relationshipsCreated.length,
        nodes: nodesCreated,
        relationships: relationshipsCreated
      };
      
    } catch (error) {
      console.error('Error building knowledge graph:', error);
      return { 
        success: false, 
        error: error.message,
        nodes_created: 0,
        relationships_created: 0
      };
    }
  }
  
  private async createOrUpdateNode(node: KnowledgeGraphNode) {
    try {
      const nodeRef = doc(db, 'advisory_knowledge_graph_nodes', node.id);
      const existingNode = await getDoc(nodeRef);
      
      if (existingNode.exists()) {
        // Update existing node
        const existing = existingNode.data();
        await updateDoc(nodeRef, {
          source_documents: [...new Set([...existing.source_documents, ...node.source_documents])],
          confidence: Math.max(existing.confidence, node.confidence),
          updated_at: new Date(),
          properties: {
            ...existing.properties,
            ...node.properties
          }
        });
        console.log('Updated existing node:', node.id);
      } else {
        // Create new node
        await setDoc(nodeRef, node);
        console.log('Created new node:', node.id);
      }
    } catch (error) {
      console.error('Error creating/updating node:', node.id, error);
    }
  }
  
  private async createRelationship(relationship: Omit<KnowledgeGraphRelationship, 'id' | 'created_at'>): Promise<string> {
    try {
      const relationshipData = {
        ...relationship,
        created_at: new Date()
      };
      
      const relationshipRef = await addDoc(collection(db, 'advisory_knowledge_graph_relationships'), relationshipData);
      console.log('Created relationship:', relationshipRef.id);
      return relationshipRef.id;
    } catch (error) {
      console.error('Error creating relationship:', error);
      return '';
    }
  }
  
  private generateId(name: string): string {
    return name.toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
  }
  
  async queryGraphForSolutions(painPoints: string[], industry?: string) {
    try {
      // This would be a complex query in a real graph database
      // For Firestore, we'll implement a simplified version
      
      const solutions = [];
      // Implementation would query for solutions that solve the given pain points
      
      return solutions;
    } catch (error) {
      console.error('Error querying graph for solutions:', error);
      return [];
    }
  }
  
  async getNodeNeighborhood(nodeId: string, depth: number = 2) {
    try {
      // Get all relationships involving this node
      // Return nodes and relationships within specified depth
      
      const neighborhood = {
        nodes: [],
        relationships: []
      };
      
      return neighborhood;
    } catch (error) {
      console.error('Error getting node neighborhood:', error);
      return { nodes: [], relationships: [] };
    }
  }
}

export default AdvisoryKnowledgeGraphBuilder;
