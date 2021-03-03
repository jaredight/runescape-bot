// import robotjs library pls...
var robot = require("robotjs");
var basic = require('./basic-functions.js');

module.exports = {

    faceNorth: function() {
        var compass_x = 1440;
        var compass_y = 45;
        robot.moveMouse(compass_x, compass_y);
        basic.sleep(20);
        robot.mouseClick();
        basic.sleep(15);
    },

    faceDirection: function(direction='N') {
        //900ms ~ 90 degree rotation
        if (direction == 'N') {
            this.faceNorth();
        }
        else if (direction == 'E') {
            this.faceNorth();
            basic.rotateCamera(890, false, 'left');
        }
        else if (direction == 'S') {
            this.faceNorth();
            basic.rotateCamera(1780, false, 'left');
        }
        else if (direction == 'W') {
            this.faceNorth();
            basic.rotateCamera(890, false, 'right');
        }
    },

    countColors: function(color='cyan', start_x=0, start_y=0, width=250, height=45) {
        var numColor = 0;
        img = robot.screen.capture(start_x, start_y, width, height);
        for (var i=0; i<width; i++) {
            for(var j=0; j<height; j++) {
                var pixelColor = img.colorAt(i,j);
                [r,g,b] = basic.hexToRGB(pixelColor);
                //console.log(r + g + b);
                if (190<r<210 && 100<g<120 && 40<b<60 && color=='orange') {
                    //colorList.push(pixelColor); use this if you need to get the list of cyan colors.
                    numColor++;
                }
                if (r < 30 && g > 180 && b > 180 && color=='cyan') {
                    numColor++;
                }
            }            
        }
        return numColor;
    },

    selectInventory_1_1: function() {
        var inventory_x1 = 1435;
        var inventory_y1 = 580;
        robot.moveMouse(inventory_x1, inventory_y1);
        robot.mouseClick();
        basic.sleep(700);
    },
    
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
    },

    closeNthIcon: function(n) {
        if (!(0<n<14)) {
            console.log("parameter must be between 1 and 13 inclusive");
            return false;
        }
        var icon_x = 1174 + (33*(n-1));
        var icon_y = 826;
        const redColor = '6b241b';
        const grayColor = '7c715e';
        var iconColor = robot.getPixelColor(icon_x, icon_y);

        if (iconColor == grayColor) {
            console.log("icon already closed");
            return true;
        }  else if (iconColor == redColor) {
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