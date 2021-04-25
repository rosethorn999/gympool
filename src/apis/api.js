import axios from "axios";

let host = "";
switch (process.env.NODE_ENV) {
  case "development":
  case "debug":
    host = "http://150.117.81.50:8000/api";
    break;
  case "production":
    host = "https://gympool-test.herokuapp.com/api";
    break;
  default:
    console.warn("set axios host error");
    break;
}

const basicRequest = axios.create({
  baseURL: host,
});

basicRequest.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { host };
export default basicRequest;
