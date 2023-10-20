import React from 'react'

function AdminLayout({
    children
} : {
    children: React.ReactNode
}) {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export default AdminLayout
