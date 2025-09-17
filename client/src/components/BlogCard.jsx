import React from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { FaCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import Loading from "./ui/loding";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";

function BlogCard({ author, title, featuredImage, date, avatar, category, slug }) {
  const userData = useSelector((state) => state.user);
  const user = userData.user.user;

  return (
    <Card className={"w-full h-110"} key={""}>
      <CardContent>
        {/* Card topbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="w-14 h-14">
              <AvatarImage src={avatar || ''} />
              <AvatarFallback>{author}</AvatarFallback>
            </Avatar>
            <p className="font-bold text-gray-500 ml-2 text-sm">{author}</p>
          </div>
          <Button className={"rounded cursor-pointer"} variant={"outline"}>
            <Link to={RouteBlogDetails(category.slug, slug)}>
            Details
            </Link>
          </Button>
        </div>
        {/* Card image */}
        <div className="mt-5">
          <img
            src={featuredImage}
            alt=""
            className="rounded-lg h-36 w-full"
          />
        </div>
        <div className="mt-5 flex text-gray-600 items-center">
          <FaCalendarAlt />
          <div className="ml-5">
            {new Date(date).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        <div className="text-2xl font-bold text-black mt-4">
          <h2>{title}</h2>
        </div>
      </CardContent>
    </Card>
  );
}

export default BlogCard;
