'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
     <div className="container flex flex-col items-center justify-center min-h-[60vh] text-center">
      <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
      <h1 className="text-4xl font-bold mb-2">500 - Wystąpił błąd serwera</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Coś poszło nie tak. Spróbuj ponownie później.
      </p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Spróbuj ponownie
      </Button>
    </div>
  )
}
