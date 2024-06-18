import { jwtDecode } from "jwt-decode";

export const saveToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const getToken = () => {
  return localStorage.getItem("accessToken");
};

export const removeToken = () => {
  localStorage.removeItem("accessToken");
};

export const hasValidToken = () => {
  const token = getToken();
  if (!token) {
    console.log("No token found");
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp && decodedToken.exp * 1000 >= Date.now();
  } catch (error) {
    console.log(error);
    return false;
  }
};
