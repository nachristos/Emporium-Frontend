import './index.css'

export const Input = ({ type = 'text', placeholder, className, onChange, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`input ${className}`}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  )
}