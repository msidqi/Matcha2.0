const config = {
  IP_API_TOKEN: process.env.NEXT_PUBLIC_IP_API_TOKEN || "",
  API_URL: process.env.API_URL || 'http://localhost:3001',
  SOCKET_SERVER_PORT: process.env.SOCKET_SERVER_PORT || 5000
};

export default config;
