export const cleanObjectAndTrim = (obj) => {
  Object.entries(obj).forEach(([k, v]) => {
    if (v?.constructor === Object) {
      // clean the nested object
      cleanObjectAndTrim(v);

      // delete key if nested object empty
      if (Object.keys(v).length === 0) {
        delete obj[k];
      }
    } else if (!Boolean(v)) {
      // delete key if value is falsy
      delete obj[k];
    } else if (typeof v === "string") {
      // trim if its string
      obj[k] = v.trim();
    }
  });

  return obj;
};

export const objectToDropDownLabelAndValues = (obj) =>
  Object.entries(obj).map(([k, v]) => ({ label: v, value: k }));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
