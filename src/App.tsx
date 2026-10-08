import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Layout } from './components/Layout'

const Landing = lazy(() => import('./pages/Landing'))
const ChapterPage = lazy(() => import('./pages/ChapterPage'))
const VisualLab = lazy(() => import('./pages/VisualLab'))
const Glossary = lazy(() => import('./pages/Glossary'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))
const Presentation = lazy(() => import('./pages/Presentation'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-hairline border-t-cyan" />
    </div>
  )
}

export default function App() {
  const location = useLocation()

  // Presentation mode is a full-screen experience without the app chrome.
  const isPresentation = location.pathname.startsWith('/present')

  if (isPresentation) {
    return (
      <Suspense fallback={<PageFallback />}>
        <Routes location={location}>
          <Route path="/present" element={<Presentation />} />
        </Routes>
      </Suspense>
    )
  }

  return (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<Landing />} />
              <Route path="/chapter/:slug" element={<ChapterPage />} />
              <Route path="/lab" element={<VisualLab />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:slug" element={<CaseStudies />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </Layout>
  )
}
