/*
 * Filename: triggers.ts
 * Author: Kevin Davis
 *
 * Description
 * Holds trigger functions
 */

function updateMemberList(): void {

	// 1. Get LDS data
	let LDSRecordData: LDSTRRecord[] = LDSApi.getRecordData();

	if(LDSRecordData.length < 1) {
		SpreadsheetApp.getUi().alert("ObSSOCookie out of date");
		return;
	}

	// 2. Update current member information if available, add new member, and remove old members
	RecordManager.updateRecords(LDSRecordData);
	let records: TRRecord[] = RecordManager.getRecords();

	// 3. Write it out
	RecordManager.writeRecords();
}
