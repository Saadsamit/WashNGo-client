const env = import.meta.env;

const config = {
  serverUrl: env.PROD ? env.VITE_SERVER_HOST_URL : env.VITE_SERVER_LOCAL_URL,
};

export default config;
