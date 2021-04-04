import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export class ApiRequestError extends Error {
  name = "ApiRequestError";
  message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}

export type Methods = "get" | "post" | "put" | "patch" | "delete";

export function apiRequest<T = any>(
  method: "get" | "delete",
  path: string,
  options?: AxiosRequestConfig
): [Promise<AxiosResponse<T>>, any];

export function apiRequest<T = any>(
  method: "post" | "put" | "patch",
  path: string,
  data?: any,
  options?: AxiosRequestConfig
): [Promise<AxiosResponse<T>>, any];

export function apiRequest<T = any>(
  method: Methods,
  path: string,
  data?: any,
  options?: any
) {
  if (!axios[method]) throw new ApiRequestError("Not valid apiRequest Method");

  let cancel;
  if (method === "get" || method === "delete") {
    const s = axios[method]<T>(path, {
      ...data,
      cancelToken: new axios.CancelToken(function executor(c) {
        cancel = c;
      }),
    });
    return [s, cancel];
  }
  return [
    axios[method]<T>(path, data, {
      ...options,
      cancelToken: new axios.CancelToken(function executor(c) {
        cancel = c;
      }),
    }),
    cancel,
  ];
}
