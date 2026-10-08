import { NavLink, useLocation } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { CHAPTERS } from '../data/chapters'
import { useProgress } from '../context/ProgressContext'
import { ACCENTS } from './ui'
import type { LucideIcon } from 'lucide-react'

function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = (Icons as unknown as Record<string, LucideIcon>)[name] ?? Icons.Circle
  return <Cmp className={className} />
}

const GLOBAL_LINKS = [
  { to: '/lab', label: 'Visual Lab', icon: 'FlaskConical' },
  { to: '/case-studies', label: 'Case Studies', icon: 'FileSearch' },
  { to: '/glossary', label: 'Glossary', icon: 'BookA' },
]

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { isRead, percentComplete } = useProgress()
  const location = useLocation()

  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <NavLink to="/" onClick={onNavigate} className="flex items-center gap-2.5 px-2">
        <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/20 to-violet/20 ring-1 ring-cyan/30">
          <Icons.ShieldHalf className="h-5 w-5 text-cyan" />
        </span>
        <span className="flex flex-col leading-none">
          <span className="text-sm font-extrabold tracking-[0.14em] text-ink">CYBERATLAS</span>
          <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted">Learning Experience</span>
        </span>
      </NavLink>

      <div className="px-2">
        <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-muted">
          <span>Course progress</span>
          <span className="text-cyan">{percentComplete}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan to-teal transition-all duration-500"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto pr-1" aria-label="Chapters">
        <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted">Chapters</p>
        {CHAPTERS.map((ch) => {
          const read = isRead(ch.number)
          return (
            <NavLink
              key={ch.slug}
              to={`/chapter/${ch.slug}`}
              onClick={onNavigate}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive ? 'bg-surface text-ink' : 'text-muted hover:bg-surface/60 hover:text-ink'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[11px] font-bold ring-1 transition-colors"
                    style={{
                      color: isActive ? ACCENTS[ch.accent] : undefined,
                      borderColor: 'transparent',
                      boxShadow: isActive ? `inset 0 0 0 1px ${ACCENTS[ch.accent]}55` : 'inset 0 0 0 1px rgb(255 255 255 / 0.06)',
                    }}
                  >
                    {String(ch.number).padStart(2, '0')}
                  </span>
                  <span className="flex min-w-0 flex-1 items-center gap-2">
                    <Icon name={ch.icon} className="h-3.5 w-3.5 shrink-0 opacity-70" />
                    <span className="truncate">{ch.title}</span>
                  </span>
                  {read && <Icons.CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-teal" />}
                </>
              )}
            </NavLink>
          )
        })}

        <p className="px-3 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-wider text-muted">Explore</p>
        {GLOBAL_LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive ? 'bg-surface text-ink' : 'text-muted hover:bg-surface/60 hover:text-ink'
              }`
            }
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center">
              <Icon name={l.icon} className="h-4 w-4" />
            </span>
            {l.label}
          </NavLink>
        ))}
      </nav>

      <NavLink
        to="/present"
        onClick={onNavigate}
        className="btn-primary w-full"
      >
        <Icons.Presentation className="h-4 w-4" />
        Presentation Mode
      </NavLink>
    </div>
  )
}
