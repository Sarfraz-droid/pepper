import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

function Loader() {
  return (
    <div
        className='text-white flex justify-center items-center w-full h-full'
    >
        <AiOutlineLoading className={`animate-spin w-24 h-24`} />
    </div>
  )
}

export default Loader
