import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Frown } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] text-center">
      <Frown className="w-16 h-16 text-muted-foreground mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Strona nie znaleziona</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Przepraszamy, ale strona, której szukasz, nie istnieje.
      </p>
      <Button asChild size="lg">
        <Link href="/">Wróć do strony głównej</Link>
      </Button>
    </div>
  )
}
