import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router'

export function useScrollRestoration() {
  const location = useLocation()
  const navType = useNavigationType()
  const scrollMap = useRef(new Map())

  useEffect(() => {
    const key = location.key
    if (navType === 'POP') {
      const saved = scrollMap.current.get(key)
      if (saved != null) {
        requestAnimationFrame(() => window.scrollTo(0, saved))
      }
    } else {
      window.scrollTo(0, 0)
    }
    const handleScroll = () => scrollMap.current.set(key, window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.key, navType])
}
