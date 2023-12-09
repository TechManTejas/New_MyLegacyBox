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
  children: React.JSX.Element;
}

interface SessionContextProps {
  session: {
    id: string;
    active: boolean | undefined;
    expires_at: string;
    authenticated_at: string;
    authenticator_assurance_level: string;
    authentication_methods: [
      {
        method: string;
        aal: string;
        completed_at: string;
      }
    ];
    issued_at: string;
    identity: {
      id: string;
      schema_id: string;
      schema_url: string;
      state: string;
      state_changed_at: string;
      traits: {
        name: {
          last: string;
          first: string;
        };
        email: string;
        phone: string;
      };
      verifiable_addresses: [
        {
          id: string;
          value: string;
          verified: boolean;
          via: string;
          status: string;
          created_at: string;
          updated_at: string;
        }
      ];
      recovery_addresses: [
        {
          id: string;
          value: string;
          via: string;
          created_at: string;
          updated_at: string;
        }
      ];
      metadata_public: null;
      created_at: string;
      updated_at: string;
    };
    devices: [
      {
        id: string;
        ip_address: string;
        user_agent: string;
        location: string;
      }
    ];
  };
  session_token: string;
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
  const [sessionContext, setSessionContext] =
    useState<SessionContextProps | null>(null);

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
    console.log(JSON.stringify(sessionContext, null, 1));
  }, [sessionContext]);

  // if session is empty/null update the sessionContext to null
  // if session is active, store session in device, and sync session
  const setAuth = async (
    sessionToken: SessionContextProps | null,
    cb: (() => void) | null
  ): Promise<void> => {
    if (!sessionToken) {
      await killAuthenticatedSession();
      return setSessionContext(sessionToken);
    }

    await setAuthenticatedSession(sessionToken);
    await syncSession(sessionToken);
    if (cb) cb();
  };

  // if auth session is not available, set auth with null session (refer above to see how that flow would work)
  // if session exist in device, then refresh it from the server, to update the sessionContext
  // only used to sync the session context in app, and invokes setAuth to remove session info from device
  const syncSession = (sessionToken: string) => {
    if (!sessionToken) return setAuth(null, null);

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
