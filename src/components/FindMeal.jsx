import React, { useEffect, useMemo, useState } from "react";
import Card from "./Card";
import { fetchData } from "../service/api.js";
import toast, { Toaster } from "react-hot-toast";
import backgroundImage from "../assets/images/main_bg.png";
import { TailChase } from 'ldrs/react'
import 'ldrs/react/TailChase.css'

const FindMeal = () => {
  const [search, setSearch] = useState("");
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    let loadingState;
    try {
      const value = await fetchData.bySearch(search);
      loadingState = setTimeout(() => {
        setLoading(false);
      }, 1500)
      if (value === null) {
        toast.error("Recipe not found");
      } else {
        setFood(value);
        setSearch("");
      }
    } catch (error) {
      console.error('Error while fetching data', error);
      loadingState = setTimeout(() => {
        setLoading(false);
      }, 1500)
      toast.error('Error while loading data');

    }

    return () => { clearTimeout(loadingState) }
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
      {!loading && food && food.map((value, index) => (
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

      {/* Loading animation */}
      {
        loading && (
          <div className="flex flex-col justify-center items-center gap-5 w-full mt-16">
            <TailChase
              size="40"
              speed="1.75"
              color="white"
            />
            <h2 className="text-white text-xl font-semibold animate-pulse ease-in-out">Finding for best results as per your search...</h2>
          </div>
        )
      }
    </div>
  );
};

export default FindMeal;
