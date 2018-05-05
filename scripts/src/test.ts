
/// <reference path="../../node_modules/tsgast/index" />
//
import {authorize} from './auth'
import {deploy} from './deploy'
import {google} from 'googleapis'
import * as googleAuth from 'google-auth-library'

const SCRIPT: any = google.script('v1');
const TEST_FUNCTION: string = "runGasTests"
const SCRIPTID: string = "";

async function runTests(authClient: googleAuth.OAuth2Client, scriptId: string): Promise<any> {

	let requestBody = {
		function: TEST_FUNCTION,
		devMode: true
	};
	
	let request = {
		auth: authClient,
		scriptId: scriptId,
		resource: requestBody
	};

	let testResponse: any | undefined = undefined;
	console.log("Running tests");
	let asyncRun: Function = () => {
		return new Promise<string>(resolve => {
			SCRIPT.scripts.run(request, (err: Error, response: any): void => {
				if(err) throw `Failed to run the script: ${err}`;
		
				testResponse = response;
				resolve(testResponse);
			});
		});
	};
	return await asyncRun();
}

function handleResponse(requestResponse: any): void {

	let data = requestResponse.data;

	let done: boolean = data.done;
	if(!done) {
		console.error("Failed to finish: Done is false");
		return process.exit(1);
	}

	let error: any | undefined = data.error;
	let response: any | undefined = data.response;

	if(error) {
		console.log("ERROR");
		console.error(error);
		console.log("DETAILS");
		error.details.forEach((detail: any) => {
			detail.scriptStackTraceElements.forEach((sste: any) => {
				let objDetails: string = JSON.stringify(sste, null, 4);
				console.log(objDetails);
			});
		});
		return process.exit(1);
	}

	if(!response) {
		console.error("No response");
		return process.exit(1);
	}

	let summary: any = response.result;
	let log: string = summary.log;

	let results: tapResults = summary.results;
	let nFailures: number = results.nFailed;

	if(nFailures != 0) {
		console.log(log);
		console.error(`${nFailures} failures occured`);
		return process.exit(1);
	}

	return console.log(log);
}

async function start(): Promise<void> {
	console.log("Starting testing...");

	console.log("Obtaining authorization...");

	let authClient: googleAuth.OAuth2Client = await authorize();
	let scriptId: string = "1EOOHAZeYLB_xTfk9ZAgTLW596vzLA0CgOJ191l_4Nw7kH7USvNzyF-Ej";

	console.log("calling deploy function...");
	await deploy(authClient, scriptId);

	console.log("calling run function...");
	let response: any = await runTests(authClient, scriptId);

	handleResponse(response);
}
start();
