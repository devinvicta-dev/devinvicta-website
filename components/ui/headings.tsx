import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface HeadingProps {
  children: ReactNode
  className?: string
}

export function H1({ children, className }: HeadingProps) {
  return (
    <h1 className={cn('text-4xl md:text-6xl lg:text-7xl font-medium leading-tight', className)}>
      {children}
    </h1>
  )
}

export function H2({ children, className }: HeadingProps) {
  return (
    <h2 className={cn('text-3xl md:text-5xl lg:text-6xl font-medium leading-tight', className)}>
      {children}
    </h2>
  )
}

export function H3({ children, className }: HeadingProps) {
  return (
    <h3 className={cn('text-2xl md:text-4xl lg:text-5xl font-medium leading-tight', className)}>
      {children}
    </h3>
  )
}

export function H4({ children, className }: HeadingProps) {
  return (
    <h4 className={cn('text-xl md:text-2xl lg:text-3xl font-medium leading-tight', className)}>
      {children}
    </h4>
  )
}

export function H5({ children, className }: HeadingProps) {
  return (
    <h5 className={cn('text-lg md:text-xl lg:text-2xl font-medium leading-tight', className)}>
      {children}
    </h5>
  )
}

export function H6({ children, className }: HeadingProps) {
  return (
    <h6 className={cn('text-base md:text-lg lg:text-xl font-medium leading-tight', className)}>
      {children}
    </h6>
  )
}
