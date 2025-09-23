import { RouteSignin } from '@/helpers/RouteName';
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function AuthAdminProtection() {
   const  user  = useSelector((state) => state.user);
   

  if (user && user.isLogedIn && user.role === 'admin') {
    return <Outlet />;
  }else{
   return <Navigate to={RouteSignin}/>
  }
}

export default AuthAdminProtection