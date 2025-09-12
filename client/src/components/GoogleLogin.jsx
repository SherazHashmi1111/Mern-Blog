import React from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/helpers/firebase";
import { showToast } from "@/helpers/showToast";
import { useNavigate } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { RouteIndex } from "@/helpers/RouteName";

function GoogleLogin() {
  const navigate = useNavigate();
    const handleLogin = async () => {
              const googleResponse = await signInWithPopup(auth, provider);
        const user = googleResponse.user;
        const data = {
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL,
        };
        try {
                const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/google-login`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  credentials: "include",
                  body: JSON.stringify(data),
                }); 
            
                const resData = await res.json();
            
                // handle API-side errors
                if (resData?.error) {
                  showToast("error", resData?.message || "Something went wrong!");
                  return;
                }
            
                // handle HTTP errors (non-2xx)
                if (!res.ok) {
                  showToast("error", resData?.message || "Something went wrong!");
                  return;
                }
            
                // success
                navigate(RouteIndex);
                showToast("success", "Registered Successfully! Please login.");
            
              } catch (error) {
                showToast("error", error?.message || "Something went wrong!");
              }
    }
  return (
    <Button variant="outline" className="w-full flex items-center justify-center gap-2 cursor-pointer" onClick={handleLogin}>
      <FcGoogle />
      Continue with Google
    </Button>
  );
}

export default GoogleLogin;
