import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RouteAddBolg } from "@/helpers/RouteName";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import Loading from "./../../components/ui/loding";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";

function BlogDetails() {
  const [refreshData, setRefreshData] = useState();
  const { data, error, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all`,
    {
      method: "GET",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = (id) => {
    const response = deleteData(
      `${getEnv("VITE_API_BASE_URL")}/category/delete/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("Success", "Data Deleted");
    } else {
      showToast("Error", "Data Not Deleted");
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="">
          <Card className="max-w-screen mx-4 mt-20">
            <CardHeader>
              <Button className="cursor-pointer w-24" asChild>
                <Link to={RouteAddBolg}>Add Blog</Link>
              </Button>
            </CardHeader>
            <CardContent className={`w-full`}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Author</TableHead>
                    <TableHead>Category Name</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                {/* <TableBody>
                  {data && data?.categories?.length > 0 ? (
                    data.categories.map((item) => (
                      <TableRow>
                        <TableCell className={``}>{item.name}</TableCell>
                        <TableCell className={``}>{item.slug}</TableCell>
                        <TableCell className={``}>
                          <Button className={`cursor-pointer`} asChild>
                            <Link to={RouteUpdateCategory(item._id)}>
                              <FaRegEdit />
                            </Link>
                          </Button>
                          <Button
                            className={`cursor-pointer ml-3`}
                            variant="destructive"
                            onClick={() => handleDelete(item._id)}
                          >
                            <MdDeleteForever />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="3" className={`text-center`}>
                        Data not found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody> */}
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default BlogDetails;
