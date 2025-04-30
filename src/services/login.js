import axios from "axios";

export default async function login(username, password) {
  try {
    const response = await axios.post("http://localhost:3030/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при входе:", error);
    throw error;
  }
}
