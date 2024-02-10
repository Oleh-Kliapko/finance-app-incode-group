import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";

axios.defaults.baseURL = BASE_URL;

export const useGetInterval = () => {
  const [interval, setInterval] = useState<number>(0);

  useEffect(() => {
    const fetchInterval = async () => {
      try {
        const { data } = await axios.get("/interval");
        setInterval(data.intervalForUpdateData);
      } catch (error) {
        console.error("Error fetching interval:", error);
      }
    };

    fetchInterval();
  }, [interval]);

  return interval;
};
