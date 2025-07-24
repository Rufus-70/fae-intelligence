// src/app/dashboard/knowledge/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { KnowledgeStorageService } from '@/lib/knowledge/knowledgeStorage'
import { FAE_INTELLIGENCE_CATEGORIES } from '@/lib/knowledge/knowledgeMapper'
import { Search, Brain, FileText, Hash, Folder, TrendingUp, BarChart3, Clock } from 'lucide-react'

export default function KnowledgePage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<{
    totalDocuments: number
    totalChunks: number
    chunksByCategory: { [category: string]: number }
    documentsByComplexity: { [key: string]: number }
    averageChunksPerDocument: number
  } | null>(null)

  useEffect(() => {
    loadKnowledgeStats()
  }, [])

  const loadKnowledgeStats = async () => {
    try {
      const knowledgeStats = await KnowledgeStorageService.getKnowledgeStats()
      // Add calculated average
      const statsWithAverage = {
        ...knowledgeStats,
        averageChunksPerDocument: knowledgeStats.totalDocuments > 0 
          ? knowledgeStats.totalChunks / knowledgeStats.totalDocuments 
          : 0
      }
      setStats(statsWithAverage)
    } catch (error) {
      console.error('Error loading knowledge stats:', error)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim() && !selectedCategory) {
      return
    }

    setLoading(true)
    try {
      // Simplified search - just get empty results for now
      // TODO: Implement proper search when KnowledgeStorageService.searchKnowledge is available
      setSearchResults([])
      console.log('Search functionality not implemented yet')
    } catch (error) {
      console.error('Error searching knowledge:', error)
      alert('Failed to search knowledge base')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const getCategoryDisplayName = (categoryKey: string) => {
    return FAE_INTELLIGENCE_CATEGORIES[categoryKey]?.name || categoryKey
  }

  const getCategoryColor = (categoryKey: string) => {
    const colorMap: { [key: string]: string } = {
      'project-management': 'bg-blue-100 text-blue-800',
      'business-strategy': 'bg-purple-100 text-purple-800',
      'curriculum-development': 'bg-green-100 text-green-800',
      'marketing-sales': 'bg-pink-100 text-pink-800',
      'operations-legal': 'bg-gray-100 text-gray-800',
      'financials': 'bg-yellow-100 text-yellow-800',
      'technology': 'bg-indigo-100 text-indigo-800',
      'client-engagements': 'bg-cyan-100 text-cyan-800',
      'manufacturing-knowledge': 'bg-orange-100 text-orange-800',
      'ai-applications': 'bg-teal-100 text-teal-800',
      'research-insights': 'bg-red-100 text-red-800'
    }
    return colorMap[categoryKey] || 'bg-gray-100 text-gray-800'
  }

  if (!user) {
    return (
      <div className="py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to access the knowledge base.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-gray-600">
            Search and explore your organization's knowledge chunks
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-cyan-500" />
          <span className="text-sm text-gray-600">AI-Powered Knowledge Search</span>
        </div>
      </div>

      {/* Knowledge Stats */}
      {stats && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Documents
              </CardTitle>
              <FileText className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDocuments}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Knowledge Chunks
              </CardTitle>
              <Hash className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalChunks}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Categories Used
              </CardTitle>
              <Folder className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(stats.chunksByCategory || {}).length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Avg Chunks/Doc
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(stats.averageChunksPerDocument)}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Search Knowledge Base</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Input */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search for concepts, keywords, or topics..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">All Categories</option>
                  {Object.entries(FAE_INTELLIGENCE_CATEGORIES).map(([key, category]) => (
                    <option key={key} value={key}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <Button 
                onClick={handleSearch}
                disabled={loading}
                className="px-6"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>

            {/* Category Filter Pills */}
            {stats && Object.keys(stats.chunksByCategory || {}).length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Quick Filters:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(stats.chunksByCategory || {})
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 8)
                    .map(([category, count]) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          selectedCategory === category
                            ? getCategoryColor(category)
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {getCategoryDisplayName(category)} ({count})
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Search Results ({searchResults.length})
          </h3>
          
          {searchResults.map((result, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {/* Result Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {result.document.fileName}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {result.document.summary}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Badge className={getCategoryColor(result.chunk.metadata.category)}>
                        {getCategoryDisplayName(result.chunk.metadata.category)}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {Math.round(result.relevanceScore * 100)}% match
                      </span>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {result.chunk.content.length > 300 
                        ? result.chunk.content.substring(0, 300) + '...'
                        : result.chunk.content
                      }
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>Chunk {result.chunk.metadata.chunkIndex + 1} of {result.chunk.metadata.totalChunks}</span>
                      <span>{result.chunk.metadata.wordCount} words</span>
                      {result.chunk.metadata.section && (
                        <span>Section: {result.chunk.metadata.section}</span>
                      )}
                    </div>
                    
                    {/* Keywords */}
                    {result.chunk.metadata.keywords.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Hash className="h-3 w-3" />
                        <span>{result.chunk.metadata.keywords.slice(0, 3).join(', ')}</span>
                        {result.chunk.metadata.keywords.length > 3 && (
                          <span>+{result.chunk.metadata.keywords.length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {searchResults.length === 0 && (searchQuery || selectedCategory) && !loading && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or selecting a different category.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('')
                setSelectedCategory('')
                setSearchResults([])
              }}>
                Clear Search
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Getting Started */}
      {!stats || stats.totalDocuments === 0 && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Brain className="h-12 w-12 text-cyan-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Knowledge Base Empty</h3>
              <p className="text-gray-600 mb-4">
                Upload files with knowledge mapping enabled to start building your searchable knowledge base.
              </p>
              <Button onClick={() => window.location.href = '/dashboard/files'}>
                <FileText className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}