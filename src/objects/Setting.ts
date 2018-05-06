/*
 * Filename: Setting.ts
 * Author: Kevin Davis
 *
 * Description
 * This object defines the settings of the project
 */


class Setting extends SheetObject {
	name: string | null = null;
	value: any | null = null;

	constructor(data?: SheetObjectInterface | null) {
		super();
		if(!data) return;

		this.name = data["Name"];
		this.value = data["Value"];
	}
}
