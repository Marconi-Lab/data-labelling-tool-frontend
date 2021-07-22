import axios from "axios";
const API_URL = "http://20.73.19.71:5000/api/v1";

let settings = {
  baseURL: API_URL,
};

export default axios.create(settings);
