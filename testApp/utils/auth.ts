import { getItemAsync, deleteItemAsync, setItemAsync } from "expo-secure-store";
import { kratosClient } from "../authentication/kratosSdk";

const userSessionName = "user_session";

export const getAuthenticatedSession = async () => {
  
  try {
    const session = await getItemAsync(userSessionName)
    return session
  }
  catch(err) {
    console.log(err, "jiijijij");
    await deleteItemAsync(userSessionName)
    return null
  }

};

export const setAuthenticatedSession = (sessionToken?: string) => {
  if (!sessionToken) return killAuthenticatedSession();
  return setItemAsync(userSessionName, sessionToken);
};

export const killAuthenticatedSession = () => {
  return deleteItemAsync(userSessionName);
};

export const getAuthenticatedSessionTokenParsed = async () => {
  let value: string | null = "";

  try {
    value = await getAuthenticatedSession();
    console.log(value);
  } catch (err) {
    console.log(err);
  }

  // if (!value) {throw Error("empty value");}
  if (!value) {
    value = "";
  }

  try {
    const { data: session } = await kratosClient.toSession({
      xSessionToken: value,
    });

    return session;
  } catch (error) {
    // throw error;
  }
};
