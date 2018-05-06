/*
 * Filename: LDSApi.ts
 * Author: Kevin Davis
 *
 * Description
 * Holds the API for querying the LDS data
 */

namespace LDSApi {
	const membersURL = "https://www.lds.org/mls/mbr/services/report/member-list?lang=eng&unitNumber=374539";
	export function getMemberData(): LDSMember[] {

		let SMSettings: ISetting = SettingsManager.getSettings();
		let ObSSOCookie: string = SMSettings.ObSSOCookie;

		if(ObSSOCookie == null) {
			Logger.log("ObSSOCookie not set in settings");
			return new Array();
		}

		let headers: object = {
			"Cookie": `ObSSOCookie=${ObSSOCookie}`
		};

		let options: object = {
			"headers": headers
		};

		let responseContent = UrlFetchApp.fetch(membersURL, options).getContentText();

		let memberObject: LDSMember[];
		try {
			memberObject = JSON.parse(responseContent);
		}
		catch(e) {
			Logger.log("ObSSOCookie out of date");
			return new Array();
		}

		return memberObject;
	}
}

