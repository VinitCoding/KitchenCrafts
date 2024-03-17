import React from "react";
import recipeBook from "../assets/images/recipe_book.svg";
import womenCooking from "../assets/images/women_cooking.svg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/recipe");
  };
  return (
    <div>
      <header className="p-5 text-left sm:p-5 md:p-7 lg:p-10">
        <h1 className="text-3xl font-extrabold">
          Kitchen<span className="text-orange-400">Crafts</span>
        </h1>
      </header>

      {/* main content */}
      <section>
        <div className="justify-center lg:flex lg:flex-row md:flex-col lg:px-20 lg:space-x-28 ">
          <h1 className="lg:text-7xl md:text-5xl sm:text-5xl text-4xl md:text-center sm:text-center text-center lg:text-left font-bold leading-[50px] sm:leading-[55px] md:leading-[55px] lg:leading-[85px] lg:mt-20 md:mt-10 sm:mt-10 mt-14">
            Journey Through the <br /> World of{" "}
            <span className="text-orange-400">
              Flavourful <br /> Creations
            </span>
          </h1>

          <img
            src={recipeBook}
            alt="image"
            className="lg:w-[800px] md:w-[750px] h-auto lg:pr-20 md:mx-auto lg:mt-5 md:mt-10 sm:mt-12 mt-12"
          />
        </div>
      </section>

      {/* About us */}
      <section className="mt-10 lg:mt-20 md:mt-28 sm:mt-28">
        {/* Title */}
        <div className="flex items-center justify-center">
          <hr className="w-[100px] border-[1px]" />
          <span className="px-3 text-2xl font-semibold">About Us</span>
          <hr className="w-[100px] border-[1px]" />
        </div>

        <div className="flex flex-col justify-between px-10 lg:px-20 md:px-20 sm:px-10 lg:space-x-20 lg:flex-row md:flex-col sm:flex-col">
          <img
            src={womenCooking}
            alt="image"
            className="lg:w-[800px] md:w-[750px] lg:h-[530px] h-auto lg:ml-16"
          />
          <div className="mt-10 lg:mt-32 md:mt-20 sm:mt-10 ">
            <p className="text-2xl lg:leading-[50px] md:leading-[40px] sm:leading-[40px] leading-[40px]">
              Welcome to <span className="text-orange-500">KitchenCrafts</span>{" "}
              explore our collection of delicious recipes, cooking tips, and
              videos. Let's embark on a flavourful journey together, where every
              meal is a memory in the making. Get ready to unleash your inner
              chef with <span className="text-orange-500">KitchenCrafts!</span>
            </p>
            <button
              className="px-5 py-3 mt-3 text-xl font-semibold text-white transition-all duration-100 ease-in-out bg-orange-500 rounded-md hover:bg-orange-700"
              onClick={handleClick}
            >
              Click to explore it..
            </button>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="p-3 text-2xl text-center lg:mt-10 md:mt-10 sm:mt-10 mt-14 bg-slate-100">
        <h1>Copyright © 2024 By Vinit Gite. All rights reserved.</h1>
      </footer>
    </div>
  );
};

export default Home;
