/*
 * Filename: SheetRecordDictionary.ts
 * Author: Kevin Davis
 *
 * Description
 * A Custom SheetObjectDictionary to properly handle the formula strings
 * that TRRecord classes need
 */

class SheetRecordDictionary extends SheetObjectDictionary<TRRecord> {

	//constructor(sheet: Sheet) {
		//super(Member, sheet);
	//}

	//translate(): Member[] {
		//if(this.sheet == null) throw `Cannot translate a null sheet`;

		//// Get Values for all columns expect those columns that are formula dependant
		//let members: Member[] = [];
		//this.sheet.values.forEach((rowData: any[], rowIndex: number): void => {
			//if(this.sheet == null) throw `sheet is null and should not be!`;
			//let headers: string[] = this.sheet.headers;

			//let data: SheetObjectInterface = {};
			//headers.forEach((header: string, headerIndex: number): void => {
				//data[header] = rowData[headerIndex];
				//if(header = "Expiring In (mo)") {
					//if(this.sheet == null) throw `SheetMemberDictionary::translate - sheet is null`;
					//data[header] = this.sheet.formulas[rowIndex][headerIndex];
				//}
			//});

			//if(this.ctor == null) throw `SheetMemberDictionary::translate - constructor is null!`;
			//let instance: Member = new this.ctor(data);
			//if(!instance.validate(data)) return;
			//members.push(instance);
		//});

		//return members;
	//}
}
