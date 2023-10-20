import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'


function Accordion({
    i,
    children,
    className,
    title
} : {
    i: number,
    children: React.ReactNode,
    className?: {
        header?: string,
        section?: string
    },
    title: string
}) {
    
    const [isOpen, setIsOpen] = React.useState(false)
  
    // By using `AnimatePresence` to mount and unmount the contents, we can animate
    // them in and out while also only rendering the contents of open accordions
    return (
      <motion.div
        className='flex flex-col gap-2 w-full'
      >
        <motion.header
          initial={false}
          className={className?.header}
        //   animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
          onClick={() => {
            setIsOpen(!isOpen)
        }}
        >
            {title}
        </motion.header>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.section
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 }
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
              className={className?.section}
            >
              {children}
            </motion.section>
          )}
        </AnimatePresence>
      </motion.div>
    );
}

export default Accordion
