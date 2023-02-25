import axios from "axios";

const baseUrl = "https://api.munity.info";
export const getQr = async (parentPhone) => {
  const response = await axios.get(
    `${baseUrl}/juno/connect-client?phone=${parentPhone}`
  );
  console.log(response.data);
  return response.data;
};

export const secureConnection = async (parentPhone) => {
  const response = await axios.get(
    `${baseUrl}/juno/secure-client?phone=${parentPhone}`
  );
  return await response.data;
};

export const getGroupsData = async (parentPhone) => {
  const response = await axios.get(
    `${baseUrl}/get-user-groups?phone=${parentPhone}`
  );

  return await response.data;
};
