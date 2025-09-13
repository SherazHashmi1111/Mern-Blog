import React, { use } from "react";
import logo from "../assets/images/logo3.png";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";
import SearchBox from "./SearchBox";
import { RouteIndex, RouteSignin, RouteSignup } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import userAvtar from "../assets/images/user.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUserCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { removeUser } from "@/store/user/userSlice";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
function Topbar() {
  const userData = useSelector((state) => state.user);
  const user = userData.user.user;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Logout logic
  const logoutHandler = async () => {
    try {
      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/logout`, {
        method: "get",
        credentials: "include",
      });

      const resData = await res.json();

      // handle HTTP errors (non-2xx)
      if (!res.ok) {
        showToast("error", resData?.message || "Something went wrong!");
        return;
      }

      // success
      dispatch(removeUser());
      navigate(RouteSignup);
      showToast("success", "Logout Successfully! Please login again.");
    } catch (error) {
      showToast("error", error?.message || "Something went wrong!");
    }
  };
  return (
    <div className="w-full h-16 bg-white fixed flex items-center justify-between border-b px-10 z-10">
      <div className="flex items-center justify-center">
        <img src={logo} alt="Logo is here" width={80} />
        <h1 className="text-2xl font-bold text-yellow-500">Digital Blogger</h1>
      </div>
      <div className="w-[50%]">
        <SearchBox />
      </div>
      <div>
        {!userData.isLogedIn ? (
          <Button className="rounded-full cursor-pointer" asChild>
            <Link to={RouteSignin}>
              <IoLogInOutline />
              Login
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-14 h-14">
                <AvatarImage src={user?.avatar || userAvtar} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-5">
              <DropdownMenuLabel>
                <p className="font-bold">{user.name}</p>
                <p className="text-sm">{user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <FaUserCircle color="orange" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="#">
                  <FaPlus color="green" />
                  Create Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Button
                  onClick={logoutHandler}
                  variant="outline"
                  className="w-full cursor-pointer"
                >
                  <CiLogout color="red" />
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default Topbar;
