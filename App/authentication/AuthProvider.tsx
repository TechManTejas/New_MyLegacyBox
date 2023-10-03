import React, { useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSessionRedux } from "../redux/authentication/authentication";
import {
  getAuthenticatedSession,
  killAuthenticatedSession,
  setAuthenticatedSession,
} from "../utils/auth";
import { kratosClient } from "./kratosSdk";

interface AuthProviderProps {
  children: React.JSX.Element
}

const AuthContext = React.createContext({
  setSession: () => {},
  syncSession: () => Promise.resolve(),
  isAuthenticated: false,
  session: null,
  sessionToken: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [sessionContext, setSessionContext] = useState(undefined);
  const dispatch = useDispatch();

  // when provider mounts, get session from device,
  // if session exist we refresh it from server and set sessionContext
  // if it doest exist then we set sessionContext to null
  useEffect(() => {
    getAuthenticatedSession().then(syncSession).catch(console.error);
  }, []);

  // whenever sessionContext is updated, update it in redux
  // this is required specifically for the api to prefetch the header with
  // session token
  useEffect(() => {
    dispatch(setSessionRedux(sessionContext));
    console.log(sessionContext);
  }, [sessionContext]);

  // if session is empty/null update the sessionContext to null
  // if session is active, store session in device, and sync session
  const setAuth = (sessionToken, cb) => {
    if (!sessionToken) {
      return killAuthenticatedSession().then(() =>
        setSessionContext(sessionToken)
      );
    }

    return setAuthenticatedSession(sessionToken)
      .then(() => syncSession(sessionToken))
      .then(() => {
        if (cb) cb();
      });
  };

  // if auth session is not available, set auth with null session (refer above to see how that flow would work)
  // if session exist in device, then refresh it from the server, to update the sessionContext
  // only used to sync the session context in app, and invokes setAuth to remove session info from device
  const syncSession = (sessionToken) => {
    if (!sessionToken) {
      return setAuth(null);
    }

    return kratosClient
      .toSession({ xSessionToken: sessionToken })
      .then(({ data: session }) => {
        // if session is refreshed we update the context, here token will be same
        setSessionContext({ session, session_token: sessionToken });
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          // The user is no longer logged in (hence 401)
          console.log("Session is not authenticated:", error);
        } else {
          // A network or some other error occurred
          console.error(error);
        }

        // remove session / logout user
        setSessionContext(null);
      });
  };

  const value = {
    session: sessionContext?.session,
    sessionToken: sessionContext?.session_token,
    isAuthenticated: Boolean(sessionContext?.session_token),
    // get token from device and sync it
    syncSession: () => getAuthenticatedSession().then(syncSession),
    // set the auth session to the device memory
    setSession: setAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
