import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <Compass className="h-12 w-12 text-cyan" />
      <h1 className="mt-4 text-3xl font-extrabold text-ink">Off the map</h1>
      <p className="mt-2 max-w-md text-muted">
        This page isn’t part of the atlas. Let’s get you back to familiar territory.
      </p>
      <Link to="/" className="btn-primary mt-6">
        Return to the landing page
      </Link>
    </div>
  )
}
