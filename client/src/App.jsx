import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import {
  RouteAddCategory,
  RouteCategoryDetails,
  RouteIndex,
  RouteProfile,
  RouteSignin,
  RouteSignup,
  RouteUpdateCategory,
} from "./helpers/RouteName";
import Index from "./pages/Index";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CategoryDetails from "./pages/category/CategoryDetails";
import AddCategory from "./pages/category/AddCategory";
import UpdateCategory from "./pages/category/UpdateCategory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          <Route path={RouteProfile} element={<Profile />} />
          <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
          <Route path={RouteAddCategory} element={<AddCategory />} />
          <Route path={RouteUpdateCategory()} element={<UpdateCategory />} />
        </Route>
        <Route path={RouteSignin} element={<Signin />}></Route>
        <Route path={RouteSignup} element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
