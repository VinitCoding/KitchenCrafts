import axios from "axios";

const baseUrl = "https://www.themealdb.com/api/json/v1/1/";

export const fetchData = {
  async bySearch(data) {
    const response = await axios.get(`${baseUrl}search.php?s=${data}`);
    return response.data.meals;
  },

  async byId(id) {
    const response = await axios.get(`${baseUrl}lookup.php?i=${id}`);
    return response.data.meals;
  },
};
