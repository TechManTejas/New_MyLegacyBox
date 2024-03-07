import React, { useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSessionRedux } from "../redux/authentication/authentication";
import {
  getAuthenticatedSession,
  killAuthenticatedSession,
  setAuthenticatedSession,
} from "../utils/auth";
import { kratosClient } from "./kratosSdk";
import { Session } from "@ory/kratos-client";
import Bugsnag from "@bugsnag/expo";

interface AuthProviderProps {
  children: React.JSX.Element;
}

interface SessionContextProps {
  session: Session;
  session_token: string;
}

interface AuthContextProps {
  setSession?: (
    sessionToken: string | null,
    cb: (() => void) | null
  ) => Promise<void>;
  syncSession?: () => Promise<void>;
  isAuthenticated?: boolean;
  session?: Session;
  sessionToken?: string;
}

const AuthContext = React.createContext<AuthContextProps>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [sessionContext, setSessionContext] =
    useState<SessionContextProps | null>(null);

  const dispatch = useDispatch();

  // if auth session is not available, set auth with null session (refer above to see how that flow would work)
  // if session exist in device, then refresh it from the server, to update the sessionContext
  // only used to sync the session context in app, and invokes setAuth to remove session info from device
  const syncSession = (value: string | null) => {
    if (!value) return setAuth(null, null);

    return kratosClient
      .toSession({ xSessionToken: value })
      .then(({ data: session }) => {
        // if session is refreshed we update the context, here token will be same
        setSessionContext({ session, session_token: value });
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          // The user is no longer logged in (hence 401)
          console.error("Session is not authenticated:", error);
        } else {
          // A network or some other error occurred
          console.error(error);
        }

        // remove session / logout user
        setSessionContext(null);
      });
  };

  // when provider mounts, get session from device,
  // if session exist we refresh it from server and set sessionContext
  // if it doest exist then we set sessionContext to null
  useEffect(() => {
    getAuthenticatedSession().then(syncSession).catch(Bugsnag.notify);
  }, []);

  // whenever sessionContext is updated, update it in redux
  // this is required specifically for the api to prefetch the header with
  // session token
  useEffect(() => {
    dispatch(setSessionRedux(sessionContext));
    // console.log(JSON.stringify(sessionContext, null, 1));
  }, [sessionContext]);

  // if session is empty/null update the sessionContext to null
  // if session is active, store session in device, and sync session
  const setAuth = async (
    sessionToken: string | null,
    cb: (() => void) | null
  ): Promise<void> => {
    if (!sessionToken) {
      await killAuthenticatedSession();
      return setSessionContext(null);
    }

    await setAuthenticatedSession(sessionToken);
    await syncSession(sessionToken);
    if (cb) cb();
  };

  const value = {
    session: sessionContext?.session,
    sessionToken: sessionContext?.session_token,
    isAuthenticated: Boolean(sessionContext?.session_token),
    // get token from device and sync it
    syncSession: () => {
      getAuthenticatedSession()
        .then(syncSession)
        .catch((err) => {
          Bugsnag.notify(err);
          killAuthenticatedSession();
        });
    },

    // set the auth session to the device memory
    setSession: setAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
