import React from 'react'

function FileUploader({children, className, onClick} : {
    children: React.ReactNode,
    className?: string,
    onClick?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {

  const fileRef = React.useRef<HTMLInputElement>(null)

  return (
    <React.Fragment>
      <input 
        type="file"
        className='hidden'
        ref={fileRef}
        onChange={onClick}
      />

      <button 
        className={className}
        onClick={() => fileRef.current?.click()}
      > 
        {children}
      </button>
    </React.Fragment>
  )
}

export default FileUploader
