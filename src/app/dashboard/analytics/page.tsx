// src/app/dashboard/analytics/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { db } from '@/lib/firebase'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, FileText, Clock, Users } from 'lucide-react'

interface FileData {
  id: string
  fileName: string
  uploadedAt: any
  status: string
  userId: string
}

interface UploadTrend {
  month: string
  uploads: number
}

export default function AnalyticsPage() {
  const { user } = useAuth()
  const [files, setFiles] = useState<FileData[]>([])
  const [loading, setLoading] = useState(true)
  const [uploadTrends, setUploadTrends] = useState<UploadTrend[]>([])

  useEffect(() => {
    if (!user) return

    const filesQuery = query(
      collection(db, 'files'),
      orderBy('uploadedAt', 'desc')
    )

    const unsubscribe = onSnapshot(filesQuery, (snapshot) => {
      const filesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FileData[]
      
      setFiles(filesData)
      processUploadTrends(filesData)
      setLoading(false)
    }, (error) => {
      console.error('Error fetching files:', error)
      setLoading(false)
    })

    return unsubscribe
  }, [user])

  const processUploadTrends = (filesData: FileData[]) => {
    const monthCounts: { [key: string]: number } = {}
    
    filesData.forEach(file => {
      if (file.uploadedAt && file.uploadedAt.toDate) {
        const date = file.uploadedAt.toDate()
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1
      }
    })

    const trends = Object.entries(monthCounts)
      .map(([month, uploads]) => ({ month, uploads }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6) // Last 6 months

    setUploadTrends(trends)
  }

  const getStatusDistribution = () => {
    const statusCounts: { [key: string]: number } = {}
    files.forEach(file => {
      const status = file.status || 'unknown'
      statusCounts[status] = (statusCounts[status] || 0) + 1
    })

    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count
    }))
  }

  const getRecentActivity = () => {
    return files
      .slice(0, 10)
      .map(file => ({
        fileName: file.fileName,
        date: file.uploadedAt?.toDate()?.toLocaleDateString() || 'Unknown',
        status: file.status || 'unknown'
      }))
  }

  const COLORS = ['#00ACC1', '#0097A7', '#00838F', '#006064', '#004D40']

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  const statusData = getStatusDistribution()
  const recentActivity = getRecentActivity()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">
          Insights and trends from your file processing activities
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Files
            </CardTitle>
            <FileText className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{files.length}</div>
            <p className="text-xs text-gray-500">
              All time uploads
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              This Month
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {files.filter(f => {
                if (!f.uploadedAt?.toDate) return false
                const date = f.uploadedAt.toDate()
                const now = new Date()
                return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
              }).length}
            </div>
            <p className="text-xs text-gray-500">
              Files uploaded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Processing Rate
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {files.length > 0 ? Math.round((files.filter(f => f.status === 'processed').length / files.length) * 100) : 0}%
            </div>
            <p className="text-xs text-gray-500">
              Files processed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Users
            </CardTitle>
            <Users className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(files.map(f => f.userId)).size}
            </div>
            <p className="text-xs text-gray-500">
              Unique uploaders
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upload Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={uploadTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="uploads" fill="#00ACC1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>File Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <p className="text-gray-600 text-center py-4">No recent activity</p>
            ) : (
              recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">{activity.fileName}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">{activity.date}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activity.status === 'processed' 
                        ? 'bg-green-100 text-green-800' 
                        : activity.status === 'processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}