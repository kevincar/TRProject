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

		// 2. Add new unrecognized members
		LDSRecordData.forEach((ldsRecord: LDSTRRecord, index: number): void => {
			if(records == null) throw "Records were not loaded appropriately";
			// Use the current ldsRecord to look up the corresponding member in our records
			//let member: Member | undefined = members.reduce((result: Member | undefined, curMember: Member, i, a) => {
				//if(ldsMember.name == curMember.name) result = curMember;
				//return result;
			//}, undefined);

			//let isNewMember: boolean = member == undefined;

			//if(!isNewMember) return;

			//member = new Member(null);
			//member.loadLDSData(ldsMember);

			//members.push(member);
		});

		//// 3. Remove old members
		//members.forEach((member: Member, memberIndex: number) => {
			//if(!members) throw "Members were not loaded properly";
			//let ldsMember: LDSMember | undefined = LDSMemberData.reduce((result: LDSMember | undefined, curMember: LDSMember, i, a) => {
				//if(curMember.name == member.name) result = curMember;
				//return result;
			//}, undefined);

			//let isOldMember: boolean = ldsMember == undefined;
			//if(isOldMember) {
				//members.splice(memberIndex, 1);
			//}
		//});
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

	//export function writeMembers() {
		// 4. Format
		//if(!members) getMembers();
		//if(!members) throw "Attempting to write members but getting the members failed";
		//memberListSheetDict.write(members);
		//memberListSheet.sort(5, true);
	//}
}
