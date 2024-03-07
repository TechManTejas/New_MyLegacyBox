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

            return Promise.resolve();
          }
          setConfig(err.response.data);
          return Promise.resolve();
        case 404:
        case 410:
          initialize();
          return Promise.resolve();
        case 403:
        case 401:
          if (!logout) {
            return Promise.resolve();
          }

          logout();
          return Promise.resolve();
      }
    }

    console.error(err, err.response?.data);
    return Promise.resolve();
  };
