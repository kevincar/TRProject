/*
 * Filename: TRRecord.ts
 * Author: Kevin Davis
 *
 * Description
 * Instances of this class represent a single record for a member's temple recommend
 */

enum GENDER {
	M = "M",
	F = "F"
}

enum RECOMMEND_TYPE {
	regular = "REGULAR"
}

enum STATUS {
	active = "ACTIVE",
	expiringNextMonth = "EXPIRING_NEXT_MONTH",
	expiredThreeMonths = "EXPIRED_OVER_3_MONTHS"
}

class TRRecord extends SheetObject {

	static readonly GENDER = GENDER;
	static readonly STATUS = STATUS;
	static readonly RECOMMEND_TYPE = RECOMMEND_TYPE;

	name: string | null = null;
	gender: GENDER | null = null;
	age: number | null = null;
	recommendType: RECOMMEND_TYPE | null = null;
	status: STATUS | null = null;
	expDate: Date | null = null;
	actions: string | null = null;
	monthsRemaining: string | null = null;
	dateMet: Date | null = null;
	notes: string | null = null;

	constructor (data: SheetObjectInterface | null) {
		super();
		this.setData(data);
	}

	setData(data: SheetObjectInterface | null): boolean {

		if(!data) return false;
		if(!this.validate(data)) return false;

		this.name = data["NAME"];
		this.gender = data["GENDER"];
		this.age = parseInt(data["AGE"]);
		this.recommendType = data["RECOMMEND TYPE"];
		this.status = data["STATUS"];
		this.expDate = SheetObject.convertFromGDate(data["EXPIRATION"]);
		this.actions = data["ACTIONS"];
		this.monthsRemaining = data["Expiring In (mo)"];
		this.dateMet = data["Date Met"];
		this.notes = data["Notes"];
		
		return true;
	}

	getData(): SheetObjectInterface {
		return {
			"NAME": this.name,
		}
	}

	loadSheetData(data: SheetObjectInterface): void {
	}

	loadLDSData(data: LDSTRRecord): void {
		//this.name = data.name;
		//this.gender = data.genderLabelShort;
		//this.age = data.age;
		//this.recommendType = data.type;
		//this.status = data.status;
	}

	static convertLDSDate(ldsDate: string | null): Date | null {
		if(ldsDate == null) return ldsDate;

		if(typeof(ldsDate) != "string") return null;

		let dateString: string = ldsDate.replace(/^([0-9]{4})([0-9]{2})([0-9]{2})$/gi, "$2/$3/$1");

		return new Date(dateString);
	}
}


