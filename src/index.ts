/*
 * Filename: index.ts
 * Author: Kevin Davis
 * 
 * Description
 * Start point
 */

/// <reference path="../node_modules/gsheetsts/index.d.ts" />
if(typeof(SheetObject) == 'undefined') {
	eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/kevincar/GSheetsTS/master/index.js').getContentText());
}

function main(): void {
	Logger.log("Hello, World");
}
