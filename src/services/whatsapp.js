import axios from "axios";

const baseUrl = "http://localhost:5501";

export const getQr = async () => {
  const response = await axios.get(`${baseUrl}/auth`);
  console.log(response.data);
  return response.data;
};

export const secureConnection = async () => {
  const response = await axios.get(`${baseUrl}/secure-connection/`);
  return await response.data;
};
