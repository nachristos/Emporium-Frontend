import { CartIcon } from '../../assets/icons/cart-icon';
import { MenuIcon } from '../../assets/icons/menu-icon';
import { UserIcon } from '../../assets/icons/user-icon';
import { IconButton } from '../shared/icon-button';
import logo from '../../assets/logo-small.png';
import './index.css';
import { useAuthContext } from '../../hooks/use-auth-context';
import { useState } from 'react';
import { CloseIcon } from '../../assets/icons/close-icon';

const NavButton = ({ name, onClick, active }) => {
  return (
    <div className={`mb ${active && 'active'}`} onClick={onClick}>
      <a><h2>{name}</h2></a>
    </div>
  )
}

export const Navigation = () => {
  const { setAuth } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState();
  
    const path = window.location.pathname;
    
    const setPath = (pathname) => {
      window.location.pathname = pathname
    }
  
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  }
  
  const handleSignOut = () => {
    setAuth(undefined);
  }
  
  return (
      <div className="nav" id={'nav'}>
          <div>
            <IconButton onClick={handleMenuClick} className='icon-button'><MenuIcon/></IconButton>
            <div>
              <div className={`drawer ${menuOpen ? 'open' : ''}`}>
                <div className='close'>
                  <IconButton className='icon-button' onClick={handleMenuClick}><CloseIcon/></IconButton>
                </div>
                <div className='items flex-col text center between'>
                  <div className='w-full p'>
                    <NavButton name={'Home'} active={path === '/home'} onClick={() => setPath('/home')}/>
                    <NavButton name={'About'} active={path === '/about'}/>
                    <div style={{ border: '1px solid white', marginBottom: 20 }} />
                  </div>
                    <NavButton name={'Sign Out'} onClick={handleSignOut}/>
                </div>
              </div>
            </div>
          </div>
          <IconButton className='icon-button' link={'/'}>
            <img className='logo' src={logo} alt='logo' />
          </IconButton>
          <div className='flex'>
            <div className='mx'>
              <IconButton className='icon-button' link={'/account'}><UserIcon/></IconButton>
            </div>
            <div>
              <IconButton className='icon-button' link={'/cart'}><CartIcon/></IconButton>
            </div>
          </div>
      </div>
  );
}