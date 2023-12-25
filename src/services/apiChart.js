import axios from "axios";
import { serverUrl } from "./server";

export async function getMenuStats() {
  const authToken = localStorage.getItem("token");
  const url = `${serverUrl}menu/statistics`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAggregation() {
  const authToken = localStorage.getItem("token");
  const url = `${serverUrl}orders/statistics`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
