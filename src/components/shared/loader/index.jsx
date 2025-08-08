import './index.css';

export const Loader = () => {  
  return (
    <div className='loader h-full flex col center'>
      <div>
        <img src="/minion.gif" />
        <h2 className='text'>Loading</h2>
      </div>
    </div>
  )
}