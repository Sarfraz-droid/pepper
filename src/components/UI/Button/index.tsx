import React, { useState } from 'react'
import {AiOutlineLoading} from 'react-icons/ai'

function Button({
    children,
    className,
    onClick = () => {},
    loader = false,
    ...args
} : {
    children?: React.ReactNode,
    className?: string,
    onClick: () => any,
    loader?: boolean,
}) {

    const [isLoading, setIsLoading] = useState(false);

    const clickHandler = async() => {
        setIsLoading(true)
        await onClick()
        setIsLoading(false)
    }

  return (
    <button
        className={`flex justify-center items-center gap-2 ${className}`}
        onClick={clickHandler}
        {...args}
    >   
        <AiOutlineLoading className={`animate-spin ${isLoading ? 'block' : 'hidden'}`} />
        <div
            className={`${isLoading ? 'opacity-0 absolute' : 'opacity-100'}`}
        >
            {children}
        </div>
    </button>
  )
}

export default Button
