import { Navigate, Outlet } from "react-router-dom"
import useAuthStatus from "../hooks/useAuthStatus"
import Spinner from "./Spinner"

import React from 'react'

const PrivateRoute = () => {
    const { loggedIn, checking } = useAuthStatus()

    if(checking){
        return <Spinner />
    }

    return loggedIn? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute