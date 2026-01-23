import {
  UiNode,
  UiNodeAnchorAttributes,
  UiNodeImageAttributes,
  UiNodeInputAttributes,
  UiNodeTextAttributes,
} from "@ory/client";

export const isUiNodeAnchorAttributes = (
  pet: any,
): pet is UiNodeAnchorAttributes => pet.href !== undefined;

export const isUiNodeImageAttributes = (
  pet: any,
): pet is UiNodeImageAttributes => pet.src !== undefined;

export const isUiNodeInputAttributes = (
  pet: any,
): pet is UiNodeInputAttributes => pet.name !== undefined;

export const isUiNodeTextAttributes = (pet: any): pet is UiNodeTextAttributes =>
  pet.text !== undefined;

export const getNodeId = ({ attributes }: UiNode) => {
  if (isUiNodeInputAttributes(attributes)) {
    return attributes.name;
  } else {
    // @ts-ignore
    return attributes.id;
  }
};

export const getNodeValue = ({ attributes }: UiNode) => {
  if (isUiNodeInputAttributes(attributes)) {
    return attributes.value;
  }

  return "";
};

export const getNodeTitle = ({ attributes, meta }: UiNode) => {
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

export const metaLabelModifier = (label?: string) => {
  switch (label) {
    case "ID":
      return "username";
  }

  return label;
};

export const handleFormSubmitError =
  (
    setConfig: (data: any) => void,
    initialize: () => void,
    logout?: () => void,
  ) =>
  (err: any): Promise<void> => {
    if (err.response) {
      switch (err.response.status) {
        case 400:
          if (typeof err.response.data.error === "object") {
            const ge = err.response.data;

            return Promise.resolve();
          }
          setConfig(err.response.data);
          return Promise.resolve();
        case 410:
        case 404:
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
