export default function GridBackdrop({ children, className = '', style = {} }) {
  return (
    <div className={`grid-backdrop ${className}`} style={style}>
      {children}
    </div>
  )
}
