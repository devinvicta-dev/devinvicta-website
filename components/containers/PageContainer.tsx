import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  className?: string
  padded?: boolean
}

export default function PageContainer({ children, className, padded = true }: PageContainerProps) {
  return (
    <main
      className={cn(
        'mx-auto flex max-w-page flex-col',
        padded && 'px-5 py-16 md:px-8 md:py-24 lg:py-32',
        className
      )}
    >
      {children}
    </main>
  )
}
