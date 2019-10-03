const ffi = require("ffi")
const colors = require('colors');
const moment = require('moment');
moment().format();
//dont know if this is needed

// Define the functions from the DLL
const wootingRgb = ffi.Library('./libs/wooting-rgb-sdk.dll', {
	"wooting_rgb_kbd_connected": [ 'bool', [] ],
	"wooting_rgb_reset": [ 'bool', [] ],
	"wooting_rgb_array_update_keyboard": [ 'bool', [] ],
	"wooting_rgb_direct_set_key": [ 'bool', ['uint8', 'uint8', 'uint8', 'uint8', 'uint8'] ],
	"wooting_rgb_direct_reset_key": [ 'bool', ['uint8', 'uint8'] ],
	"wooting_rgb_array_set_single": [ 'bool', ['uint8', 'uint8', 'uint8', 'uint8', 'uint8'] ]
});

colors.setTheme({
	error    : ["red", "underline"],
	function : ["green", "bold"],
	input    : ["cyan"],
	debug    : ["yellow", "bold"]
});

const keyboardConnected = wootingRgb.wooting_rgb_kbd_connected();

//Sets the keyboard to a white color.
for (let row = 0; row < 6; row++) {
	for (let column = 0; column < 21; column++) {
		wootingRgb.wooting_rgb_array_set_single(row, column, 255, 255, 255);
	}
}

//Updates the keyboard to be white
wootingRgb.wooting_rgb_array_update_keyboard()

//Checks if the keyboard is connected, then runs the rest of the program (if it is conneceted).
if (!keyboardConnected) {
	console.log("Keyboard not connected".error);
}
else {
	//Disgustingly large object with the key coordinates
	const keySettingsArray = [[1,11],[2,10],[3,9],[4,9],[2,9],[3,8],[4,8],[1,8],[2,7],[3,6],[4,6],[2,6],[3,5],[4,5],[1,5],[2,4],[3,3],[4,3],[3,2],[4,2]];

	//Disgustingly large object with the time colors
	const colorSettingsArrayOn = [[0,0,255],[0,255,0],[255,0,0]];
	const colorSettingsArrayOff = [[127,127,255],[127,255,127],[255,127,127]];

	//Sets the keyboard to automatically updates after each change, might make it only do it at the end later.
	//wooting_rgb_array_auto_update(true);

	//start the clock here
	setInterval(() => {
		//Generates the arrays for each column using moment to find real time, then converts to a binary array
		let binaryArraySecondDigit = ((""+(parseInt((moment().second()%10).toString(2)))).split('').map(Number));
		let binaryArraySecondTens = (""+(parseInt((Math.floor(moment().second()/10)).toString(2)))).split('').map(Number);
		let binaryArrayMinuteDigit = ((""+(parseInt((moment().minute()%10).toString(2)))).split('').map(Number));
		let binaryArrayMinuteTens = (""+(parseInt((Math.floor(moment().minute()/10)).toString(2)))).split('').map(Number);
		let binaryArrayHourDigit = ((""+(parseInt((moment().hour()%10).toString(2)))).split('').map(Number));
		let binaryArrayHourTens = (""+(parseInt((Math.floor(moment().hour()/10)).toString(2)))).split('').map(Number);

		//Checks to make sure each array is at the correcnt length, otherwise it adds zeroes to the front.
		while (binaryArraySecondDigit.length < 4)
		{
			binaryArraySecondDigit.unshift(0);
		}

		while (binaryArraySecondTens.length < 3)
		{
			binaryArraySecondTens.unshift(0);
		}

		while (binaryArrayMinuteDigit.length < 4)
		{
			binaryArrayMinuteDigit.unshift(0);
		}

		while (binaryArrayMinuteTens.length < 3)
		{
			binaryArrayMinuteTens.unshift(0);
		}

		while (binaryArrayHourDigit.length < 4)
		{
			binaryArrayHourDigit.unshift(0);
		}

		while (binaryArrayHourTens.length < 2)
		{
			binaryArrayHourTens.unshift(0);
		}

		//Turns the seperate arrays into a large combined array.
		let binaryArrayFull = binaryArraySecondDigit.concat(binaryArraySecondTens, binaryArrayMinuteDigit, binaryArrayMinuteTens, binaryArrayHourDigit, binaryArrayHourTens);

		//Sets the colors on the keyboard
		for(let i = 0; i < binaryArrayFull.length; i++)
		{
			if (binaryArrayFull[i])
			{
				//If it is a one

				//Checks the current array index to determine if it is seconds (0-6), minutes (7-13), or hours (14-19)
				if (0 <= i <= 6)
				{
					//Seconds
					wootingRgb.wooting_rgb_array_set_single(keySettingsArray[i][0]/*Row*/, keySettingsArray[i][1]/*Column*/, colorSettingsArrayOn[0][0]/*Red*/, colorSettingsArrayOn[0][1]/*Green*/, colorSettingsArrayOn[0][2]/*Blue*/);
				}
				else if (7 <= i <= 13)
				{
					//Minutes
					wootingRgb.wooting_rgb_array_set_single(keySettingsArray[i][0]/*Row*/, keySettingsArray[i][1]/*Column*/, colorSettingsArrayOn[1][0]/*Red*/, colorSettingsArrayOn[1][1]/*Green*/, colorSettingsArrayOn[1][2]/*Blue*/);
				}
				else if (14 <= i <= 19)
				{
					//Hours
					wootingRgb.wooting_rgb_array_set_single(keySettingsArray[i][0]/*Row*/, keySettingsArray[i][1]/*Column*/, colorSettingsArrayOn[2][0]/*Red*/, colorSettingsArrayOn[2][1]/*Green*/, colorSettingsArrayOn[2][2]/*Blue*/);
				}
			}
			else
			{
				//If it is a zero
				
				//Checks the current array index to determine if it is seconds (0-6), minutes (7-13), or hours (14-19)
				if (0 <= i <= 6)
				{
					//Seconds
					wootingRgb.wooting_rgb_array_set_single(keySettingsArray[i][0]/*Row*/, keySettingsArray[i][1]/*Column*/, colorSettingsArrayOff[0][0]/*Red*/, colorSettingsArrayOff[0][1]/*Green*/, colorSettingsArrayOff[0][2]/*Blue*/);
				}
				else if (7 <= i <= 13)
				{
					//Minutes
					wootingRgb.wooting_rgb_array_set_single(keySettingsArray[i][0]/*Row*/, keySettingsArray[i][1]/*Column*/, colorSettingsArrayOff[1][0]/*Red*/, colorSettingsArrayOff[1][1]/*Green*/, colorSettingsArrayOff[1][2]/*Blue*/);
				}
				else if (14 <= i <= 19)
				{
					//Hours
					wootingRgb.wooting_rgb_array_set_single(keySettingsArray[i][0]/*Row*/, keySettingsArray[i][1]/*Column*/, colorSettingsArrayOff[2][0]/*Red*/, colorSettingsArrayOff[2][1]/*Green*/, colorSettingsArrayOff[2][2]/*Blue*/);
				}
			}
		}

		//Updates the keyboard
		//might add / remove if it makes sense
		wootingRgb.wooting_rgb_array_update_keyboard()
	}, 1000);
}

// Make sure the lights go back to normal after process exits
process.on('exit', (code) => {
	wootingRgb.wooting_rgb_reset()
});
