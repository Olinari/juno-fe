import axios from "axios";

const baseUrl = "https://juno.herokuapp.com";

export const getQr = async (parentPhone) => {
  const response = await axios.get(
    `${baseUrl}/connect-client?phone=${parentPhone}`
  );
  console.log(response.data);
  return response.data;
};

export const secureConnection = async (parentPhone) => {
  const response = await axios.get(
    `${baseUrl}/secure-connection?phone=${parentPhone}`
  );
  return await response.data;
};

export const getGroupsData = async (parentPhone) => {
  const response = await axios.get(
    `${baseUrl}/get-user-groups?phone=${parentPhone}`
  );

  return await response.data;
};
