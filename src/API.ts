import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';
import { PloneClientConfig } from './interfaces/config';

const methods = ['get', 'post', 'put', 'patch', 'delete'];

export type ApiRequestParams = {
  config: PloneClientConfig;
  params?: any;
  data?: any;
  type?: any;
  headers?: any;
  checkUrl?: boolean;
};

function getBackendURL(apiPath: string, path: string) {
  const APISUFIX = '/++api++';

  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const adjustedPath = path[0] !== '/' ? `\/${path}` : path;

  return `${apiPath}${APISUFIX}${adjustedPath}`;
}

export async function handleRequest(
  method: string,
  path: string,
  options: ApiRequestParams,
): Promise<any> {
  const fetcher = new API();
  const response = await fetcher[method](path, options);

  /*
  3xx (redirect), 4xx, 5xx http status codes would indicate an error for the
  API.
  */
  if (!response || ![200, 201, 204].includes(response.status)) {
    throw new Error('Network response was not ok');
  }
  return response.data;
}

export default class API {
  [m: string]: (
    path: string,
    options: ApiRequestParams,
  ) => Promise<AxiosResponse<any>>;

  constructor(req?: Request) {
    const cookies = new Cookies();

    methods.forEach((method) => {
      this[method] = async (
        path,
        {
          config,
          params,
          data,
          type,
          headers = {},
          checkUrl = false,
        }: ApiRequestParams,
      ) => {
        const requestOptions: AxiosRequestConfig = {
          url: getBackendURL(config.apiPath, path),
          method,
          params,
          data,
          headers: {
            Accept: 'application/json',
            ...headers,
          },
        };

        // let authToken;
        // const axiosInstance = axios.create();
        // if (req) {
        //   // @ts-ignore
        //   // We are in SSR
        //   authToken = req.universalCookies.get('auth_token');
        //   axiosInstance.interceptors.request.use(
        //     addHeadersFactory(requestOptions),
        //   );
        // } else {
        //   authToken = cookies.get('auth_token');
        // }

        if (config.token && requestOptions.headers) {
          requestOptions.headers['Authorization'] = `Bearer ${config.token}`;
        }

        if (type && requestOptions.headers) {
          requestOptions.headers['Content-Type'] = type;
        }

        try {
          const response = await axios(requestOptions);

          return response;
        } catch (error) {
          throw error as Error;
        }
      };
    });
  }
}
