import React from 'react'
import { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function ServiceCard({ 
  icon: Icon, 
  title, 
  description, 
  className = '' 
}: ServiceCardProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${className}`}>
      <div className="flex flex-col items-center text-center">
        <Icon className="h-16 w-16 text-cyan-500 mb-4" />
        <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
