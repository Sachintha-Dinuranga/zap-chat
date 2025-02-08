// create a instance
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://localhost:5001/api",
  withCredentials: true, // send cookies with every singal request
});
