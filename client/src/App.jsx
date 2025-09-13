import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import { RouteIndex, RouteProfile, RouteSignin, RouteSignup } from './helpers/RouteName'
import Index from './pages/Index'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout/>}>
        <Route index element={<Index/>} />
        <Route path={RouteProfile} element={<Profile/>} />
        </Route>
        <Route path={RouteSignin} element={<Signin/>}></Route>
        <Route path={RouteSignup} element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App