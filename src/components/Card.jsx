import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ img, data, id }) => {
  const navigate = useNavigate();

  const handleNavigate = (value_id) => {
    navigate(`/${value_id}`);
  };

  return (
    <div
      className="md:w-[250px] sm:w-auto w-fit  h-[280px] bg-white rounded hover:shadow-xl hover:shadow-gray-300 transition-all ease-in duration-150 flex flex-col items-center  pt-3 hover:cursor-pointer "
      onClick={() => handleNavigate(id)}
    >
      <img
        src={img}
        alt="food_image"
        className="md:w-fit md:h-fit rounded-t rounded-r h-[200px] w-full px-6 pt-1 "
      />
      <h3 className="px-2 pt-2 text-lg font-semibold text-center">{data}</h3>
    </div>
  );
};

export default Card;
