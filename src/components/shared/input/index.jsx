import './index.css'

export const Input = ({ type = 'text', alert, placeholder, className, onChange, ...props }) => {
  return (
    <div className={`input-container w-full`}>
      <h4>{placeholder}</h4>
      <input
        type={type}
        placeholder={placeholder}
        className={`input ${className}`}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      { alert && (
      <div className='alert-wrapper'>
        <div className='triangle-down'></div>
        <div className='alert'>{alert}</div>
      </div>
      )}
    </div>
  )
}