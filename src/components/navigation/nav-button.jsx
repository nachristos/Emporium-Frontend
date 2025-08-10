export const NavButton = ({ name, element, onClick, active, className = '' }) => {
    
  if (element) {
    return (
      <div className={`nav-button ${active && 'active'} ${className}`} onClick={onClick}>
        <a>{element}</a>
      </div>
    ) 
  }  
  
    return (
      <div className={`nav-button ${active && 'active'} ${className}`} onClick={onClick}>
        <a><h2>{name}</h2></a>
      </div>
    )
  }