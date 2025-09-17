import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

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
  console.log(data);

  return <div>SingleBlogDetails</div>;
}

export default SingleBlogDetails;
