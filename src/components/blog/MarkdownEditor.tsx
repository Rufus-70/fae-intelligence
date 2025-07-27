// src/components/blog/MarkdownEditor.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Eye, Edit, FileText, Lightbulb, Zap, Copy } from 'lucide-react'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = "Write your content in Markdown..." 
}: MarkdownEditorProps) {
  const [previewMode, setPreviewMode] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)

  // Professional blog post templates
  const templates = {
    'How-To Guide': `# How to [Title]: A Complete Guide

## Introduction
Briefly introduce the problem you're solving and why it matters to your readers.

## What You'll Need
- List any prerequisites
- Tools or resources required
- Time investment

## Step-by-Step Instructions

### Step 1: [First Action]
Detailed explanation of the first step with clear instructions.

### Step 2: [Second Action]
Continue with subsequent steps, using clear headings and bullet points.

### Step 3: [Third Action]
Keep each step focused and actionable.

## Common Challenges & Solutions
Address potential roadblocks your readers might face.

## Conclusion
Summarize key takeaways and next steps.

---
*Ready to get started? [Call to action]*`,

    'Industry Insights': `# [Industry Trend/Topic]: What It Means for Your Business

## The Current Landscape
Set the stage with current industry context and relevant statistics.

## Key Trends We're Seeing
### Trend 1: [Name]
**Impact:** What this means for businesses
**Timeline:** When to expect changes
**Action:** What companies should do

### Trend 2: [Name]
**Impact:** What this means for businesses
**Timeline:** When to expect changes
**Action:** What companies should do

## Real-World Applications
Share specific examples and case studies.

## Looking Ahead
Predictions and recommendations for the future.

## Take Action Today
Specific steps readers can implement immediately.`,

    'Problem-Solution': `# Solving [Problem]: A Strategic Approach

## The Challenge
Clearly define the problem your audience faces.

**Who This Affects:**
- Target audience segment 1
- Target audience segment 2
- Target audience segment 3

## Why Traditional Solutions Fall Short
Explain current approaches and their limitations.

## Our Recommended Solution
Present your solution with clear benefits.

### Benefits Include:
- **Efficiency:** Specific improvement metric
- **Cost Savings:** Quantified savings
- **Time Reduction:** Measurable time benefits

## Implementation Strategy
### Phase 1: Planning
- Step-by-step planning process
- Key stakeholders to involve
- Timeline considerations

### Phase 2: Execution
- Deployment steps
- Success metrics
- Monitoring approaches

### Phase 3: Optimization
- Continuous improvement
- Performance tracking
- Scaling strategies

## Results You Can Expect
Share realistic outcomes and success stories.

## Ready to Get Started?
Clear call-to-action with next steps.`,

    'AI Technology': `# Understanding [AI Technology]: Applications for Modern Business

## What is [AI Technology]?
Simple, jargon-free explanation of the technology.

## Why It Matters Now
Current market drivers and business pressures.

## Practical Applications
### Manufacturing
- Specific use case 1
- Specific use case 2
- ROI potential

### Operations
- Efficiency improvements
- Cost reductions
- Quality enhancements

### Customer Experience
- Personalization opportunities
- Service improvements
- Competitive advantages

## Implementation Considerations
### Technical Requirements
- Infrastructure needs
- Integration challenges
- Skill requirements

### Business Considerations
- Investment levels
- Timeline expectations
- Risk factors

## Success Stories
Real examples from similar businesses.

## Getting Started
Practical first steps for implementation.`
  }

  // Content enhancement suggestions
  const suggestions = [
    "Add specific statistics or data points to strengthen your argument",
    "Include a real-world example or case study",
    "Consider adding actionable takeaways in bullet points",
    "Use subheadings to break up long sections",
    "Add a compelling call-to-action at the end",
    "Include relevant industry keywords naturally",
    "Consider adding a brief author bio or company mention",
    "Use numbered lists for step-by-step processes"
  ]

  const insertTemplate = (templateName: keyof typeof templates) => {
    onChange(templates[templateName])
    setShowTemplates(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // Simple markdown to HTML converter for preview
  const markdownToHtml = (markdown: string) => {
    return markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mb-4 mt-6 text-gray-900 border-b border-gray-200 pb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-6 mt-8 text-gray-900 border-b-2 border-cyan-200 pb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-8 mt-10 text-gray-900 border-b-2 border-cyan-500 pb-4">$1</h1>')
      // Bold and Italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto mb-6 border-l-4 border-cyan-500"><code class="text-sm font-mono">$1</code></pre>')
      .replace(/`(.*?)`/g, '<code class="bg-cyan-50 text-cyan-800 px-2 py-1 rounded font-mono text-sm border border-cyan-200">$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-cyan-600 hover:text-cyan-800 underline decoration-2 underline-offset-2 font-medium">$1</a>')
      // Lists
      .replace(/^\* (.+)$/gm, '<li class="mb-2 text-gray-700 leading-relaxed">• $1</li>')
      .replace(/(<li class="mb-2 text-gray-700 leading-relaxed">.*<\/li>)/g, '<ul class="list-none mb-6 space-y-2 pl-4 border-l-2 border-cyan-200">$1</ul>')
      // Callout boxes
      .replace(/^\*\*Note:\*\*(.*$)/gm, '<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-r-lg"><p class="text-blue-800 font-medium"><strong>Note:</strong>$1</p></div>')
      .replace(/^\*\*Tip:\*\*(.*$)/gm, '<div class="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded-r-lg"><p class="text-green-800 font-medium"><strong>💡 Tip:</strong>$1</p></div>')
      .replace(/^\*\*Warning:\*\*(.*$)/gm, '<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4 rounded-r-lg"><p class="text-yellow-800 font-medium"><strong>⚠️ Warning:</strong>$1</p></div>')
      // Paragraphs with better spacing
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">')
      // Wrap in paragraph tags
      .replace(/^(.+)$/, '<p class="mb-4 text-gray-700 leading-relaxed">$1</p>')
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Editor Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-2">
            <Button
              type="button"
              variant={!previewMode ? "primary" : "outline"}
              size="sm"
              onClick={() => setPreviewMode(false)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Write
            </Button>
            <Button
              type="button"
              variant={previewMode ? "primary" : "outline"}
              size="sm"
              onClick={() => setPreviewMode(true)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowTemplates(!showTemplates)}
            >
              <FileText className="h-4 w-4 mr-2" />
              Templates
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              {value.length} characters • {Math.ceil(value.split(' ').length / 200)} min read
            </div>
            <div className="text-sm text-green-600 font-medium">
              ✓ Professional formatting enabled
            </div>
          </div>
        </div>

        {/* Templates Panel */}
        {showTemplates && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border-t">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Professional Blog Templates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.keys(templates).map((templateName) => (
                <Button
                  key={templateName}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertTemplate(templateName as keyof typeof templates)}
                  className="justify-start text-left h-auto py-3"
                >
                  <div>
                    <div className="font-medium">{templateName}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {templateName === 'How-To Guide' && 'Step-by-step instructional content'}
                      {templateName === 'Industry Insights' && 'Trend analysis and business impact'}
                      {templateName === 'Problem-Solution' && 'Address challenges with solutions'}
                      {templateName === 'AI Technology' && 'Technology explanations for business'}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Editor/Preview Area */}
      {!previewMode ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-3 space-y-4">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              rows={24}
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 font-mono text-sm resize-none shadow-sm bg-white"
            />
            
            {/* Enhanced Markdown Cheat Sheet */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg border border-cyan-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Zap className="h-4 w-4 mr-2 text-cyan-600" />
                Professional Markdown Guide
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="font-medium text-gray-700">Structure</div>
                  <div className="space-y-1">
                    <div><code className="bg-white px-2 py-1 rounded"># Main Title</code></div>
                    <div><code className="bg-white px-2 py-1 rounded">## Section</code></div>
                    <div><code className="bg-white px-2 py-1 rounded">### Subsection</code></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-gray-700">Formatting</div>
                  <div className="space-y-1">
                    <div><code className="bg-white px-2 py-1 rounded">**Bold text**</code></div>
                    <div><code className="bg-white px-2 py-1 rounded">*Italic text*</code></div>
                    <div><code className="bg-white px-2 py-1 rounded">`Code snippet`</code></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-gray-700">Special</div>
                  <div className="space-y-1">
                    <div><code className="bg-white px-2 py-1 rounded">[Link](URL)</code></div>
                    <div><code className="bg-white px-2 py-1 rounded">* List item</code></div>
                    <div><code className="bg-white px-2 py-1 rounded">**Tip:** Content</code></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Writing Assistant Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                Writing Tips
              </h4>
              <div className="space-y-3 text-sm">
                {suggestions.slice(0, 4).map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                    <div className="text-gray-700">{suggestion}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-2">Quick Actions</div>
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs"
                    onClick={() => copyToClipboard("**Tip:** Add your insight here")}
                  >
                    <Copy className="h-3 w-3 mr-2" />
                    Insert Tip Box
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs"
                    onClick={() => onChange(value + "\n\n## Key Takeaways\n\n* \n* \n* \n")}
                  >
                    <Copy className="h-3 w-3 mr-2" />
                    Add Takeaways
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-8 min-h-[600px] shadow-sm">
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-cyan prose-lg max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: value ? markdownToHtml(value) : 
                  `<div class="text-center py-20">
                    <div class="text-gray-400 text-6xl mb-4">📝</div>
                    <p class="text-gray-500 italic text-lg">Start writing to see your preview...</p>
                    <p class="text-gray-400 text-sm mt-2">Use the templates above for professional blog structures</p>
                  </div>` 
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
