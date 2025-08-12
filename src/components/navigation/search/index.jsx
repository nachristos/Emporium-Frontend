import { useMemo, useState } from 'react';
import { SearchIcon } from '../../../assets/icons/search-icon';
import { useItems } from '../../../hooks/use-items';
import './index.css';
import placeHolderImg from '/weapon.png';

export const Search = ({ ref, open, onBlur }) => {
  const { data } = useItems();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredItems = useMemo(() => {
    return searchTerm ? data?.filter(item => item.name.toLowerCase().includes(searchTerm)) : [];
  },[data, searchTerm])
  
  const handleClick = (id) => {
    location.pathname = `/shop/${id}`;
  }
  
  const handleBlur = () => {
      onBlur();
  }
  
  const handleChange = (value) => {
    setSearchTerm(value);
  }

  return (
  <div className={`search ${open ? 'open' : ''}`} onMouseLeave={handleBlur}>
    <div className='underlay' />
    <div className='border h-line bottom'/>
    <div className='border v-line left'/>
    <div className='border h-line top'/>
    <div className='border v-line right'/>
    <div className='border corner bottom-right' />
    <div className='border corner bottom-left' />
    <div className='border corner top-right' />
    <div className='border corner top-left' />
    <div className='w-full p'>
      <div className='flex w-full'>
        <div style={{ marginRight: '6px'}}>
          <SearchIcon />
        </div>
        <input onChange={v => handleChange(v.currentTarget.value.toLowerCase())} ref={ref} />
      </div>
      <div className='w-full divider'>
        { open && filteredItems?.map(i => (
          <div className='pt'>
            <button onClick={() => handleClick(i._id)}>
              <img className="image" src={i.imgURL || placeHolderImg} />
              <h2 className='body' style={{ marginLeft: '12px'}}>
                {i.name}
              </h2>
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
)}