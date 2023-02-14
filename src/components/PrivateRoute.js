import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage'

function PrivateRoute() {
    const admindata=reactLocalStorage.get('userData')
    if(admindata){
        return (
          <Outlet/>
        )
    }
    else{
        return(
            <Navigate to='/'/>
        )
    }
}

export default PrivateRoute