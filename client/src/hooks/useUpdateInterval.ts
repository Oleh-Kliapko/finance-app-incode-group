import axios from "axios";

export const useUpdateInterval = async (newInterval: number) => {
  try {
    const { data } = await axios.post("/interval", { newInterval });
    return data.message;
  } catch (error) {
    console.error("Error updating interval:", error);
  }
};
