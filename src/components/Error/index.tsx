import React from 'react'

function ErrorHandler() {
  return (
    <div
        className='text-white flex justify-center items-center w-full h-full flex-col gap-5'
    >
        <p>
            Error Occurred
        </p>

        <p
            className='text-sm text-gray-400 italic'
        >
            Please raise an issue on Github
        </p>
    </div>
  )
}

export default ErrorHandler
