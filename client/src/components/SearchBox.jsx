import React, { useState } from "react";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { RouteSearch } from "@/helpers/RouteName";

function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState();
  const getInput = (e) => {
    setQuery(e.target.value);
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    navigate(RouteSearch(query));
  };
  return (
    <form action="" onSubmit={searchSubmitHandler}>
      <Input
        type="text"
        name="q"
        onInput={getInput}
        placeholder="Search Here..."
        className="h-9 rounded-full bg-gray-50"
      />
    </form>
  );
}

export default SearchBox;
