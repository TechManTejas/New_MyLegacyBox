export const cleanObject = (obj) => {
  Object.entries(obj).forEach(([k, v]) => {
    if (typeof v === "object") {
      // clean the nested object
      cleanObject(v);

      // delete key if nested object empty
      if (Object.keys(v).length === 0) {
        delete obj[k];
      }
    } else if (!Boolean(v)) {
      // delete key if value is falsy
      delete obj[k];
    }
  });

  return obj;
};
