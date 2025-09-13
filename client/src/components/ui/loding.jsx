import React from 'react'
import loadingIcon from '../../assets/images/loading.svg'

function Loading() {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <img src={loadingIcon} alt="" className='w-40' />
    </div>
  )
}

export default Loading