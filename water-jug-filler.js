// BEFORE RUNNING THIS CODE, ENSURE CHARACTER CAN SEE BANK BOX. EMPTY JUGS SHOULD BE IN THE FIRST INVENTORY SPOT.
//BOT DOES NOT HAVE FUNCTIONALITY TO ENTER BANK PIN.
var robot = require("robotjs");
var basic = require('./basic-functions.js');
var game = require('./game.js');

function main() {
    console.log("Starting water jug filler...");
    basic.sleep(6000); // 4000 ms = 4 seconds
    game.openBackpack();
    
    while(true) {
        //open bank chest
        var chest = findBankChest();
        robot.moveMouse(chest.x, chest.y);
        robot.mouseClick();
        basic.sleep(800);
        
        //deposit and withdraw jugs
        emptyBackpack();
        basic.sleep(1200);
        withdraw1400Items();
        basic.sleep(900);
        closeBank();
        basic.sleep(1500);

        //select a jug to use on sink
        var inventory_x1 = 1435;
        var inventory_y1 = 580;
        robot.moveMouse(inventory_x1, inventory_y1);
        robot.mouseClick();
        basic.sleep(700);

        //use jug on sink and wait for jugs to fill up
        sink = findSink();
        robot.moveMouse(sink.x, sink.y);
        robot.mouseClick();
        basic.sleep(18000);
    }
    console.log("done!");
}

function findBankChest() {
    var start_x = 50, start_y = 100, width = 1300, height = 550;
    var chestColors = ['543d14', '412e09', '3d2c0f', '49340a', '4e360c'];
    while (true) {
        var img = robot.screen.capture(start_x, start_y, width, height);
        var numUnconfirmedChests = 0;
        for (var i = 0; i < 1000; i++) {
            var random_x = basic.getRandomInt(0,width - 1);
            var random_y = basic.getRandomInt(0, height - 1);
            var sampleColor = img.colorAt(random_x, random_y);
            if (chestColors.includes(sampleColor)) {
                var screen_x = random_x + start_x;
                var screen_y = random_y + start_y;
                numUnconfirmedChests ++;
                basic.sleep(4000);
                console.log("chest color: " + sampleColor);
                if (confirmBankChest(screen_x, screen_y)) {
                    console.log("found chest at: " + screen_x + " and " + screen_y);
                    numUnconfirmedChests = 0;
                    return {x: screen_x, y: screen_y};
                } 
                if (numUnconfirmedChests > 5) {
                    i = 1000;
                }
            }
        }
        basic.rotateCamera();
    }
}

function confirmBankChest(screen_x, screen_y) {
    robot.moveMouse(screen_x, screen_y);
    basic.sleep(500);
    lenToCheck = 90
    startValue = 30
    totalCyan = 0
    lineToCheck = robot.screen.capture(startValue, 37, lenToCheck, 1);
    for (i = 0; i < lenToCheck; i++) {
        [r,g,b] = basic.hexToRGB(lineToCheck.colorAt(i,0));
        if (r < 30 && g > 180 && b > 180) {
            totalCyan++
        }
    }
    return (totalCyan > 32);
}

function emptyBackpack() {
    var backpackButton_x = 875;
    var backpackButton_y = 672;
    robot.moveMouse(backpackButton_x, backpackButton_y);
    basic.sleep(500);
    robot.mouseClick();
}

function withdraw1400Items() {
    var bank_item_x1 = 515;
    var bank_item_y1 = 120;
    game.selectNthOption(bank_item_x1, bank_item_y1, 4);
    basic.sleep(500);
}

function closeBank() {
    closeButton_x = 915;
    closeButton_y = 42;
    robot.moveMouse(closeButton_x, closeButton_y);
    basic.sleep(500);
    robot.mouseClick();
    basic.sleep(500);
}

function findSink() {
    var start_x = 50, start_y = 100, width = 1300, height = 550;
    var sinkColors = ['514949', '4f4747', '4c4545', '5e5655'];
    while (true) {
        var img = robot.screen.capture(start_x, start_y, width, height);
        var numUnconfirmedSinks = 0;
        for (var i = 0; i < 1000; i++) {
            var random_x = basic.getRandomInt(0,width - 1);
            var random_y = basic.getRandomInt(0, height - 1);
            var pixelColor = img.colorAt(random_x, random_y);
            if (sinkColors.includes(pixelColor)) {
                var screen_x = random_x + start_x;
                var screen_y = random_y + start_y;
                numUnconfirmedSinks ++;
                console.log("sink color: " + pixelColor);
                console.log(numUnconfirmedSinks);
                if (confirmSink(screen_x, screen_y)) {
                    console.log("found sink at: " + screen_x + " and " + screen_y);
                    console.log(pixelColor);
                    num_unconfirmed_sinks  = 0;
                    return {x: screen_x, y: screen_y};
                } 
            }
            if (numUnconfirmedSinks > 5) {
                i = 1000;
            }
        }
        basic.rotateCamera();
    }
}

function confirmSink(screen_x, screen_y) {
    robot.moveMouse(screen_x, screen_y);
    basic.sleep(500);
    lenToCheck = 115
    startValue = 75
    totalCyan = 0
    lineToCheck = robot.screen.capture(startValue, 37, lenToCheck, 1);
    for (i = 0; i < lenToCheck; i++) {
        [r,g,b] = basic.hexToRGB(lineToCheck.colorAt(i,0));
        if (r < 30 && g > 180 && b > 180) {
            totalCyan++
        }
    }
    return (totalCyan > 38);
}

main();
