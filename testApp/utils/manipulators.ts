import { toTitleCase } from "./stringUtils";

export const cleanObjectAndTrim = (obj: any) => {
  Object.entries(obj).forEach(([k, v]) => {
    if ((v as any)?.constructor === Object) {
      // clean the nested object
      cleanObjectAndTrim(v);

      // delete key if nested object empty
      // @ts-ignore
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

export const objectToDropDownLabelAndValues = (obj: any) =>
  Object.entries(obj).map(([k, v]) => ({ label: v, value: k }));

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function capitalize(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatLabel(str: string) {
  return toTitleCase(str.replace(/_/g, " "));
}
