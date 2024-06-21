
import { setApiAuthHeader } from "./axiosInstance";
import { decodeToken, getToken } from "./tokenSerivces";

export const initializeAuth = (updateGlobalState: (userDetails: any) => void): void => {
  const token = getToken();

  if (token) {
    setApiAuthHeader(token);

    const userDetails = decodeToken(token);
    if (userDetails) {
      updateGlobalState(userDetails);
    }
  }
};
