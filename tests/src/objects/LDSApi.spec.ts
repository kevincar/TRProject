/*
 * Filename: LDSApi.spec.ts
 * Author: Kevin Davis
 *
 * Description
 * The test script for the LDSApi namespace
 */

function LDSApiTest(tap: GasTap): void {
	tap.test("getMemberData", (t: test): void => {
		let members: LDSMember[] = LDSApi.getMemberData();
	});
}
