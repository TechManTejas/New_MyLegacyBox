import { Configuration, FrontendApi } from "@ory/kratos-client";
import { KRATOS_URL_LOCAL_SUFFIX, KRATOS_URL_LOCAL, KRATOS_URL } from "@env";
import Constants from "expo-constants";

const { manifest } = Constants;

// const baseUrl = `http://${manifest.debuggerHost
//   .split(":")
//   .shift()}${KRATOS_URL_LOCAL_SUFFIX}`;

const baseUrl = `${KRATOS_URL}`

export const kratosClient = new FrontendApi(
  new Configuration({
    basePath: baseUrl,
    baseOptions: {
      withCredentials: false,
    },
  })
);
