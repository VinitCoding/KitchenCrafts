import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../service/api.js";
import toast, { Toaster } from "react-hot-toast";
import backgroundImage from "../assets/images/bg.png";

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

  console.log(item);

  if (item) {
    const url = item.strYoutube;
    videoId = url?.split("=")[1];
    // const str = url.split("=");
    // vId = str[str.length - 1];
  }

  return (
    <div
      className="w-auto h-auto overflow-hidden bg-cover md:h-fit md:w-fit"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Heading, Food type, Category */}
      <div className="flex flex-col justify-center text-center">
        <h2 className="pt-10 text-2xl font-bold text-blue-500 md:font-semibold md:text-4xl">
          Recipe Name:<span className="text-slate-700"> {item.strMeal}</span>
        </h2>
        <div className="flex md:flex-row flex-col justify-center gap-4 mt-6 mx-auto p-2 bg-white rounded md:w-[500px] w-fit">
          <h2 className="text-lg font-semibold text-slate-600">
            Food Type:{" "}
            <span className="text-blue-500">{item.strArea} Food</span>
          </h2>
          <h3 className="text-lg font-semibold text-slate-600">
            Category: <span className="text-blue-500">{item.strCategory}</span>
          </h3>
        </div>
      </div>

      {/* Incredients and image */}
      <div className="flex flex-col justify-center mt-12 md:flex-row md:flex gap-x-28">
        <div className="md:w-[400px] md:h-[400px] w-auto h-auto">
          <img
            src={item.strMealThumb}
            alt="image"
            className="px-3 pb-5 rounded md:px-0 md:pb-0 w-fit h-fit"
          />
        </div>
        <div className="md:p-3 p-1.5 md:px-10 px-10 bg-white rounded-md h-fit">
          <h2 className="text-2xl font-semibold text-blue-500">Incredients:</h2>
          <ul>
            {Array.from({ length: 10 }, (_, index) => index + 1).map(
              (index) => {
                const ingredientKey = `strIngredient${index}`;
                const measureKey = `strMeasure${index}`;
                return (
                  item[ingredientKey] && (
                    <li
                      key={index}
                      className="py-[3px] text-lg list-disc text-slate-700"
                    >
                      {item[ingredientKey]}:{" "}
                      <span className="text-slate-500">{item[measureKey]}</span>
                    </li>
                  )
                );
              }
            )}
          </ul>
        </div>
      </div>
      <hr className="divide-x- border-[2px] lg:w-[1400px] md:w-fit sm:w-auto w-auto mx-auto mt-12" />

      <div className="px-3 py-5 pb-5 mt-8 bg-white md:px-32">
        <h1 className="text-3xl font-semibold text-green-700">Instructions:</h1>
        <p className="text-xl font-semibold text-green-700">
          {item.strInstructions}
        </p>
      </div>
      <Toaster
        toastOptions={{
          duration: 1300,
        }}
      />

      <hr className="divide-x- border-[2px] md:w-[1400px] w-auto  mx-auto mt-5" />

      <h1 className="block pl-10 mt-5 text-3xl font-semibold text-orange-500 md:pl-40">
        Youtube link
      </h1>
      <div className="flex justify-center px-px pb-5 mt-5 ms:pb-10">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className="md:w-[750px] md:h-[350px] w-fit h-fit rounded-xl "
        ></iframe>
      </div>
    </div>
  );
};

export default RecipeInfo;
