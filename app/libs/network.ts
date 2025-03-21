import axios from "axios";

export const todoNetwork = axios.create({
  baseURL: "https://dummyjson.com/todos",
  params: {
    limit: 254,
  },
});
