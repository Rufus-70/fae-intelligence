// src/app/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'

import { useAuth } from '@/components/auth/AuthProvider'
import { businessIntelligence, type BusinessMetrics, type ClientDataProfile } from '@/lib/faes-web/businessIntelligence'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { FileText, TrendingUp, Activity, Brain, AlertTriangle, Palette, Building2, ExternalLink } from 'lucide-react'
import VisualBlogEditor from '@/components/blog/VisualBlogEditor'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

interface DashboardData {
  businessMetrics: BusinessMetrics | null
  clientProfiles: ClientDataProfile[]
  loading: boolean
  error: string | null
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    businessMetrics: null,
    clientProfiles: [],
    loading: true,
    error: null
  })
  const [title, setTitle] = useState('My Awesome Blog Post')
  const [content, setContent] = useState('')

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    console.log('📋 Dashboard: Starting to load business metrics...')
    try {
      setDashboardData(prev => ({ ...prev, loading: true, error: null }))
      
      // Check if faes-web integration is properly configured
      const isConfigured = process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'your-api-key'
      
      if (!isConfigured) {
        console.log('⚠️ Dashboard: Using demo data - faes-web not configured')
        // Provide demo/fallback data
        const demoMetrics: BusinessMetrics = {
          totalFiles: 42,
          totalAnalyses: 38,
          filesByCategory: {
            'business_strategy': 15,
            'financial_analysis': 12,
            'operations': 8,
            'marketing': 7
          },
          filesByDocumentType: {
            'business_plan': 18,
            'financial_report': 12,
            'process_documentation': 8,
            'market_analysis': 4
          },
          averageFileSize: 2048000,
          recentActivity: [],
          businessInsights: [
            'Strong focus on business strategy documentation',
            'Financial analysis capabilities are well-developed',
            'Opportunity to improve marketing documentation',
            'Good coverage of operational processes'
          ]
        }
        
        setDashboardData({
          businessMetrics: demoMetrics,
          clientProfiles: [],
          loading: false,
          error: null
        })
        return
      }
      
      console.log('🔍 Dashboard: Calling businessIntelligence.getBusinessMetrics()')
      const metrics = await businessIntelligence.getBusinessMetrics()
      console.log('📊 Dashboard: Received metrics:', metrics)
      
      setDashboardData({
        businessMetrics: metrics,
        clientProfiles: [], // Will be populated when we have user-specific data
        loading: false,
        error: null
      })
      
      console.log('✅ Dashboard: Data loaded successfully')
    } catch (error) {
      console.error('❌ Dashboard load error:', error)
      setDashboardData(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load dashboard data. Please check your connection to faes-web.'
      }))
    }
  }

  if (!user) {
    return (
      <div className="py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to access the dashboard.</p>
        </div>
      </div>
    )
  }

  if (dashboardData.loading) {
    return (
      <div className="py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading business intelligence data...</p>
        </div>
      </div>
    )
  }

  if (dashboardData.error) {
    return (
      <div className="py-16">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Error</h1>
          <p className="text-gray-600 mb-4">{dashboardData.error}</p>
          <button 
            onClick={loadDashboardData}
            className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const { businessMetrics } = dashboardData

  // Check if we're using demo data
  const isUsingDemoData = process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'your-api-key'

  // Prepare chart data
  const categoryChartData = businessMetrics ? Object.entries(businessMetrics.filesByCategory).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  })) : []

  const documentTypeChartData = businessMetrics ? Object.entries(businessMetrics.filesByDocumentType).map(([name, value]) => ({
    name: name.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    value
  })) : []

  return (
    <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Intelligence Dashboard</h1>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                {isUsingDemoData 
                  ? "Demo insights for development (configure faes-web for live data)" 
                  : "Real-time insights from faes-web data processing platform"
                }
              </p>
              <div className="flex items-center space-x-2">
                {isUsingDemoData ? (
                  <div className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    🎯 Demo Data ({businessMetrics?.totalFiles || 0} sample files)
                  </div>
                ) : businessMetrics && businessMetrics.totalFiles > 0 ? (
                  <div className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    ✅ Live Data ({businessMetrics.totalFiles} files)
                  </div>
                ) : (
                  <div className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                    ⚠️ No Data Available
                  </div>
                )}
              </div>
            </div>
          </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Files Processed"
            value={businessMetrics?.totalFiles || 0}
            icon={FileText}
            color="bg-blue-500"
          />
          <MetricCard
            title="Analyses Completed"
            value={businessMetrics?.totalAnalyses || 0}
            icon={Brain}
            color="bg-green-500"
          />
          <MetricCard
            title="Avg File Size"
            value={businessMetrics ? `${(businessMetrics.averageFileSize / 1024).toFixed(1)}KB` : '0KB'}
            icon={Activity}
            color="bg-purple-500"
          />
          <MetricCard
            title="Business Categories"
            value={businessMetrics ? Object.keys(businessMetrics.filesByCategory).length : 0}
            icon={TrendingUp}
            color="bg-orange-500"
          />
        </div>

        {/* Content Creation Section */}
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🛠️ Content Creation Tools</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Post Title</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter your blog post title"
                        className="text-xl"
                    />
                </CardContent>
            </Card>
            <div className="mt-6">
                <VisualBlogEditor
                    value={content}
                    onChange={setContent}
                    title={title}
                    placeholder="Start writing your blog post here..."
                />
            </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Business Categories Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Files by Business Category</h3>
            {categoryChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </div>

          {/* Document Types Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Types</h3>
            {documentTypeChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={documentTypeChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </div>
        </div>

        {/* Business Insights */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Generated Business Insights</h3>
          {businessMetrics?.businessInsights && businessMetrics.businessInsights.length > 0 ? (
            <div className="space-y-3">
              {businessMetrics.businessInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">{insight}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No insights available yet. More data needed for analysis.</p>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent File Activity</h3>
          {businessMetrics?.recentActivity && businessMetrics.recentActivity.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      AI Relevance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {businessMetrics.recentActivity.map((file) => (
                    <tr key={file.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {file.fileName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.documentType.replace('_', ' ').split(' ').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.businessCategory.charAt(0).toUpperCase() + file.businessCategory.slice(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          file.smb_relevance === 'high' ? 'bg-green-100 text-green-800' :
                          file.smb_relevance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {file.smb_relevance.charAt(0).toUpperCase() + file.smb_relevance.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.uploadedAt.toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No recent activity to display.</p>
          )}
        </div>

        {/* Service Recommendations Panel */}
        <div className="mt-8 bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg border border-cyan-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🚀 Business Development Opportunities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">High-Value Prospects:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Clients with high AI readiness scores</li>
                <li>• Multiple business categories represented</li>
                <li>• Consistent file processing activity</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Recommended Services:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Custom AI Strategy Development</li>
                <li>• Document Processing Automation</li>
                <li>• Business Intelligence Dashboards</li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  color: string
}

function MetricCard({ title, value, icon: Icon, color }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}