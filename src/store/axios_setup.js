import axios from "axios";
const API_URL = "http://localhost:5000";

let settings = {
  baseURL: API_URL,
};

export default axios.create(settings);
