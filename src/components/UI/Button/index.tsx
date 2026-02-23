import React, { useState } from 'react'
import {AiOutlineLoading} from 'react-icons/ai'
import { cn } from '@/lib/utils'

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
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
          className
        )}
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
