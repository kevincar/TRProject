/*
 * Filename: TRRecord.ts
 * Author: Kevin Davis
 *
 * Description
 * Instances of this class represent a single record for a member's temple recommend
 */

class TRRecord extends SheetObject {

	name: string | null = null;
	gender: GenderShort | null = null;
	age: number | null = null;
	recommendType: RecommendType | null = null;
	status: RecommendStatus | null = null;
	expDate: Date | null = null;
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
		this.monthsRemaining = data["Expiring In (mo)"];
		this.dateMet = data["Date Met"];
		this.notes = data["Notes"];
		
		return true;
	}

	getData(): SheetObjectInterface {
		return {
			"NAME": this.name,
			"GENDER": this.gender,
			"AGE": this.age,
			"RECOMMEND TYPE": this.recommendType,
			"STATUS": this.status,
			"EXPIRARION": this.expDate,
			"Expiring In (mo)": this.monthsRemaining,
			"Date Met": this.dateMet,
			"Notes": this.notes
		};
	}

	loadSheetData(data: SheetObjectInterface): void {
	}

	loadLDSData(data: LDSTRRecord): void {
		this.name = data.name;
		this.gender = data.genderLabelShort;
		this.age = data.age;
		this.recommendType = data.type;
		this.status = data.status;
		this.expDate = TRRecord.convertLDSDate(data.expirationDate);
	}

	static convertLDSDate(ldsDate: string | null): Date | null {
		if(ldsDate == null) return ldsDate;

		if(typeof(ldsDate) != "string") return null;

		let dateString: string = ldsDate.replace(/^([0-9]{4})([0-9]{2})([0-9]{2})$/gi, "$2/$3/$1");

		return new Date(dateString);
	}
}


