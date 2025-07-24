// src/app/dashboard/tags/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { db } from '@/lib/firebase'
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, where, getDocs } from 'firebase/firestore'
import { Tag, Plus, Trash2, Hash, FileText } from 'lucide-react'

interface TagData {
  id: string
  name: string
  description: string
  color: string
  createdAt: any
  fileCount?: number
}

const TAG_COLORS = [
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800', 
  'bg-purple-100 text-purple-800',
  'bg-yellow-100 text-yellow-800',
  'bg-red-100 text-red-800',
  'bg-indigo-100 text-indigo-800',
  'bg-pink-100 text-pink-800',
  'bg-teal-100 text-teal-800',
  'bg-orange-100 text-orange-800',
  'bg-cyan-100 text-cyan-800'
]

export default function TagsPage() {
  const { user } = useAuth()
  const [tags, setTags] = useState<TagData[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: TAG_COLORS[0]
  })

  useEffect(() => {
    if (!user) return

    const tagsQuery = query(
      collection(db, 'tags'),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(tagsQuery, async (snapshot) => {
      const tagsData = await Promise.all(
        snapshot.docs.map(async (docSnapshot) => {
          const tagData = { id: docSnapshot.id, ...docSnapshot.data() } as TagData
          
          // Get file count for this tag
          const filesQuery = query(
            collection(db, 'files'),
            where('tags', 'array-contains', tagData.name)
          )
          const filesSnapshot = await getDocs(filesQuery)
          tagData.fileCount = filesSnapshot.size

          return tagData
        })
      )
      
      setTags(tagsData)
      setLoading(false)
    }, (error) => {
      console.error('Error fetching tags:', error)
      setLoading(false)
    })

    return unsubscribe
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      alert('Tag name is required')
      return
    }

    // Clean tag name (remove special characters, make lowercase)
    const cleanTagName = formData.name.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')

    try {
      await addDoc(collection(db, 'tags'), {
        name: cleanTagName,
        displayName: formData.name.trim(),
        description: formData.description.trim(),
        color: formData.color,
        createdAt: serverTimestamp()
      })

      setFormData({ name: '', description: '', color: TAG_COLORS[0] })
      setShowForm(false)
    } catch (error) {
      console.error('Error creating tag:', error)
      alert('Failed to create tag')
    }
  }

  const handleDelete = async (tagId: string, tagName: string) => {
    if (!confirm(`Are you sure you want to delete "${tagName}"? This will not affect files already tagged with this tag.`)) {
      return
    }

    try {
      await deleteDoc(doc(db, 'tags', tagId))
    } catch (error) {
      console.error('Error deleting tag:', error)
      alert('Failed to delete tag')
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tags</h1>
          <p className="text-gray-600">
            Label your files with searchable tags for better organization
          </p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>{showForm ? 'Cancel' : 'Add Tag'}</span>
        </Button>
      </div>

      {/* Create Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Tag</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tag Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="e.g., Process Improvement, Quality Control"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Will be cleaned for use: spaces become dashes, special characters removed
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="What kind of files should have this tag?"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Theme
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {TAG_COLORS.map((color, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      className={`
                        p-2 rounded-md border-2 transition-all text-xs
                        ${formData.color === color ? 'border-gray-900' : 'border-gray-200'}
                        ${color}
                      `}
                    >
                      Tag
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <Button type="submit">Create Tag</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Tags
            </CardTitle>
            <Tag className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tags.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Files Tagged
            </CardTitle>
            <FileText className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tags.reduce((sum, tag) => sum + (tag.fileCount || 0), 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Most Used Tag
            </CardTitle>
            <Hash className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">
              {tags.length > 0 
                ? tags.reduce((max, tag) => (tag.fileCount || 0) > (max.fileCount || 0) ? tag : max, tags[0])?.name || 'None'
                : 'None'
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tags Cloud/Grid */}
      <Card>
        <CardHeader>
          <CardTitle>All Tags</CardTitle>
        </CardHeader>
        <CardContent>
          {tags.length === 0 ? (
            <div className="text-center py-12">
              <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tags yet</h3>
              <p className="text-gray-600 mb-4">
                Create your first tag to start labeling your files
              </p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Tag
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Tags as a flexible cloud */}
              <div className="flex flex-wrap gap-3">
                {tags
                  .sort((a, b) => (b.fileCount || 0) - (a.fileCount || 0))
                  .map((tag) => (
                    <div key={tag.id} className="flex items-center space-x-2">
                      <Badge className={`${tag.color} border-0 text-sm px-3 py-1`}>
                        <Hash className="h-3 w-3 mr-1" />
                        {tag.displayName || tag.name}
                        <span className="ml-2 text-xs opacity-75">
                          {tag.fileCount || 0}
                        </span>
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(tag.id, tag.displayName || tag.name)}
                        className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
              </div>

              {/* Detailed table view */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Detailed View</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium text-gray-600">Tag</th>
                        <th className="text-left py-2 font-medium text-gray-600">Description</th>
                        <th className="text-left py-2 font-medium text-gray-600">Files</th>
                        <th className="text-left py-2 font-medium text-gray-600">Created</th>
                        <th className="text-left py-2 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tags.map((tag) => (
                        <tr key={tag.id} className="border-b hover:bg-gray-50">
                          <td className="py-3">
                            <Badge className={`${tag.color} border-0`}>
                              <Hash className="h-3 w-3 mr-1" />
                              {tag.displayName || tag.name}
                            </Badge>
                          </td>
                          <td className="py-3 text-gray-600">
                            {tag.description || 'No description'}
                          </td>
                          <td className="py-3">
                            <span className="font-medium">{tag.fileCount || 0}</span>
                          </td>
                          <td className="py-3 text-gray-500">
                            {formatDate(tag.createdAt)}
                          </td>
                          <td className="py-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(tag.id, tag.displayName || tag.name)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}