"use client"

import ErrorHandler from '@/components/Error';
import Loader from '@/components/Loader';
import AdminContainer from '@/components/admin'
import useFetch from '@/hooks/useFetch'
import Image from 'next/image'
import React from 'react'
import { AiFillGithub } from 'react-icons/ai';

function AdminPage() {

  
  const [{ data, error, loading }, {revalidate}] = useFetch(`/api/db`)
  
  if(loading) return <Loader />
  
  if(error) return <ErrorHandler />

  return (
    <div
      className='dark:text-white flex flex-col  items-center w-full'
    >
      <div
        className='flex justify-center items-center gap-4'
      >
      <Image 
        src='/assets/logo2.png'
        className='p-2 bg-white rounded-full self-center'
        alt='Pepper'
        width={50}
        height={50}
      />
      <h1
        className='flex gap-1 self-center font-semibold text-lg  dark:text-purple-500'
      >
        Pepper <p className='text-white' >Dashboard</p>
      </h1>
      </div>
      <a
        className='mt-5 p-2 flex gap-2 justify-center items-center hover:bg-white rounded-md transition-all group'
        href={`https://github.com/Sarfraz-droid/pepper.git`}
      >
        <AiFillGithub 
          className="w-5 h-5 group-hover:text-black"
        />
        <span
          className='group-hover:text-black transition-all'
        >
        GitHub
        </span>
      </a>

      {data != null && <AdminContainer 
        data={data}
        revalidate={revalidate}
      />}
    </div>
  )
}

export default AdminPage
