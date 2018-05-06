
interface LDSMember {
  gender: gender;
  priesthood: string;
  unitNumber: number;
  isHead: boolean;
  fullTimeMissionary: boolean;
  householdId: string;
  formattedMrn: string;
  householdPhone: string;
  sustainedDate: string;
  outOfUnitMember: boolean;
  actualAge: number;
  spokenName: string;
  isSpouse: boolean;
  nonMember: boolean;
  id: number;
  email: string;
  coupleName: string;
  isAdult: boolean;
  visible: string;
  address: string;
  unitName: string;
  setApart: boolean;
  givenName: string;
  mrn: string;
  nameOrder: number;
  priesthoodType: string;
  birthDate: number;
  birthDateSort: number;
  genderCode: number;
  phone: string;
  actualAgeInMonths: number;
  genderLabelShort: string;
  name: string;
  householdEmail: string;
  priesthoodCode: number;
  age: number;
}

type gender = "MALE" | "FEMALE";
