import { getItemAsync, deleteItemAsync, setItemAsync } from "expo-secure-store";
import { kratosClient } from "../authentication/kratosSdk";

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

export const getAuthenticatedSessionTokenParsed = async () => {

  let value

  try {
    
    value = await getAuthenticatedSession()
  }
  catch(err) {
    
    console.error(err);
  }

  if (!value) throw Error("empty value");

  try {
    const { data: session } = await kratosClient.toSession({
      xSessionToken: value,
    });

    return session;
  } catch (error) {
    throw error;
  }
};
