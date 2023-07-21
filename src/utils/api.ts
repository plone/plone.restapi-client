// @ts-nocheck
const HEADERS = ['range', 'if-range'];

/**
 * Create a function that add X-Forwarded Headers to Axios requests
 * @function addHeadersFactory
 * @param {Object} req Original request object
 * @return {function} Axios request interceptor
 */
export const addHeadersFactory = (orig): function => {
  return (request) => {
    const x_forwarded_host = orig.headers['x-forwarded-host'] || orig.hostname;
    const x_forwarded_for = orig.headers['x-forwarded-for'];
    const remote_host = orig.connection.remoteAddress;

    if (x_forwarded_for && remote_host) {
      request.headers['x-forwarded-for'] = x_forwarded_for + ', ' + remote_host;
    } else if (remote_host) {
      request.headers['x-forwarded-for'] = remote_host;
    } else if (x_forwarded_for) {
      request.headers['x-forwarded-for'] = x_forwarded_for;
    }

    x_forwarded_host &&
      (request.headers['x-forwarded-host'] = x_forwarded_host);

    // Forward additional headers
    HEADERS.forEach((header) => {
      if (orig.headers[header]) {
        request.headers[header] = orig.headers[header];
      }
    });

    return request;
  };
};
