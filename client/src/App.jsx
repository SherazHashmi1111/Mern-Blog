import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import {
  RouteAddBolg,
  RouteAddCategory,
  RouteBlog,
  RouteBlogDetails,
  RouteCategoryBlogs,
  RouteCategoryDetails,
  RouteComments,
  RouteIndex,
  RouteProfile,
  RouteSearch,
  RouteSignin,
  RouteSignup,
  RouteUpdateBlog,
  RouteUpdateCategory,
  RouteUsers,
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
import SingleBlogDetails from "./pages/blog/SingleBlogDetails";
import ByCategoryBlogs from "./pages/blog/ByCategoryBlogs";
import SearchResult from "./pages/SearchResult";
import Comments from "./pages/Comments";
import Users from "./pages/Users";
import AuthUserProtection from "./components/AuthUserProtection";
import AuthAdminProtection from "./components/AuthAdminProtection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
          <Route element={<AuthUserProtection />}>
            <Route path={RouteSearch()} element={<SearchResult />} />
            <Route path={RouteBlog} element={<BlogDetails />} />
            <Route path={RouteProfile} element={<Profile />} />
            <Route path={RouteAddBolg} element={<AddBlog />} />
            <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
            <Route path={RouteAddCategory} element={<AddCategory />} />
            <Route path={RouteCategoryBlogs()} element={<ByCategoryBlogs />} />
            <Route path={RouteUpdateCategory()} element={<UpdateCategory />} />
            <Route path={RouteUpdateBlog()} element={<UpdateBlog />} />
          </Route>
          <Route element={<AuthAdminProtection />}>
            <Route path={RouteComments} element={<Comments />} />
            <Route path={RouteUsers} element={<Users />} />
          </Route>
        </Route>
        <Route path={RouteSignin} element={<Signin />}></Route>
        <Route path={RouteSignup} element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
