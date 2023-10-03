export interface AdapterType {
  _id: string;
}

export enum GenderEnum {
  male = "MALE",
  female = "FEMALE",
  other = "OTHER",
}

export interface Address {
  city: string;
  state: string;
  pinCode: number;
  street: string;
  country?: string;
}

export enum RelationshipEnum {
  child = "CHILD",
  parent = "PARENT",
  spouse = "SPOUSE",
  sibling = "SIBLING",
  pms = "CA/LAWYER/INVESTMENT_ADVISOR",
  other = "OTHER",
}
