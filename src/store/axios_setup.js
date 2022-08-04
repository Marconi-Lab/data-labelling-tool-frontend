import axios from "axios";
const API_URL = "https://cacx.marconilab.org/api/v1";
// const API_URL = "http://localhost:5000/api/v1"

let settings = {
  baseURL: API_URL,
};

export default axios.create(settings);
