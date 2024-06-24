import { jwtDecode } from "jwt-decode";
import { useUserStore } from "../store/userStore";

export const saveToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const getToken = () => {
  return localStorage.getItem("accessToken");
};

export const removeToken = () => {
  localStorage.removeItem("accessToken");
};

export const decodeToken = (token: string): any => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

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


export const decodeAndHandleToken = (token: string) => {
  if (token) {
    const decoded = jwtDecode(token);
    const { setUser } = useUserStore.getState();  
    setUser(decoded);
    return decoded;
  }
  return null;
};
