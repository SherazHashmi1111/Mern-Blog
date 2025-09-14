import React from "react";
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
import {
  RouteAddCategory,
  RouteCategoryDetails,
  RouteUpdateCategory,
} from "@/helpers/RouteName";
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

function CategoryDetails() {
  const { data, error, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const handleDelete = (id) => {
    const response = deleteData(`${getEnv("VITE_API_BASE_URL")}/category/delete/${id}`,{
      method: "DELETE",
      credentials: "include",
    });
    if (response) {
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
          <Card className="max-w-screen-md mx-auto mt-40 flex items-center justify-center">
            <CardHeader className="flex items-center justify-center">
              <Button className="cursor-pointer" asChild>
                <Link to={RouteAddCategory}>Add Category</Link>
              </Button>
            </CardHeader>
            <CardContent className={`w-full`}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
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
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default CategoryDetails;
