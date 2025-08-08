import './index.css';

export const Quantity = ({ value, onChange}) => {
  
  return (
    <div className="quantity flex">
      <button onClick={() => value && onChange(value - 1)}><h5>-</h5></button>
      <div className="value">{value}</div>
      <button onClick={() => onChange(value + 1)}><h5>+</h5></button>
    </div>
  )
}