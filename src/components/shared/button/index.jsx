import './index.css';

export const Button = ({ children, className, variant, size = 'regular', ...props }) => {

  return (
    <button
      className={`${variant} ${className} ${size}`}
      {...props}
    >
      {children}
    </button>
  )
}