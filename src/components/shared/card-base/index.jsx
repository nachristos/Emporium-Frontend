import './index.css'

export const CardBase = ({ children, className, ...props }) => {
  return (
    <div className={`card-base ${className}`} {...props}>
      {children}
    </div>
  )
}