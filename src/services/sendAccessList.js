import axios from "axios";

const API_URL = "http://localhost:3030";

export const updateAccess = async (updatedAccessTo) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("Token not found");

  try {
    const response = await axios.put(
      `${API_URL}/user/update-access/id`,
      { accessTo: updatedAccessTo },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении доступа:", error);
    throw error;
  }
};
