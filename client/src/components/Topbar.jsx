import React from 'react'
import logo from '../assets/images/logo3.png'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { IoLogInOutline } from "react-icons/io5";
import SearchBox from './SearchBox';
import { RouteSignin } from '@/helpers/RouteName';
function Topbar() {
  return (
    <div className="w-full h-16 bg-white fixed flex items-center justify-between border-b px-6 z-100">
      <div className="flex items-center justify-center">
      <img src={logo} alt="Logo is here" width={80} /> 
      <h1 className="text-2xl font-bold text-yellow-500">Digital Blogger</h1>
      </div>
      <div className="w-[50%]">
        <SearchBox />
      </div>
      <div>
        <Button className="rounded-full cursor-pointer" asChild>
          <Link to={RouteSignin}>
          <IoLogInOutline/>Login</Link>
        </Button>
      </div>
    </div>
  )
}

export default Topbar