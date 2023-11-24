import Constants from "expo-constants";
import { Configuration, FrontendApi } from "@ory/kratos-client";
import { KRATOS_URL, KRATOS_URL_LOCAL_SUFFIX } from "@env";

// const baseUrl = `http://${
//   Constants.expoGoConfig?.debuggerHost?.split(":")[0]
// }${KRATOS_URL_LOCAL_SUFFIX}`;

const baseUrl = `${KRATOS_URL}`;

export const kratosClient = new FrontendApi(
  new Configuration({
    basePath: baseUrl,
    baseOptions: {
      withCredentials: false,
    },
  })
);
