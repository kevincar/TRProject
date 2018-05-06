/*
 * Filename: SheetRecordDictionary.spec.ts
 * Author: Kevin Davis
 * 
 * Description
 * Test specification for SheetRecordDictionary
 */

function SheetRecordDictionaryTest(tap: GasTap): void {

	let recordSheet: Sheet = new Sheet(new Spreadsheet(), "Main");
	let srd: SheetRecordDictionary = new SheetRecordDictionary(recordSheet);

	tap.test("translate", (t: test): void => {
		let records: TRRecord[] = srd.translate();
		let firstRecord: TRRecord = records[0];

		if(firstRecord.name == null) throw `null name`;
		t.equal(firstRecord.monthsRemaining, "=FLOOR((DATE(YEAR($F2), MONTH($F2)+1, DAY($F2))-TODAY())/30)", "formla match");
	});
}
