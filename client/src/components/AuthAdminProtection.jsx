import React from 'react'

function AuthAdminProtection() {
   const { user } = useSelector((state) => state.user);

  if (user && user.isLogedInn && user.role === 'admin') {
    return <Outlet />;
  }
}

export default AuthAdminProtection