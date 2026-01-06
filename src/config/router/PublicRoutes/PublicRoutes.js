import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
export const PublicRoutes = () => {
    const { userAuth, userRole} = useSelector((state) => state.userAuth)
    console.log("userAuth",userAuth)
    return !userAuth ? <Outlet /> : <Navigate to="/" />
}