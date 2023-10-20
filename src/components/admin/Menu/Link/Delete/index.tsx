import Button from '@/components/UI/Button'
import Modal from '@/components/UI/Modal'
import React, { useRef } from 'react'
import { createPortal } from 'react-dom'

function DeleteModal({
    onClose,
    onDelete
} : {
    onClose: () => void;
    onDelete: () => any;
}) {

    const ref = useRef()

  return createPortal(
    <Modal
        ref={ref as any}
        onBackgroundClick={() => {
            onClose()
        }}
    >
        <div
            className='flex flex-col justify-center items-center w-full h-full p-10 gap-3'
        >
            <h1
                className='text-xl font-semibold'
            >
                Are you sure you want to delete this link?
            </h1>
            <p
                className='text-sm text-gray-400 italic'
            >
                This action cannot be undone.
            </p>

            <div
                className='border border-gray-200 w-full'
            />

            <div
                className='flex gap-6'
            >
                <Button
                    className='p-2 bg-purple-600 rounded-md px-5 text-white hover:bg-purple-700 transition-all focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-white'
                    onClick={onDelete}
                    loader
                >
                    Yes
                </Button>
                <button
                    className='p-2 bg-gray-50 rounded-md px-5  hover:bg-gray-700/10 transition-all focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-white'
                    onClick={() => {
                        onClose()
                    }}
                >
                    No
                </button>
            </div>
        </div>
    </Modal>,
    document.body
  )
}

export default DeleteModal
