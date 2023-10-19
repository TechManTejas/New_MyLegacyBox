import { Configuration, FrontendApi } from "@ory/kratos-client";
import { KRATOS_URL } from "@env";

const baseUrl = `${KRATOS_URL}`;

export const kratosClient = new FrontendApi(
  new Configuration({
    basePath: baseUrl,
    baseOptions: {
      withCredentials: false,
    },
  })
);
