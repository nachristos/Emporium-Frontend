export const NavButton = ({ name, onClick, active }) => {
    return (
      <div className={`mb ${active && 'active'}`} onClick={onClick}>
        <a><h2>{name}</h2></a>
      </div>
    )
  }