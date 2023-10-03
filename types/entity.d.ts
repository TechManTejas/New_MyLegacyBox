import { Address, GenderEnum, RelationshipEnum } from "./common";

export interface Nominee {
  _id: string;
  nominatorUid: string;
  nominatorHashedEmail: string;
  nomineeHashedEmail: string;
  fullName: string;
  gender: GenderEnum;
  relationship: RelationshipEnum;
  phoneNumber: string;
  email: string;
  age?: number;
  fathersName?: string;
  aadharNumber?: string;
  address?: Address;
}

export interface NomineeBody
  extends Omit<
    Nominee,
    "nominatorUid" | "nominatorHashedEmail" | "nomineeHashedEmail"
  > {
  nominatorUid?: string;
  nominatorHashedEmail?: string;
  nomineeHashedEmail?: string;
}

export interface PersonalInfoType {
  uid: string;
  fullName: string;
  gender: GenderEnum;
  age: Number;
  fathersName: string;
  dateOfBirth: Date;
  aadharNumber: string;
  address: Address;
}

export interface WitnessType extends NomineeBody {
  fathersName: string;
  address: Address;
}

export interface BeneficiaryType extends NomineeBody {
  age: number;
}

export interface ExecutorType extends NomineeBody {
  fathersName: string;
  address: Address;
}
