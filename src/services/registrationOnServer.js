import axios from "axios";

export default async function registerUser(username, password) {
  try {
    const response = await axios.post("http://localhost:3030/register", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при регистрации пользователя:", error);
    throw error;
  }
}
