import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'
export const PublicRoute= () => {
  if(localStorage.getItem("userData")){
    return (
      <Navigate to="/dashboard" />
    )
  }
  return (
    <Outlet/>
  )
}
