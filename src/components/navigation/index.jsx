import { CartIcon } from '../../assets/icons/cart-icon';
import { MenuIcon } from '../../assets/icons/menu-icon';
import { UserIcon } from '../../assets/icons/user-icon';
import { IconButton } from '../shared/icon-button';
import logo from '../../assets/logo-small.png';
import './index.css';
import { useAuthContext } from '../../hooks/use-auth-context';
import { useRef, useState } from 'react';
import { CloseIcon } from '../../assets/icons/close-icon';
import { SearchIcon } from '../../assets/icons/search-icon';
import { Search } from './search';
import { NavButton } from './nav-button';
import { useCartContext } from '../../hooks/use-cart-context';

export const Navigation = () => {
  const { setAuth } = useAuthContext();
  const { open } = useCartContext();
  const [menuOpen, setMenuOpen] = useState();
  const searchRef = useRef(null);
  const ref = useRef(null);
  
  const [searchOpen, setSearchOpen] = useState(false);
  
  const path = window.location.pathname;
  
  const setPath = (pathname) => {
    window.location.pathname = pathname
  }
  
  const handleOpen = () => {
    setMenuOpen(true);
    ref.current.focus();
  }
  
  const handleSignOut = () => {
    setAuth(undefined);
  }
  
  const handleSearchClick = () => {
    setSearchOpen(!searchOpen)
    searchRef.current.focus();
  }
  
  return (
    <>
      <div className="nav" id={'nav'}>
        <Search ref={searchRef} open={searchOpen} onBlur={() => setSearchOpen(false)} />
        <div className='flex'>
          <IconButton onClick={handleOpen}><MenuIcon/></IconButton>
          
          <div className='mxs'>
            <IconButton className='icon-button' active={searchOpen} onClick={handleSearchClick}><SearchIcon /></IconButton>
          </div>
        </div>
        <IconButton link={'/'}>
          <img className='logo' src={logo} alt='logo' />
        </IconButton>
        <div className='flex'>
          <div className='mx'>
            <IconButton link={'/account'}><UserIcon/></IconButton>
          </div>
          <div>
            <IconButton  onClick={open}><CartIcon/></IconButton>
          </div>
        </div>
      </div>
      <div>
        <div ref={ref} onMouseLeave={() => setMenuOpen(false)} className={`drawer ${menuOpen ? 'open' : ''}`}>
          <div className='close'>
            <IconButton onClick={() => setMenuOpen(false)}><CloseIcon/></IconButton>
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
    </>
  );
}