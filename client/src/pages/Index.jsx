import BlogCard from "@/components/BlogCard";
import { Card } from "@/components/ui/card";
import { getEnv } from "@/helpers/getEnv";
import React, { useEffect, useState } from "react";
import img from "../assets/images/img.jpg";

function Index() {
  const [blogs, setBlogs] = useState([]); // state for blogs
  //Fetch Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/blog/all`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await res.json();
        setBlogs(data); // store blogs in state
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchBlogs();
  }, []);
  return (
    <Card
      className={
        " mt-24 w-[98%] mx-auto px-5 grid grid-cols-3 gap-5 place-items-center "
      }
    >
      {blogs && blogs?.blogs?.length > 0 ? (
        blogs.blogs.map((item) => (
          <BlogCard
            key={item._id}
            author={item.author.name}
            title={item.title}
            featuredImage={item.featuredImage}
            date={item.updatedAt}
            avatar={img}
          />
        ))
      ) : (
        <div>No data found</div>
      )}
    </Card>
  );
}

export default Index;
