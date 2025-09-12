import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { email, z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { RouteIndex, RouteSignup } from "@/helpers/RouteName";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
("use client");

function Signin() {
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(4, "Password too short")
      .max(32, "Password too long"),
  });
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(data) {
    try {
        const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/login`, {
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
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className={"w-[400px]"}>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email & password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Email Here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-5">
                <Button type="submit" className="w-full cursor-pointer">
                  Sign In
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center gap-3 mt-7">
            <p>Don&apos;t have account?</p>
            <Link to={RouteSignup} className="text-blue-500 hover:underline">
              Sign Up
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signin;
