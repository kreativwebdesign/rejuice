export default {
  isUnauthenticated: status => [401, 419].includes(status),
  isInternalServerError: status => status >= 500 && status < 600,
  isOk: status => status >= 200 && status < 300,
};
