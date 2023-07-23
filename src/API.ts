import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { PloneClientConfig } from './interfaces/config';

export type ApiRequestParams = {
  config: PloneClientConfig;
  params?: any;
  data?: any;
  type?: any;
  headers?: any;
  checkUrl?: boolean;
  raw?: boolean;
};

export function getBackendURL(apiPath: string, path: string) {
  const APISUFIX = '/++api++';

  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const adjustedPath = path[0] !== '/' ? `/${path}` : path;

  return `${apiPath}${APISUFIX}${adjustedPath}`;
}

/*
Previous implementation

export async function handleRequest(
  method: string,
  path: string,
  options: ApiRequestParams,
): Promise<any> {
  const fetcher = api;
  const response = await fetcher[method](path, options);

  return response;
}
*/

const _handleResponse = ({ data }: AxiosResponse) => data;

const _handleError = (error: any) => Promise.reject(error);

export function axiosConfigAdapter(
  method: string,
  path: string,
  options: ApiRequestParams,
): AxiosRequestConfig {
  const {
    config,
    params,
    data,
    type,
    headers = {},
    checkUrl = false,
  }: ApiRequestParams = options;
  const axiosConfig: AxiosRequestConfig = {
    method,
    url: getBackendURL(config.apiPath, path),
    params,
    headers: {
      Accept: 'application/json',
      ...headers,
    },
    data,
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    },
  };

  if (config.token) {
    if (axiosConfig.headers) {
      axiosConfig.headers['Authorization'] = `Bearer ${config.token}`;
    }
  }

  return axiosConfig;
}

export async function apiRequest(
  method: string,
  path: string,
  options: ApiRequestParams,
): Promise<any> {
  const instance = axios.create();

  if (options.raw) {
    instance.interceptors.response.use(undefined, _handleError);
  } else {
    instance.interceptors.response.use(_handleResponse, _handleError);
  }

  return instance.request(axiosConfigAdapter(method, path, options));
}
