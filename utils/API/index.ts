import axios, { AxiosResponse } from "axios";
import type { AxiosRequestConfig } from "axios";

export class ApiRequestError {
  name = "ApiRequestError";
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export type Methods = "get" | "post" | "put" | "patch" | "delete";

export function apiRequest<T = any>(
  method: "get" | "delete",
  path: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<T>>;

export function apiRequest<T = any>(
  method: "post" | "put" | "patch",
  path: string,
  data?: any,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<T>>;

export function apiRequest<T = any>(
  method: Methods,
  path: string,
  data?: any,
  options?: any
) {
  if (!axios[method]) throw new ApiRequestError("Not valid apiRequest Method");
  if (method === "get" || method === "delete")
    return axios[method]<T>(path, data);
  return axios[method]<T>(path, data, options);
}
