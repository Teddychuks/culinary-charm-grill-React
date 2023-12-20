import axios from "axios";
import { serverUrl } from "./server";

export async function createNewOrder(menu) {
  const authToken = localStorage.getItem("token");

  try {
    const response = await axios.post(`${serverUrl}orders/create`, menu, {
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
