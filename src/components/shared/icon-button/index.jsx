import './index.css';

export const IconButton = ({ link, onClick, active, className, children }) => {
  
  const action = link ? () => window.location.pathname = link : onClick;
  const activeState = active || window.location.pathname === link;
  
  return (
    <button className={`icon-button ${className} ${activeState ? 'active' : ''}`} onClick={action}>
      {children}
    </button>
  );
}