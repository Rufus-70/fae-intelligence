'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { GraphData } from '@/lib/knowledge/knowledgeGraphService'

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
})

export default function KnowledgeGraphPage() {
  const [graphData, setGraphData] = useState<GraphData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/knowledge-graph')
        if (!response.ok) {
          throw new Error('Failed to fetch graph data')
        }
        const data = await response.json()
        setGraphData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Knowledge Graph</h1>
      <p className="text-gray-600 mb-8">
        Visualizing the connections in your knowledge base.
      </p>
      <div className="bg-white p-6 rounded-lg shadow-md h-[600px]">
        {isLoading && <p>Loading graph data...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {graphData && (
          <ForceGraph2D
            graphData={graphData}
            nodeLabel="id"
            nodeAutoColorBy="id"
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
          />
        )}
      </div>
    </div>
  )
}
