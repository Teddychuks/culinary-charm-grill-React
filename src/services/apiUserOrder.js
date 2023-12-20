import axios from "axios";
import { serverUrl } from "./server";

export async function getUserOrders() {
  const authToken = localStorage.getItem("token");
  const url = `${serverUrl}orders/user-orders`;

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
