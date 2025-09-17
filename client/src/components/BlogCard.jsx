import React from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { FaCalendarAlt } from "react-icons/fa";
import img from '../assets/images/img.jpg'

function BlogCard() {
  return (
    <Card className={"w-full"}>
      <CardContent>
        {/* Card topbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-bold text-gray-500 ml-4">G Blog</p>
          </div>
          <Button className={'rounded-full cursor-pointer'} variant={'outline'}>Admin</Button>
        </div>
        {/* Card image */}
        <div className="mt-5">
            <img src={img} alt="" className="rounded-lg" />
        </div>
        <div className="mt-5 flex text-gray-600 items-center">
            <FaCalendarAlt/>
            <div className="ml-5">25-December-2025</div>
        </div>
        <div className="text-2xl font-bold text-black mt-4"><h2>25 High Demand skills in 2025</h2></div>
      </CardContent>
    </Card>
  );
}

export default BlogCard;
