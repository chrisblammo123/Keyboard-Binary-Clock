const ffi = require("ffi")
const colors = require('colors');

// Define the functions from the DLL
const wootingRgb = ffi.Library('./libs/wooting-rgb-sdk.dll', {
  "wooting_rgb_kbd_connected": [ 'bool', [] ],
  "wooting_rgb_reset": [ 'bool', [] ],
  "wooting_rgb_direct_set_key": [ 'bool', ['uint8', 'uint8', 'uint8', 'uint8', 'uint8'] ],
  "wooting_rgb_direct_reset_key": [ 'bool', ['uint8', 'uint8'] ],
});

colors.setTheme({
	error    : ["red", "underline"],
	function : ["green", "bold"],
	input    : ["cyan"],
	debug    : ["yellow", "bold"]
});

const keyboardConnected = wootingRgb.wooting_rgb_kbd_connected()

const updateTime = (curentTime) => {

};

if (!keyboardConnected) {
  console.log("Keyboard not connected".error);
}
else {
  //const clockOn = 255;
  //const clockOff = 127;
  const keySettings = {
    secondOnesDigit: {
      row: 4,
      column: 9
    },
    secondTwosDigit: {
      row: 3,
      column: 9
    },
    secondFoursDigit: {
      row: 2,
      column: 10
    },
    secondEightsDigit: {
      row: 1,
      column: 11
    },
    secondOnesTens: {
      row: 4,
      column: 8
    },
    secondTwosTens: {
      row: 3,
      column: 8
    },
    secondFoursTens: {
      row: 2,
      column: 9
    },
    minuteOnesDigit: {
      row: 4,
      column: 6
    },
    minuteTwosDigit: {
      row: 3,
      column: 6
    },
    minuteFoursDigit: {
      row: 2,
      column: 7
    },
    minuteEightsDigit: {
      row: 1,
      column: 8
    },
    minuteOnesTens: {
      row: 4,
      column: 5
    },
    minuteTwosTens: {
      row: 3,
      column: 5
    },
    minuteFoursTens: {
      row: 2,
      column: 6
    },
    hourOnesDigit: {
      row: 4,
      column: 3
    },
    hourTwosDigit: {
      row: 3,
      column: 3
    },
    hourFoursDigit: {
      row: 2,
      column: 4
    },
    hourEightsDigit: {
      row: 1,
      column: 5
    },
    hourOnesTens: {
      row: 4,
      column: 2
    },
    hourTwosTens: {
      row: 3,
      column: 2
    }
  };

  const colorSettings = {
    second: {
      on: {
        red: 0,
        green: 0,
        blue: 255
      },
      off: {
        red: 127,
        green: 127,
        blue: 255
      }
    },
    minute: {
      on: {
        red: 0,
        green: 255,
        blue: 0
      },
      off: {
        red: 127,
        green: 255,
        blue: 127
      }
    },
    hour: {
      on: {
        red: 255,
        green: 0,
        blue: 0
      },
      off: {
        red: 255,
        green: 127,
        blue: 127
      }
    }
  };

  //start the clock here











}
