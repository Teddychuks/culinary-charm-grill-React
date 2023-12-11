// auth.js
import axios from "axios";
import { serverUrl } from "./server";

export async function signInUser({ email, password }) {
  const requestData = { email, password };

  try {
    const response = await axios.post(`${serverUrl}user/login`, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}

export async function getUser() {
  const url = `${serverUrl}user/myaccount`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function signUpUser(userData) {
  const requestData = { ...userData };

  try {
    const response = await axios.post(`${serverUrl}user/signup`, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function forgotPassword({ email }) {
  const requestData = { email };

  try {
    const response = await axios.post(
      `${serverUrl}user/forgotPassword`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function resetPassword(token, resetData) {
  const requestData = { ...resetData };
  console.log(requestData);
  console.log(token);
  const response = await axios.patch(
    `${serverUrl}user/reset_password/${token}`,
    requestData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function logout() {
  const url = `${serverUrl}user/logout`;
  await axios.get(url);

  return null;
}
