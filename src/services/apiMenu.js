// apiMenu.js
import axios from "axios";
import { serverUrl } from "./server";

export async function getAllMenu(filterOptions, sortOption) {
  const url = `${serverUrl}menu/${filterOptions}?sort=${sortOption}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
