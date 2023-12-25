import axios from "axios";
import { serverUrl } from "./server";

export async function updateUser(updateData) {
  const authToken = localStorage.getItem("token");

  let headers = {
    Authorization: `Bearer ${authToken}`,
  };

  let requestData;

  if (updateData.photo instanceof File) {
    const formData = { ...updateData };

    requestData = formData;
    headers["Content-Type"] = "multipart/form-data";
  } else {
    requestData = { ...updateData };
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await axios.patch(
      `${serverUrl}user/updatemyaccount`,
      requestData,
      {
        headers: headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error during user update:", error);
    throw error;
  }
}
