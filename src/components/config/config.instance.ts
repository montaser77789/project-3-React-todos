import axios from "axios"

const axioInstance = axios.create({
    baseURL: "http://localhost:1337/api",
    timeout: 3000,
  });
  export default axioInstance ;