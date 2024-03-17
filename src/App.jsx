import React from "react";
import "./App.css";
import FindMeal from "./components/FindMeal";
import { Routes, Route } from "react-router-dom";
import RecipeInfo from "./components/RecipeInfo";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe" element={<FindMeal />} />
        <Route path="/:MealId" element={<RecipeInfo />} />
      </Routes>
    </div>
  );
};

export default App;
