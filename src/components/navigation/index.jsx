import { CartIcon } from '../../assets/icons/cart-icon';
import { MenuIcon } from '../../assets/icons/menu-icon';
import { UserIcon } from '../../assets/icons/user-icon';
import { IconButton } from '../shared/icon-button';
import logo from '../../assets/logo-small.png';
import './index.css';
import { useAuthContext } from '../../hooks/use-auth-context';
import { useMemo, useRef, useState } from 'react';
import { CloseIcon } from '../../assets/icons/close-icon';
import { SearchIcon } from '../../assets/icons/search-icon';
import { Search } from './search';
import { NavButton } from './nav-button';
import { useCartContext } from '../../hooks/use-cart-context';
import { ChevDown } from '../../assets/icons/chev-down';
import { clearSearch, setSearch } from '../../utils/searchParams';
import { useItems } from '../../hooks/use-items';
import { AuthWrapper } from '../shared/auth-wrapper';

export const Navigation = () => {
  const { token, setAuth } = useAuthContext();
  const { cart } = useCartContext();
  const { open } = useCartContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopAll, setShopAll] = useState(true)
  const searchRef = useRef(null);
  const ref = useRef(null);
  const { data } = useItems();
  
  const categories = useMemo(() => {
    const set = new Set();
    data?.map(d => set.add(d.category));
    return [...set];
  },[data])
  
  const totalItems = useMemo(() => {
    return Object.values(cart).reduce((acc, item) => acc + item, 0);
  }, [cart]);
  
  const [searchOpen, setSearchOpen] = useState(false);
  
  const path = window.location.pathname;
  
  const setPath = (pathname, search, value) => {
    if(search) {
      setSearch(search, value)
    } else {
      clearSearch();
    }
    window.location.pathname = pathname;
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
            { !!totalItems && <div className='notification'>{totalItems}</div>}
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
            <div className='w-full px'>
              <AuthWrapper>
                <NavButton className='mb' name={'Admin'} active={path.includes('/admin')} onClick={() => setPath('/admin')}/>
              </AuthWrapper>
              <NavButton className='mb' name={'Home'} active={path === '/home'} onClick={() => setPath('/home')}/>
              <NavButton className='mb' name={'About'} active={path === '/about'} onClick={() => setPath('/about')}/>
              <div className='divider mb' />
              <NavButton element={
                <div className='shop-all'>
                  <h2>
                    {'Shop All'}
                  </h2>
                  <ChevDown active={shopAll} />
                </div>
                } onClick={() => setShopAll(!shopAll)}/>
              {shopAll && (
                <div className='shop-items'>
                <NavButton className='mys' element={<h4>All Items</h4>} onClick={() => setPath('/shop')}/>
                  {categories.map(c => (
                    <NavButton className='mys' element={<h4>{c}</h4>} onClick={() => setPath('/shop', 'category', c)}/>
                  ))}
                </div>
              )}
            </div>
          </div>
          {token &&
            <div className='signout text'>
              <NavButton name={'Sign Out'} onClick={handleSignOut}/>
            </div>
          } 
        </div>
      </div>
    </>
  );
}