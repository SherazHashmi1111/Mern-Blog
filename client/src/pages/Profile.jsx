// ===============================
// Imports
// ===============================
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/ui/loding";
import { BsCamera } from "react-icons/bs";
import Dropzone from "react-dropzone";
import defaultUserPic from "../assets/images/user.png";
import { setUser } from "@/store/user/userSlice";

// ===============================
// Profile Component
// ===============================
function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // Profile picture handling
  const avatar = user?.user?.avatar;
  const profilePic = avatar || defaultUserPic;
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();

  // Fetch user data
  const userId = user?.user?.id;
  const url = userId
    ? `${getEnv("VITE_API_BASE_URL")}/user/get-user/${userId}`
    : null;

  const { data, loading, error } = useFetch(
    url,
    { method: "GET", credentials: "include" },
    [userId]
  );

  // ===============================
  // Form schema & initialization
  // ===============================
  const formSchema = z.object({
    name: z.string().min(3).max(32),
    email: z.string().email(),
    bio: z.string().min(3, "Must be 3 characters long."),
    password: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  // ===============================
  // Submit Handler
  // ===============================
  async function onSubmit(data) {
    try {
      // Build FormData with file + form fields
      const formData = new FormData();
      if (file) formData.append("file", file);
      formData.append("data", JSON.stringify(data));

      const res = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/update-user/${user.user.id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const resData = await res.json();

      // Handle errors
      if (!res.ok || resData?.error) {
        showToast("error", resData?.message || "Something went wrong!");
        return;
      }

      // Update redux state
      dispatch(setUser({ user: resData.newUser }));
      showToast("success", "Profile updated successfully!");
    } catch (error) {
      showToast("error", error?.message || "Something went wrong!");
    }
  }

  // ===============================
  // Prefill form when user data is fetched
  // ===============================
  useEffect(() => {
    if (data && data.success) {
      form.reset({
        name: data.user.name || "",
        email: data.user.email || "",
        bio: data.user.bio || "",
      });
    }
  }, [data, form]);

  // ===============================
  // File Dropzone handler
  // ===============================
  const handleFileSelection = (files) => {
    const file = files[0];
    setFile(file);
    setFilePreview(URL.createObjectURL(file));
  };

  // ===============================
  // Render
  // ===============================
  if (loading) return <Loading />;

  return (
    <Card className="max-w-screen-md mx-auto mt-40 flex items-center justify-center">
      {/* Avatar Upload */}
      <div>
        <Dropzone
          onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Avatar className="w-30 h-30 relative group">
                <AvatarImage src={filePreview || profilePic} />
                <AvatarFallback>U</AvatarFallback>

                {/* Overlay Camera Icon */}
                <div
                  className="absolute inset-0 z-50 rounded-full border-4 border-violet-600 bg-black/30 
                  hidden group-hover:flex items-center justify-center cursor-pointer"
                >
                  <BsCamera className="w-12 h-12 text-violet-600" />
                </div>
              </Avatar>
            </div>
          )}
        </Dropzone>
      </div>

      {/* Profile Form */}
      <div className="w-full px-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bio field */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit button */}
            <Button type="submit" className="w-full cursor-pointer">
              Save changes
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}

export default Profile;
