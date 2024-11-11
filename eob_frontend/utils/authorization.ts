import { CredentialResponse } from "@react-oauth/google";
import axios from "axios";

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh");
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/token/refresh/",
      {
        refresh: refreshToken,
      }
    );
    localStorage.setItem("access", response.data.access);
    return response.data.access;
  } catch (error) {
    console.log(error);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }
};

export const checkAuthorization = async () => {
  let access_token = localStorage.getItem("access");
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/user/",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    return { isAuthorized: true, user: response.data };
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      access_token = await refreshAccessToken();
      if (access_token) {
        const retryResponse = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/user/",
          { headers: { Authorization: `Bearer ${access_token}` } }
        );
        return { isAuthorized: true, user: retryResponse.data };
      } else {
        return { isAuthorized: false, user: null };
      }
    }
  }
  return { isAuthorized: false, user: null };
};

export const getCSRFToken = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/csrf_token/",
      {
        withCredentials: true,
      }
    );
    return response.data.csrfToken; // Trả về giá trị csrfToken từ response
  } catch (error) {
    console.log("Error fetching CSRF Token:", error);
    return null; // Trả về null nếu có lỗi xảy ra
  }
};

export const responseGoogle = async (
  credentialResponse: CredentialResponse
) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/auth/google/",
      {
        access_token: credentialResponse.credential,
      }
    );
    console.log("Server response:", response.data);
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};
