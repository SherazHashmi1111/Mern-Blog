import React, { useEffect } from "react";

import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
import { decode } from "entities";

import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import Comment from "@/components/Comment";
import { useSelector } from "react-redux";
import CommentCount from "@/components/CommentCount";
import LikeCount from "@/components/LikeCount";
function SingleBlogDetails() {
  
  
  const { blog } = useParams();
  // Blog data fetched from DB
  const { data, error, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/blog-details/${blog}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

 

  return (
    <div className="w-full flex gap-5 pt-10 px-4">
      {data && data?.blog && (
        <div className="w-[70%] border-2 p-4">
          <div className="flex items-center justify-between ">
            <div className="w-full flex gap-3 items-center p-4">
              <Avatar className='w-25 h-25'>
                <AvatarImage src={data.blog.author.avatar} />
              </Avatar>
              <div className="flex flex-col text-gray-600">
                <span className="font-bold">{data.blog.author.name}</span>
                <p className="text-sm">
                  {new Date(data.blog.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className={"mr-4 cursor-pointer flex gap-5"} variant={"outline"}>
              <CommentCount blogid={data.blog._id}/>
              <LikeCount blogid={data.blog._id}/>
            </div>
          </div>
          <div className="w-full h-100 my-4 mx-auto">
            <img src={data.blog.featuredImage} alt="" className="rounded w-full h-full object-cover" />
          </div>
          <h1 className=" text-2xl font-bold py-2">{data.blog.title}</h1>
          <div
            className=" text-justify py-2"
            dangerouslySetInnerHTML={{ __html: decode(data.blog.blogContent) }}
          ></div>
          <Comment blogid={data.blog._id}/>
        </div>
      )}
      <div className="w-[25%] border-2"></div>
    </div>
  );
}

export default SingleBlogDetails;
