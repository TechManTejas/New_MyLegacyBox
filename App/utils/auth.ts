import { getItemAsync, deleteItemAsync, setItemAsync } from "expo-secure-store";

const userSessionName = "user_session";

export const getAuthenticatedSession = () => {
  const p = getItemAsync(userSessionName);
  return p;
};

export const setAuthenticatedSession = (sessionToken?: string) => {
  if (!sessionToken) return killAuthenticatedSession();
  return setItemAsync(userSessionName, sessionToken);
};

export const killAuthenticatedSession = () => {
  return deleteItemAsync(userSessionName);
};
