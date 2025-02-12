import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/get-all-users`); // Adjust the endpoint if necessary
    console.log("🚀 ~ file: userApi.js ~ line 10 ~ fetchUsers ~ response", response)
    return response.data.data;
  } catch (error) {
    console.log("🚀 ~ file: userApi.js ~ line 13 ~ fetchUsers ~ error", error)
  }
};

export const createStudentAPI = async (formData) => {
  const formPayload = new FormData();

  // Append student data fields
  Object.keys(formData).forEach((key) => {
    if (key !== "images") formPayload.append(key, formData[key]);
  });

  // Convert images from Data URL to Blob
  formData.images.forEach((img, index) => {
    const byteString = atob(img.split(",")[1]);
    const mimeString = img.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: mimeString });
    formPayload.append("images", blob, `image${index + 1}.jpg`);
  });

  const response = await axios.post("http://localhost:8765/api/create-student", formPayload, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const unverifyUser = async (user_id) => {
  try {
    const response = await axios.put(`${API_URL}/api/unverify-user/${user_id}`);
    console.log("🚀 ~ file: userApi.js ~ line 47 ~ unverifyUser ~ response", response)
    return response.data;
  } catch (error) {
    console.log("🚀 ~ file: userApi.js ~ line 50 ~ unverifyUser ~ error", error)
  }
};

export const deleteUser = async (user_id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/delete-user/${user_id}`);
    console.log("🚀 ~ file: userApi.js ~ line 57 ~ deleteUser ~ response", response)
    return response.data;
  } catch (error) {
    console.log("🚀 ~ file: userApi.js ~ line 60 ~ deleteUser ~ error", error)
  }
}

export const verifyUser = async (user_id) => {
  try {
    const response = await axios.put(`${API_URL}/api/verify-user/${user_id}`);
    console.log("🚀 ~ file: userApi.js ~ line 67 ~ verifyUser ~ response", response)
    return response.data;
  } catch (error) {
    console.log("🚀 ~ file: userApi.js ~ line 70 ~ verifyUser ~ error", error)
  }
}