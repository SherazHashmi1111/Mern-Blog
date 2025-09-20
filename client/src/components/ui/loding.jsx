import React from 'react'
import loadingIcon from '../../assets/images/spinner.svg'

function Loading() {
  return (
    <div className='w-screen h-screen flex items-center justify-center top-0 left-0 fixed'>
        <img src={loadingIcon} alt="" className='w-30' />
    </div>
  )
}

export default Loading