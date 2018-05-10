/*
 * Filename: RecordManager
 * Author: Kevin Davis
 *
 * Description
 * functions to manage records
 */

/// <reference path="./SheetRecordDictionary" />

namespace RecordManager {
	let records: TRRecord[] | null = null;
	let spreadsheet: Spreadsheet = new Spreadsheet();
	let recordListSheet: Sheet = new Sheet(spreadsheet, "Main");
	let recordListSheetDict: SheetRecordDictionary = new SheetRecordDictionary(recordListSheet);

	export function getRecords(): TRRecord[] {
		if(records) return records;

		records = [];
		records = recordListSheetDict.translate();

		return records;
	}

	export function updateRecords(LDSRecordData: LDSTRRecord[]): void {

		if(LDSRecordData.length == 0) return;

		// 0. ensure we have members
		if(records == null)
			records = getRecords();

		// 1. Update current members
		records.forEach((record: TRRecord, recordIndex: number): void => {

			LDSRecordData.forEach((ldsRecord: LDSTRRecord, ldsRecordIndex: number): void => {
				if(ldsRecord.name != record.name) return;
				record.loadLDSData(ldsRecord);
			});
		});

		// 2. Add new unrecognized records
		LDSRecordData.forEach((ldsRecord: LDSTRRecord, index: number): void => {
			if(records == null) throw "Records were not loaded appropriately";
			// Use the current ldsRecord to look up the corresponding record in our records
			let record: TRRecord | null = records.reduce((result: TRRecord | null, curRecord: TRRecord): TRRecord | null => {
				if(ldsRecord.name == curRecord.name) result = curRecord;
				return result;
			}, null);

			let isNewRecord: boolean = record == null;

			if(!isNewRecord) return;

			record = new TRRecord(null);
			record.loadLDSData(ldsRecord);

			records.push(record);
		});

		// 3. Remove old members
		records.forEach((record: TRRecord, recordIndex: number): void => {
			if(records == null) throw "Records were not loaded properly";
			let ldsRecord: LDSTRRecord | null = LDSRecordData.reduce((result: LDSTRRecord | null, curRecord: LDSTRRecord): LDSTRRecord | null => {
				if(curRecord.name == record.name) result = curRecord;
				return result;
			}, null);

			let isOldMember: boolean = ldsRecord == null;
			if(isOldMember) {
				records.splice(recordIndex, 1);
			}
		});
	}

	//export function setMembers(M: Member[]) {
		//members = M;
	//}

	//export function getMember(prefferedName: string): Member | undefined {
		//if(!members)
			//members = getMembers();

		//return members.reduce((result: Member | undefined, member: Member, memberIndex: number): Member | undefined => {
			//if(member.prefferedName == prefferedName) result = member;

			//return result;
		//}, undefined);
		//return undefined;
	//}

	//export function setMember(M: Member) {
		//if(!members) members = getMembers();

		//members.forEach((member: Member, memberIndex: number) => {
			//if(member.fullName != M.fullName) return;
			//member.setData(M.getData());
		//});
	//}

	export function writeRecords() {
		// 4. Format
		if(records == null) getRecords();
		if(records == null) throw "Attempting to write records but getting the records failed";
		recordListSheetDict.write(records);
		recordListSheet.sort(5, true);
	}
}
