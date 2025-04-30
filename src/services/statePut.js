export default async function changeStatus(taskId, newStatus) {
  try {
    const response = await fetch(`http://localhost:3030/notes/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка при обновлении: ${response.statusText}`);
    }

    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    console.error("❌ Ошибка в changeStatus:", error);
    throw error;
  }
}
