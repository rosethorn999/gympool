import axios from "axios";

let host = "";
switch (process.env.NODE_ENV) {
  case "development":
  case "debug":
    host = "http://192.168.0.103:8000/api";
    break;
  case "production":
    host = "https://gympool-test.herokuapp.com/api";
    break;
  default:
    host = "http://192.168.1.101:8000/api";
    console.warn("set axios host error");
    break;
}

const basicRequest = axios.create({
  baseURL: host,
});

basicRequest.interceptors.request.use(
  (config) => {
    let token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let main = { host, basicRequest };
// FIXME: host not export
export default basicRequest;
