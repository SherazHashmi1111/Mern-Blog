export const deleteData = async (endpoint) => {
  const c = confirm("Are you sure to delete this data?");
  if (!c) return false;

  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || response.statusText);
    }

    return true; // deleted successfully
  } catch (error) {
    console.error("Delete failed:", error);
    return false;
  }
};
