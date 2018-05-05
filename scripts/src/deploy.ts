/*
 * deploy.ts
 *
 * Runs the deployment script
 */

/// <reference path="./types/deploy" />

import * as fs from 'fs'
import {google} from 'googleapis'
import * as googleAuth from 'google-auth-library'
const SCRIPT: any = google.script('v1');
const SOURCE_FILE: string = "../tests/dist/main.js"

async function deploy(authClient: googleAuth.OAuth2Client, scriptId: string): Promise<void> {
	let result = await updateScript(authClient, scriptId);
	if(!result) throw "Failed to deploy";
	return;
}

async function getManifestFile(authClient: googleAuth.OAuth2Client, scriptId: string): Promise<ScriptFile> {

	let manifestFile: ScriptFile | undefined = undefined;

	let options = {
		auth: authClient,
		scriptId: scriptId
	};
	console.log("obtaining manifest file");
	
	let asyncGetManifsetFile: Function = (): Promise<ScriptFile> => {
		return new Promise(resolve => {
			SCRIPT.projects.getContent(options, (err: Error, response: any): void => {
				if(err) throw `Error getting project content: ${err}`;
		
				let files: ScriptFile[] = response.data.files; let potentialManifest:
				ScriptFile[] = files.filter((file: ScriptFile)=>{return file.name == 'appsscript';});
				if(potentialManifest.length < 1) throw `Failed to obtain the project manifest`;
				manifestFile = potentialManifest[0];
				resolve(manifestFile);
				console.log("retrieved the manifest file!");
			});
		});
	};
	return await asyncGetManifsetFile();
}

async function updateScript(authClient: googleAuth.OAuth2Client, scriptId: string): Promise<boolean> {

	let sourceCode: string = fs.readFileSync(SOURCE_FILE).toString();
	let manifestFile: ScriptFile = await getManifestFile(authClient, scriptId);

	let file: ScriptFile = {
		"name": "main",
		"type": FileType.SERVER_JS,
		"source": sourceCode
	};

	let requestBody = {
		files: [
			manifestFile,
			file
		]
	};

	let request = {
		auth: authClient,
		scriptId: scriptId,
		resource: requestBody
	};

	let result: boolean | undefined = undefined;
	console.log("Updating  script");
	let asyncUpdateContent: Function = () => {
		return new Promise<boolean>(resolve => {
			SCRIPT.projects.updateContent(request, (err: Error, response?: any): void => {
				if(err) throw `Error updating content: ${err}`;
				result = true;
				resolve(result);
			});
		});
	};
	return await asyncUpdateContent();
}

interface ScriptFile {
  "name": string,
  "type": FileType,
  "source": string,
  "lastModifyUser"?: User
  "createTime"?: string,
  "updateTime"?: string,
  "functionSet"?: FunctionSet
}

enum FileType {
    ENUM_TYPE_UNSPECIFIED = 0,
    SERVER_JS,
    HTML,
    JSON,
}

export {deploy}
