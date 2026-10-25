import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import EmptyState from './EmptyState.jsx'

function LessonCard({ lesson, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const shouldReduce = useReducedMotion()

  const animProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
        transition: { duration: 0.5, delay: index * 0.1, ease: 'easeOut' },
      }

  return (
    <motion.div
      ref={ref}
      {...animProps}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderLeft: '3px solid var(--color-primary)',
        borderRadius: '0.75rem',
        padding: '1.5rem',
      }}
    >
      <h3
        className="font-bold mb-3"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.05rem',
          color: 'var(--color-text)',
          lineHeight: 1.3,
        }}
      >
        {lesson.heading}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.9rem',
          color: 'var(--color-muted)',
          lineHeight: 1.75,
        }}
      >
        {lesson.body}
      </p>
    </motion.div>
  )
}

export default function LessonsBlock({ lessons }) {
  return (
    <section>
      <p
        className="mb-6"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--color-primary)',
          letterSpacing: '0.1em',
        }}
      >
        // lessons &amp; first principles
      </p>

      {!lessons || lessons.length === 0 ? (
        <EmptyState label="Lessons & first-principles" />
      ) : (
        <div className="space-y-4">
          {lessons.map((lesson, i) => (
            <LessonCard key={i} lesson={lesson} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}
