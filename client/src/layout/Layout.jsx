import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <SidebarProvider>
      <Topbar />
      <AppSidebar />
      <main className="w-full">
        <div className="min-h-[calc(100vh-80px)]"></div>
        <Outlet />
        <Footer />
      </main>
    </SidebarProvider>
  );
}

export default Layout;
