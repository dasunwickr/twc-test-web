import { jwtDecode } from "jwt-decode";
import { getToken, removeToken } from "./tokenSerivces";

const isAuthenticated = () => {
  const token = getToken();
  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode<{exp: number}>(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

const logout = () => {
  removeToken();
};

export { isAuthenticated, logout };
