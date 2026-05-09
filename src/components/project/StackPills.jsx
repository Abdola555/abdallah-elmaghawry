import Pill from '../primitives/Pill.jsx'

// Heuristic: tools (software) → cyan variant, hardware parts/standards → default
const SOFTWARE_KEYWORDS = [
  'altium', 'ltspice', 'simplis', 'matlab', 'simulink', 'python', 'pyvisa',
  'autocad', 'scpi', 'fusion', 'kicad', 'cadence', 'orcad',
]

function pillVariant(tool) {
  const lower = tool.toLowerCase()
  return SOFTWARE_KEYWORDS.some(kw => lower.includes(kw)) ? 'cyan' : 'default'
}

export default function StackPills({ stack }) {
  if (!stack || stack.length === 0) return null

  return (
    <section>
      <p
        className="mb-4"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--color-primary)',
          letterSpacing: '0.1em',
        }}
      >
        // tech stack
      </p>

      <div className="flex flex-wrap gap-2">
        {stack.map(tool => (
          <Pill key={tool} variant={pillVariant(tool)}>
            {tool}
          </Pill>
        ))}
      </div>
    </section>
  )
}
