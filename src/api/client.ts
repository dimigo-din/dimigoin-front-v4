let isRefreshing = false;
let refreshSubscribers: ((token?: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token?: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token?: string) {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
}

import axios, {type AxiosInstance} from "axios";

let instance: AxiosInstance;

export function getInstance(): AxiosInstance {
  if (!instance) {
    instance = axios.create({
      baseURL: !location.host.startsWith("localhost:") ? `https://api.${location.host}` : "http://localhost:3000",
      timeout: 30000,
      withCredentials: true,
    });

    instance.interceptors.response.use((res) => {
      return {...res, data: res.data.data, status: res.data.status};
    }, (err) => {
      console.log(err);
      if (err.response.status === 401 && err.config.url !== "/auth/refresh" && err.config.url !== "/auth/ping") {
        if (!isRefreshing) {
          isRefreshing = true;
          return instance.post("/auth/refresh").then(() => {
            isRefreshing = false;
            onRefreshed();
            return instance(err.config);
          }).catch((e) => {
            isRefreshing = false;
            if (e.response.status === 401 || e.response.status === 404) {
              location.href = "/login";
            }
            return Promise.reject(err);
          });
        }

        return new Promise((resolve) => {
          subscribeTokenRefresh(() => {
            resolve(instance(err.config));
          });
        });
      }

      return Promise.reject(err);
    });
  }

  return instance;
}