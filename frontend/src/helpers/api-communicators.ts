import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("/user/sign-in", { email, password });
  if (response.status !== 200) {
    throw new Error("Unable to Login!");
  }
  return response.data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await axios.post("/user/sign-up", { name, email, password });
  if (response.status !== 200) {
    throw new Error("Unable to Sign up!");
  }
  return response.data;
};

export const checkAuthStatus = async () => {
  const response = await axios.get("/user/auth-status");
  if (response.status !== 200) {
    throw new Error("Unable to Authenticate!");
  }
  return response.data;
};

export const sendChatRequest = async (message: string) => {
  const response = await axios.post("/chat/new", { message });
  if (response.status !== 200) {
    throw new Error("Unable to send Chat!");
  }
  return response.data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};
