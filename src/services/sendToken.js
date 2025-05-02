import axios from "axios";

const API_URL = "http://localhost:3030";

export const getUserProfile = async (userName) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("Token not found");

  const response = await axios.get(`${API_URL}/user/${userName}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
