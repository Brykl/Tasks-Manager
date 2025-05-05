import axios from "axios";

const API_URL = "http://localhost:3030";

export const getAccessList = async () => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("Token not found");

  const response = await axios.get("http://localhost:3030/access-list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
