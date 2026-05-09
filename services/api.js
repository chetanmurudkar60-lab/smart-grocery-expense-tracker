import axios from "axios";

const API = axios.create({
  baseURL: "http://10.156.128.116:5000/api",
});

export default API;