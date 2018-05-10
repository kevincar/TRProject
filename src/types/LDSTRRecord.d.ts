
interface LDSTRRecord {
	gender: Gender;
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
	visible: string | null;
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
	genderLabelShort: GenderShort;
	name: string;
	householdEmail: string;
	priesthoodCode: number;
	age: number;
	marriageDate: string | null;
	endowmentDate: string | null;
	expirationDate: string | null;
	status: RecommendStatus | null;
	recommendStatus: string | null;
	type: RecommendType | null;
	unordained: boolean;
	notBaptized: boolean;
	recommendStatusSimple: string | null;
	recommendEditable: boolean;
}

type Gender = "MALE" | "FEMALE";

type GenderShort = "M" | "F";

type RecommendType = "REGULAR";

type RecommendStatus = "ACTIVE" | "EXPIRING_NEXT_MONTH" | "EXPIRING_THIS_MONTH" | "EXPIRED_LESS_THAN_1_MONTH" | "EXPIRED_LESS_THAN_3_MONTHS" | "EXPIRED_OVER_3_MONTHS";
