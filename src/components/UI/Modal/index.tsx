import React from "react";
import { motion } from "framer-motion";

function Modal({
    innerRef,
    onBackgroundClick,
    children,
    className
    }: {
    innerRef: React.MutableRefObject<HTMLDivElement | null>;
    onBackgroundClick: () => void;
    children: React.ReactNode;
    className?: {
        modalContainer?: string;
        modal?: string;
    }
}) {
  return (
    <React.Fragment>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center" />

      <motion.div className="absolute modal-container top-0 left-0 w-full h-full flex justify-center items-center"
        onClick={onBackgroundClick}
      >
        <motion.div
          className={`bg-white rounded-md shadow-lg overflow-auto ${className?.modal}`}
          ref={innerRef as any}
          onClick={(e) => e.stopPropagation()}
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -50,
          }}
        >
            {children}
        </motion.div>
      </motion.div>
    </React.Fragment>
  );
}

export default Modal;
