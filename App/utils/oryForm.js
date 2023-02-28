export const isUiNodeAnchorAttributes = (pet) => pet.href !== undefined;

export const isUiNodeImageAttributes = (pet) => pet.src !== undefined;

export const isUiNodeInputAttributes = (pet) => pet.name !== undefined;

export const isUiNodeTextAttributes = (pet) => pet.text !== undefined;

export const getNodeId = ({ attributes }) => {
  if (isUiNodeInputAttributes(attributes)) {
    return attributes.name;
  } else {
    return attributes.id;
  }
};

export const getNodeValue = ({ attributes }) => {
  if (isUiNodeInputAttributes(attributes)) {
    return attributes.value;
  }

  return "";
};

export const getNodeTitle = ({ attributes, meta }) => {
  if (isUiNodeInputAttributes(attributes)) {
    if (meta?.label?.text) {
      return meta.label.text;
    }
    return attributes.name;
  }

  if (meta?.label?.text) {
    return meta.label.text;
  }

  return "";
};

export const metaLabelModifier = (label) => {
  switch (label) {
    case "ID":
      return "username";
  }

  return label;
};

export const handleFormSubmitError =
  (setConfig, initialize, logout) => (err) => {
    if (err.response) {
      switch (err.response.status) {
        case 400:
          if (typeof err.response.data.error === "object") {
            const ge = err.response.data;
            console.log({
              message: `${ge.message}: ${ge.reason}`,
              type: "danger",
            });

            return Promise.resolve();
          }

          console.log("Form validation failed:", err.response.data);
          setConfig(err.response.data);
          return Promise.resolve();
        case 404:
        case 410:
          console.log("Flow could not be found, reloading page.");
          initialize();
          return Promise.resolve();
        case 403:
        case 401:
          if (!logout) {
            console.log(
              `Received unexpected 401/403 status code: `,
              err,
              err.response.data
            );
            return Promise.resolve();
          }

          console.log(
            "The server indicated that this action is not allowed for you. The most likely cause of that is that you modified a privileged field (e.g. your password) but your ORY Kratos Login Session is too old."
          );
          console.log({
            message: "Please re-authenticate before making these changes.",
            type: "warning",
          });
          logout();
          return Promise.resolve();
      }
    }

    console.error(err, err.response?.data);
    return Promise.resolve();
  };
