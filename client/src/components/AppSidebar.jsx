import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import { FaHome } from "react-icons/fa";
import { TbCategory2 } from "react-icons/tb";
import { FaBlogger } from "react-icons/fa6";
import { FaRegComments } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { GoDot } from "react-icons/go";

function AppSidebar() {
  return (
    <Sidebar className="mt-16">
      {/* Side bar header */}
      {/* <SidebarHeader className="bg-white">
        <img src={logo} alt="Logo is here" width={100} />
      </SidebarHeader> */}

      {/* Side bar Content */}
      <SidebarContent className="bg-white">
        {/* Side bar main group */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuSubButton asChild>
                  <Link to="/">
                    <FaHome className="mr-2" />
                    Home
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuSubButton asChild>
                  <Link to="/categories">
                    <TbCategory2 className="mr-2" />
                    Categories
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuSubButton asChild>
                  <Link to="/">
                    <FaBlogger className="mr-2" />
                    Blog
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuSubButton asChild>
                  <Link to="/">
                    <FaRegComments className="mr-2" />
                    Comments
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuSubButton asChild>
                  <Link to="/">
                    <FaUsers className="mr-2" />
                    Users
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Side bar Categories group */}
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuSubButton asChild>
                  <Link to="/">
                    <GoDot className="mr-2" />
                    {/* This is dynamic will be change later */}
                    Dynamic categories
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer
      <SidebarFooter></SidebarFooter> */}
    </Sidebar>
  );
}

export default AppSidebar;
