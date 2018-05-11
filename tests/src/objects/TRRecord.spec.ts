/*
 * Filename: TRRecord.spec.ts
 * Author: Kevin Davis
 *
 * Description
 * Test specifications for the TRRecord class
 */

function TRRecordTest(tap: GasTap): void {
	let testData: SheetObjectInterface = {
		"NAME": "Djinklage Morgoon",
		"GENDER": "M",
		"AGE": 30,
		"RECOMMEND TYPE": "REGULAR",
		"STATUS": "ACTIVE",
		"EXPIRATION": 43799,
		"ACTIONS": null,
		"Expiring In (mo)": "FLOOR((DATE(YEAR($F2), MONTH($F2)+1, DAY($F2))-TODAY())/30)",
		"Date Met": null,
		"Notes": null
	};

	tap.test("constructor", (t: test): void => {
		let testRecord: TRRecord = new TRRecord(testData);

		t.notEqual(testRecord.expDate, null, "date should not be null");
		if(testRecord.expDate == null) return;

		t.equal(testRecord.name, testData["NAME"], "Name should match");
		t.equal(testRecord.gender, "M", "Gender should map to type");
		t.equal(testRecord.expDate.getTime(), (new Date("11/30/2019")).getTime(), "expDates should match");
		t.equal(testRecord.monthsRemaining, testData["Expiring In (mo)"], "remainingMonths should be a formula");
		return;
	});

	tap.test("convertLDSDate", (t: test): void => {
		let initial: string = "19901114";
		let expected: Date = new Date("11/14/1990");
		let observed: Date | null = TRRecord.convertLDSDate(initial);

		t.notEqual(observed, null, "date should not be null");
		if(observed == null) return;

		t.equal(observed.getTime(), expected.getTime(), "dates should match");
	});
}
