import React, { useEffect, useMemo, useState } from "react";
import Card from "./Card";
import { fetchData } from "../service/api.js";
import toast, { Toaster } from "react-hot-toast";
import backgroundImage from "../assets/images/main_bg.png";

const FindMeal = () => {
  const [search, setSearch] = useState("");
  const [food, setFood] = useState([]);

  const handleClick = async () => {
    const value = await fetchData.bySearch(search);
    if (value === null) {
      toast.error("Recipe not found");
    } else {
      console.log(value);
      setFood(value);
      setSearch("");
    }
  };

  return (
    <div
      className="w-screen h-screen overflow-auto bg-center bg-cover scroll-smooth"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Search div */}
      <div className="flex flex-col items-center justify-center pt-5 text-center ">
        <h1 className="text-3xl text-white">
          Search the food that you are looking for...
        </h1>
        <div className="">
          <input
            type="text"
            placeholder="Ex. Soup, Biryani, Burger..."
            className="md:w-[400px] md:h-[40px] md:mt-5 rounded focus:outline-none p-2 sm:w-[300px] w-auto mt-4"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="px-3 py-2 mt-4 ml-3 text-white transition-all duration-100 bg-blue-500 rounded md:mt-0 hover:bg-blue-700"
            onClick={handleClick}
          >
            Search
          </button>
        </div>
      </div>

      {/* Content div */}
      <div className="flex flex-col items-center gap-5 mt-10 md:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 md:gap-10 lg:w-fit md:w-auto sm:w-auto md:mx-auto lg:pb-5">
        {food.map((value, index) => (
          <Card
            img={value.strMealThumb}
            data={value.strMeal}
            key={index}
            id={value.idMeal}
          />
        ))}
      </div>
      <Toaster
        toastOptions={{
          duration: 1300,
        }}
      />
    </div>
  );
};

export default FindMeal;
