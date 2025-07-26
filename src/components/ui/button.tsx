import React from 'react'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  asChild?: boolean
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  onClick, 
  disabled = false,
  className = '',
  type = 'button',
  asChild = false,
  ...props 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500", 
    outline: "border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white focus:ring-cyan-500"
  }
  
  const sizes = {
    sm: "px-3 py-2 text-sm rounded",
    md: "px-6 py-3 text-base rounded-lg",
    lg: "px-8 py-4 text-lg rounded-lg"
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  // If asChild is true, render children directly with className applied
  if (asChild) {
    const child = children as React.ReactElement<any>
    return React.cloneElement(child, {
      className: `${child.props.className || ''} ${classes}`.trim(),
      ...props
    } as any)
  }
  
  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  
  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button