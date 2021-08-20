import axios from "axios";
const API_URL = "http://marconimlannotator.com/api/v1";

let settings = {
  baseURL: API_URL,
};

export default axios.create(settings);
