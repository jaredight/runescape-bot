// import robotjs library pls...
var robot = require("robotjs");
var basic = require('./basic-functions.js');

module.exports = {
    
    selectNthOption: function(x,y,n) {
        robot.moveMouse(x,y);
        robot.mouseClick('right');
        basic.sleep(200);
        robot.moveMouseSmooth(x, y + (15*(n+1)));
        robot.mouseClick();
    },

    openBackpack: function() {
        console.log("opening backpack...");
        this.openNthIcon(4);
    },

    openNthIcon: function(n) {
        if (!(0<n<14)) {
            console.log("parameter must be between 1 and 13 inclusive");
            return false;
        }
        var icon_x = 1174 + (33*(n-1));
        var icon_y = 826;
        const redColor = '6b241b';
        const grayColor = '7c715e';
        var iconColor = robot.getPixelColor(icon_x, icon_y);

        if (iconColor == redColor) {
            console.log("icon already open");
            return true;
        }  else if (iconColor == grayColor) {
            robot.moveMouse(icon_x + 5, icon_y + 5);
            robot.mouseClick();
            basic.sleep(300);
            console.log("Opened " + n + "th icon");
            return true;
        }   else {
            console.log("could not open icon");
            console.log("pixel color: " + iconColor);
            return false;
        }
    }
}