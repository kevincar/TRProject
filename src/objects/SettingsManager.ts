/*
 * Filename: SettingsManager.ts
 * Author: Kevin Davis
 *
 * Description
 * This file defines the Settings Manager used to manage the project settings
 */

namespace SettingsManager {
	let settings: ISetting | null = null; 

	export function getSettings(): ISetting {
		if(settings) return settings;

		let spreadsheet: Spreadsheet = new Spreadsheet();
		let settingsSheet: Sheet = new Sheet(spreadsheet, "Settings");
		let sod = new SheetObjectDictionary(Setting, settingsSheet);
		let settingObjects = sod.translate();

		settingObjects.forEach((setting: Setting): void => {
			if(settings == null) settings = {};
			if(setting.name == null) return;
			settings[setting.name] = setting.value;
		});

		if(settings == null) throw "Settings not found!";
		return settings;
	}
}
