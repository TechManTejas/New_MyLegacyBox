import * as SecureStore from "expo-secure-store";

const userSessionName = "user_session";

export const getAuthenticatedSession = () => {
  const p = SecureStore.getItemAsync(userSessionName);
  return p;
};

export const setAuthenticatedSession = (sessionToken) => {
  if (!sessionToken) {
    return killAuthenticatedSession();
  }

  return SecureStore.setItemAsync(userSessionName, sessionToken);
};

export const killAuthenticatedSession = () => {
  return SecureStore.deleteItemAsync(userSessionName);
};
