/*
 * auth.js
 * This file is responsibile for generating an authentication object
 * that can be used to deploy the script.
 */

import * as googleAuth from 'google-auth-library'
import { Credentials } from '../../node_modules/google-auth-library/build/src/auth/credentials';
import * as fs from 'fs'
import * as rls from 'readline-sync'

// Global Variables
let SECRETS_PATH: string = "../client_secrets.json";
let TOKEN_DIR: string = "../";
let TOKEN_PATH: string = TOKEN_DIR + '/token.json';
let SCOPES: string[] = [
    "https://www.googleapis.com/auth/script.projects",
    "https://www.googleapis.com/auth/script.deployments",
    "https://www.googleapis.com/auth/script.external_request",
    "https://www.googleapis.com/auth/spreadsheets",
	"https://mail.google.com/"
];

async function authorize(): Promise<googleAuth.OAuth2Client> {

	console.log("Reading secrets file");
	let secrets_content = fs.readFileSync(SECRETS_PATH);
	let clientCredentials: ICredentials = JSON.parse(secrets_content.toString());

	return await authorizeClientAccount(clientCredentials);
}

async function authorizeClientAccount(credentials: ICredentials): Promise<googleAuth.OAuth2Client> {
    console.log("Authorizing Client Account...");
    let clientSecret: string = credentials.installed.client_secret;
    let clientId: string = credentials.installed.client_id;
    let redirectUrl: string = credentials.installed.redirect_uris[0];
    let authClient: googleAuth.OAuth2Client = new googleAuth.OAuth2Client(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    console.log("Reading Token file..");
	let token: Buffer;
	try {
		console.log("reading token...");
		token = fs.readFileSync(TOKEN_PATH);
		authClient.credentials = JSON.parse(token.toString());
	}
	catch(err) {
		console.log("no token found.");
		await getNewToken(authClient);
	}
		
	return authClient;
}

async function getNewToken(client: googleAuth.OAuth2Client): Promise<{}> {
    console.log("Getting a new token");
    let urlOptions = {
        access_type: 'offline',
        scope: SCOPES
    };

    let authUrl: string = client.generateAuthUrl(urlOptions);

    console.log('Authorize this app by visiting this url: ', authUrl);

	let code: string = rls.question("Enter the code from that page here: ");

	let tokenStored: boolean = false;
	console.log("Obtaining token from client API...");
	let getTokenAsync: Function = (): Promise<boolean> => {
		return new Promise(resolve => {
			client.getToken(code, (err, token): void => {
				if (err) throw `Error while trying to retrieve access token: ${err}`;
				
				if(token) {
					client.credentials = token;
					console.log("Storing token...");
					storeToken(token);
					tokenStored = true;
					console.log("Token stored");
					resolve(true);
				}
			});
		});
	};
	await getTokenAsync();
	console.log("Waiting for token to be stored...");
	while(!tokenStored){}
	return await new Promise(resolve => {resolve(0);});
}

function storeToken(token: Credentials): void {
    try {
        fs.mkdirSync(TOKEN_DIR);
    }
    catch (err) {
        if(err.code != 'EEXIST') throw err;
    }

    fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
	return;
}

export {authorize}
