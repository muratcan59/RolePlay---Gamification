const dev = {
  API_ENDPOINT_URL: process.env.REACT_APP_API_URL,
  WEB_FORM_URL: process.env.REACT_APP_API_WEBFORM,
  CDN_URL : process.env.REACT_APP_CDN_URL,
  CDN_VERSION : process.env.REACT_APP_CDN_VERSION
}
const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return dev;
      default:
        return dev;
  }
};

export const env = getEnv();
