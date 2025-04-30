import axios from "axios";

export default async function deleteTask(taskId) {
  await axios.delete(`http://localhost:3030/notes/${taskId}`);
}
