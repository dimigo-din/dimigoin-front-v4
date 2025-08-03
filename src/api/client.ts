import axios, {type AxiosInstance} from "axios";

let instance: AxiosInstance;

export function getInstance(): AxiosInstance {
  if (!instance) {
    instance = axios.create({
      baseURL: location.host === "dimigoin.io" ? 'https://api.dimigoin.io' : "http://localhost:3000",
      timeout: 5000,
      withCredentials: true,
    });

    instance.interceptors.response.use((res) => {
      return {...res, data: res.data.data, status: res.data.status};
    }, (err) => {
      console.log(err);
      if (err.response.status === 401 && err.config.url !== "/auth/refresh") {
        return new Promise((resolve, reject) => {
          instance.post("/auth/refresh").then(() => {
            resolve(instance(err.config));
          }).catch(() => {
            location.href = "/login"
            reject(err);
          });
        });
      }

      return Promise.reject(err);
    });
  }

  return instance;
}