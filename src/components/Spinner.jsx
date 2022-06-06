import React from 'react'

const Spinner = ({hideBtn}) => {
  return (
    <div className='spinner-container' style={{display:hideBtn}}>
      <p className='loader'>Starting Weather App</p>
      <div className='spinner'></div>
      <p className='loader'>Please Wait...</p>
    </div>
  )
}

export default Spinner