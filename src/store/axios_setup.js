import axios from "axios";
const API_URL = "http://cancer-labelling-tool.westeurope.cloudapp.azure.com/api/v1";

let settings = {
  baseURL: API_URL,
};

export default axios.create(settings);
