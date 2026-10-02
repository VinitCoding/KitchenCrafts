import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../service/api.js";
import toast, { Toaster } from "react-hot-toast";
import backgroundImage from "../assets/images/bg.png";
import { FaArrowLeft } from "react-icons/fa";

let videoId = "";

const RecipeInfo = () => {
  const navigate = useNavigate();
  const { MealId } = useParams();
  const [item, setItem] = useState([]);
  useEffect(() => {
    const handleData = async () => {
      if (MealId) {
        const data = await fetchData.byId(MealId);
        if (data.length) {
          setItem(data[0]);
        } else {
          toast.error("Recipe not found... try to find again");
          navigate("/");
        }
      }
    };
    handleData();
  }, [MealId, navigate]);

  if (item) {
    const url = item.strYoutube;
    videoId = url?.split("=")[1];
    // const str = url.split("=");
    // vId = str[str.length - 1];
  }

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="px-4 pt-5 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/recipe")}
          className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-md ring-1 ring-slate-200 transition hover:bg-blue-400 hover:text-white hover:shadow-lg"
        >
          <FaArrowLeft className="text-blue-500 transition group-hover:text-white" />
          Back
        </button>
      </div>
      {/* Main Container */}
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Heading, Food type, Category */}
        <div className="flex flex-col items-center text-center">
          <h2 className="max-w-full break-words text-2xl font-bold text-blue-500 sm:text-3xl md:text-4xl">
            Recipe Name:
            <span className="text-slate-700"> {item.strMeal}</span>
          </h2>
          <div className="mt-6 flex w-full max-w-lg flex-col items-center justify-center gap-2 rounded bg-white p-3 sm:flex-row sm:gap-6">
            <h2 className="text-base font-semibold text-slate-600 sm:text-lg">
              Food Type:{" "}
              <span className="text-blue-500">{item.strArea} Food</span>
            </h2>
            <h3 className="text-base font-semibold text-slate-600 sm:text-lg">
              Category:{" "}
              <span className="text-blue-500">{item.strCategory}</span>
            </h3>
          </div>
        </div>

        {/* Ingredients and image */}
        <div className="mt-10 flex flex-col items-center gap-8 lg:mt-12 lg:flex-row lg:items-start lg:justify-center lg:gap-16">
          <img
            src={item.strMealThumb}
            alt={item.strMeal || "Recipe"}
            className="h-auto w-full max-w-md rounded-md object-cover"
          />
          <div className="h-fit w-full max-w-md rounded-md bg-white p-4 sm:p-6">
            <h2 className="text-2xl font-semibold text-blue-500">
              Incredients:
            </h2>
            <ul className="mt-2 list-disc pl-5">
              {Array.from({ length: 10 }, (_, index) => index + 1).map(
                (index) => {
                  const ingredientKey = `strIngredient${index}`;
                  const measureKey = `strMeasure${index}`;
                  return (
                    item[ingredientKey] && (
                      <li
                        key={index}
                        className="py-[3px] text-base text-slate-700 sm:text-lg"
                      >
                        {item[ingredientKey]}:{" "}
                        <span className="text-slate-500">
                          {item[measureKey]}
                        </span>
                      </li>
                    )
                  );
                }
              )}
            </ul>
          </div>
        </div>

        <hr className="mx-auto mt-10 w-full border-[2px] lg:mt-12" />

        <div className="mt-8 bg-white px-4 py-5 sm:px-8 lg:px-12">
          <h1 className="text-2xl font-semibold text-green-700 sm:text-3xl">
            Instructions:
          </h1>
          <p className="mt-3 whitespace-pre-line text-base font-medium text-green-700 sm:text-lg md:text-xl">
            {item.strInstructions}
          </p>
        </div>

        <Toaster
          toastOptions={{
            duration: 1300,
          }}
        />

        <hr className="mx-auto mt-5 w-full border-[2px]" />

        <h1 className="mt-5 text-2xl font-semibold text-orange-500 sm:text-3xl">
          Youtube link
        </h1>
        <div className="mx-auto mt-5 w-full max-w-3xl pb-8">
          <div className="aspect-video w-full overflow-hidden rounded-xl">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={item.strMeal || "Recipe video"}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeInfo;
