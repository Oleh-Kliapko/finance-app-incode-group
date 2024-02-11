import axios from "axios";

interface IData {
  intervalForUpdateData: number;
}

export const getInterval = async () => {
  try {
    const { data } = await axios.get<IData>("/interval");
    return data.intervalForUpdateData;
  } catch (e: any) {
    return e.message;
  }
};

export const updateInterval = async (newInterval: number) => {
  try {
    const { data } = await axios.post<IData>("/interval", { newInterval });
    return data;
  } catch (e: any) {
    return e.message;
  }
};
