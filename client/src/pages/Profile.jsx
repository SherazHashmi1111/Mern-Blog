import React, { use, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/ui/loding";
import { FcOldTimeCamera } from "react-icons/fc";
import { BsCamera } from "react-icons/bs";
import Dropzone, { useDropzone } from "react-dropzone";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const avatar = user?.user?.avatar;
  const [filePreview, setFilePreview] = useState();

  const userId = user?.user?.id; // safely check
  const url = userId
    ? `${getEnv("VITE_API_BASE_URL")}/user/get-user/${userId}`
    : null;

  const { data, loading, error } = useFetch(
    url,
    { method: "GET", credentials: "include" },
    [userId] // dependency
  );

  // Form functionality
  const formSchema = z.object({
    name: z.string().min(3).max(32),
    email: z.string().email(),
    bio: z.string().min(3, "Must be 3 characters long."),
    password: z.string(),
  });
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  //   Form submission
  async function onSubmit(data) {
    const dispatch = useDispatch();
    try {
      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/user/get-user`, {
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
      dispatch(setUser(resData));
      showToast("success", "Logedin Successfully!");
    } catch (error) {
      showToast("error", error?.message || "Something went wrong!");
    }
  }

  //Setting form data
  useEffect(() => {
    if (data && data.success) {
      form.reset({
        name: data.user.name || "",
        email: data.user.email || "",
        bio: data.user.bio || "",
      });
    }
  }, [data, form]); // re-run when API response changes

  // dropzon handle
  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFilePreview(preview)
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Card className="max-w-screen-md mx-auto mt-40 flex items-center justify-center">
          {/* Avatar  */}
          <div className="">
            <Dropzone
              onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Avatar className="w-30 h-30 relative group">
                    <AvatarImage src={filePreview ? filePreview : avatar} />
                    <div className=" absolute h-full w-full rounded-full  z-50 cursor-pointer top-0 left-0 border-4 border-violet-600 bg-black/30 items-center justify-center group-hover:flex hidden">
                      <BsCamera className="w-[3rem] h-[3rem] text-violet-600 " />
                    </div>
                  </Avatar>
                </div>
              )}
            </Dropzone>
          </div>
          {/* Login Form  */}
          <div className="w-full px-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Name field */}
                <div className="my-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your Name Here..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Email field */}
                <div className="my-3">
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
                {/* Bio field */}
                <div className="my-3">
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter Your Bio Here..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Password field */}
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
                {/* Button field */}
                <div className="mt-5">
                  <Button type="submit" className="w-full cursor-pointer">
                    Save changes
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Card>
      )}
    </div>
  );
}

export default Profile;
