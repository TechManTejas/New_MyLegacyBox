import { Configuration, FrontendApi } from "@ory/kratos-client";
import { KRATOS_URL, KRATOS_URL_LOCAL_SUFFIX } from "@env";
import Constants from "expo-constants";

const baseUrl = `${KRATOS_URL}`;

// const baseUrl = `http://${
//   Constants.expoGoConfig?.debuggerHost?.split(":")[0]
// }${KRATOS_URL_LOCAL_SUFFIX}`;

export const kratosClient = new FrontendApi(
  new Configuration({
    basePath: baseUrl,
    baseOptions: {
      withCredentials: false,
    },
  })
);
