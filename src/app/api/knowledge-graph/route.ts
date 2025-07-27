import { NextResponse } from 'next/server'
import { knowledgeGraphService } from '@/lib/knowledge/knowledgeGraphService'

export async function GET() {
  try {
    const graphData = await knowledgeGraphService.getGraphData()
    return NextResponse.json(graphData)
  } catch (error) {
    console.error('Error fetching knowledge graph data:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
