import axios from "axios";
import { serverUrl } from "./server";

export async function getReviews(filter, itemId) {
  const url = `${serverUrl}menu/${filter}/${itemId}/reviews`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createReview(filter, itemId, review) {
  const authToken = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${serverUrl}menu/${filter}/${itemId}/reviews`,
      review,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteReview(id) {
  const authToken = localStorage.getItem("token");

  const response = await axios.delete(`${serverUrl}reviews/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (response.status === 204) {
    return { success: true };
  }
}
