import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import {
  RouteAddBolg,
  RouteAddCategory,
  RouteBlog,
  RouteCategoryDetails,
  RouteIndex,
  RouteProfile,
  RouteSignin,
  RouteSignup,
  RouteUpdateBlog,
  RouteUpdateCategory,
} from "./helpers/RouteName";
import Index from "./pages/Index";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CategoryDetails from "./pages/category/CategoryDetails";
import AddCategory from "./pages/category/AddCategory";
import UpdateCategory from "./pages/category/UpdateCategory";
import BlogDetails from "./pages/blog/BlogDetails";
import AddBlog from "./pages/blog/AddBlog";
import UpdateBlog from "./pages/blog/UpdateBlog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          <Route path={RouteProfile} element={<Profile />} />
          {/* Blog categories */}
          <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
          <Route path={RouteAddCategory} element={<AddCategory />} />
          <Route path={RouteUpdateCategory()} element={<UpdateCategory />} />
          {/* Blogs */}
          <Route path={RouteBlog} element={<BlogDetails />} />
          <Route path={RouteAddBolg} element={<AddBlog />} />
          <Route path={RouteUpdateBlog()} element={<UpdateBlog />} />
        </Route>
        <Route path={RouteSignin} element={<Signin />}></Route>
        <Route path={RouteSignup} element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
