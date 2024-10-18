import React from 'react'
import { selectCurrentToken, selectUserAuth } from './authSlice'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAuthWithRoles = ({allowedRoles}: {allowedRoles: any}) => {
    const {roles, user, token} = useSelector(selectUserAuth)
    const location = useLocation()
  return (
    roles?.find(role => allowedRoles?.includes(role)) ? <Outlet /> : !user ?
    <Navigate to = '/error' state = {{ from: location }} replace />:
    
    <Navigate to = "/login" state = {{from: location}} replace />
  )
}

export default RequireAuthWithRoles