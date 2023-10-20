'use client'

import React from 'react'

function LinkHandler({
    link
}: { 
    link: string
}) {

    window.location.replace(link)

  return (
    <div>
      
    </div>
  )
}

export default LinkHandler
