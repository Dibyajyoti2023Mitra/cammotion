import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'
export const PublicRoute= () => {
  if(localStorage.getItem("userdata")){
    return (
      <Navigate to="/dashboard" />
    )
  }
  return (
    <Outlet/>
  )
}
