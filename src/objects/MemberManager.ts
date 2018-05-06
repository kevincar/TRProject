/*
 * Filename: MemberManager
 * Author: Kevin Davis
 *
 * Description
 * Manage the member object
 */

namespace MemberManager {
	//let members: Member[] | null = null;
	//let spreadsheet: Spreadsheet = new Spreadsheet();
	//let memberListSheet: Sheet = new Sheet(spreadsheet, "Main");
	//let memberListSheetDict = new SheetObjectDictionary(Member, memberListSheet);

	//export function getMembers(): Member[] {
		//if(members) return members;

		//members = [];
		////members = memberListSheetDict.translate();

		////return members;
		//return [];
	//}

	//export function updateMembers(LDSMemberData: LDSMember[]): void {

		//if(!LDSMemberData) return;

		//// 0. ensure we have members
		//if(!members)
			//members = getMembers();

		//// 1. Update current members
		//members.forEach((member: Member, memberIndex: number) => {

			//LDSMemberData.forEach((ldsMember: LDSMember, ldsMemberIndex: number) => {
				//if(ldsMember.name != member.name) return;
				//member.loadLDSData(ldsMember);
			//});
		//});

		//// 2. Add new unrecognized members
		//LDSMemberData.forEach((ldsMember: LDSMember, i) => {
			//if(!members) throw "Members were not loaded appropriately";
			//// Use the current ldsMember to look up the corresponding member in our records
			//let member: Member | undefined = members.reduce((result: Member | undefined, curMember: Member, i, a) => {
				//if(ldsMember.name == curMember.name) result = curMember;
				//return result;
			//}, undefined);

			//let isNewMember: boolean = member == undefined;

			//if(!isNewMember) return;

			//member = new Member(null);
			//member.loadLDSData(ldsMember);

			//members.push(member);
		//});

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
	//}

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
