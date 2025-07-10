import { CartIcon } from '../../assets/icons/cart-icon';
import { MenuIcon } from '../../assets/icons/menu-icon';
import { UserIcon } from '../../assets/icons/user-icon';
import { IconButton } from '../shared/icon-button';
import logo from '../../assets/logo-small.png';
import './index.css';

export const Navigation = () => {  
  return (
      <div className="nav" id={'nav'}>
          <div>
            <IconButton className='icon-button'><MenuIcon/></IconButton>
          </div>
          <IconButton className='icon-button' link={'/login'}>
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