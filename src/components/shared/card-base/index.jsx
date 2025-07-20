import './index.css'

export const CardBase = ({ children, className, ...props }) => {
  return (
    <div className={`card-base ${className}`} {...props}>
      <div className='underlay' />
      <div className='border h-line bottom'/>
      <div className='border v-line left'/>
      <div className='border h-line top'/>
      <div className='border v-line right'/>
      <div className='border corner bottom-right' />
      <div className='border corner bottom-left' />
      <div className='border corner top-right' />
      <div className='border corner top-left' />
      {children}
    </div>
  )
}