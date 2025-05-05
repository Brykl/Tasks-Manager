import axios from "axios";

export const checkToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token not found");

  const response = await axios.get(`http://localhost:3030/checkToken`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
