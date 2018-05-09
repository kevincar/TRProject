/*
 * Filename: LDSApi.ts
 * Author: Kevin Davis
 *
 * Description
 * Holds the API for querying the LDS data
 */

namespace LDSApi {
	const recordsURL = "https://www.lds.org/mls/mbr/services/recommend/recommend-status-new?lang=eng&unitNumber=374539";
	export function getRecordData(): LDSTRRecord[] {

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

		let responseContent = UrlFetchApp.fetch(recordsURL, options).getContentText();

		let recordsObject: LDSTRRecord[];
		try {
			recordsObject = JSON.parse(responseContent);
		}
		catch(e) {
			Logger.log("ObSSOCookie out of date");
			return new Array();
		}

		return recordsObject;
	}
}

