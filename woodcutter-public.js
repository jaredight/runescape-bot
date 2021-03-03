// import robotjs library pls...
var robot = require("robotjs");
var basic = require('./basic-functions.js');
var game = require('./game.js');

function main() {
    console.log("Starting...");
    basic.sleep(6000); // 4000 ms = 4 seconds
    game.openBackpack();
    var numLogs = dropLogs();
    
    while(numLogs<3) { 

        var tree = findTree();
        //if we can't find a tree, write an error message and exit the loop
        if (tree == false) {
            basic.rotateCamera();
        } else {
            robot.moveMouse(tree.x, tree.y);
            robot.mouseClick();
            basic.sleep(3000);
            numLogs += dropLogs();
            console.log(numLogs);
        }
    }
    console.log("Done!");
}



function dropLogs() {
    var inventory_x2 = 1477;
    var inventory_y2 = 621;
    
    var pixel_color = robot.getPixelColor(inventory_x2, inventory_y2);
    var log_color = '654723';
    var oak_log_color = 'a58256';

    //wait to see if we have a log in the inventory
    var max_wait_time = 20000;
    wait_cycle = 1000;
    var curr_wait_time = 0
    while ((pixel_color != log_color) && (pixel_color != oak_log_color) && (curr_wait_time < max_wait_time)) {
        basic.sleep(wait_cycle);
        pixel_color = robot.getPixelColor(inventory_x2, inventory_y2);
        curr_wait_time += wait_cycle;
    }
    //if we do have a log in inventory, drop the log and return that we dropped it
    if (pixel_color == log_color || pixel_color == oak_log_color) {
        game.selectNthOption(inventory_x2,inventory_y2, 2);
        basic.sleep(2000);
        return 1;
    }
    return 0;
}



function findTree() {
    var start_x = 50, start_y = 100, width = 1300, height = 550;
    var num_unconfirmed_trees = 0;
    var img = robot.screen.capture(start_x, start_y, width, height);
    var tree_colors = ["55411e", "74592a", "3d2b16", "715129", "74532a", "2f210f"];
    for (var i = 0; i < 1000; i++) {
        var random_x = basic.getRandomInt(0,width - 1);
        var random_y = basic.getRandomInt(0, height - 1);
        var sample_color = img.colorAt(random_x, random_y);
        if (tree_colors.includes(sample_color)) {
            var screen_x = random_x + start_x;
            var screen_y = random_y + start_y;
            if (confirmTree(screen_x, screen_y)) {
                console.log("found a tree at: " + screen_x + " and " + screen_y);
                num_unconfirmed_trees = 0;
                return {x: screen_x, y: screen_y};
            } 
            else {
                num_unconfirmed_trees++;
                console.log("unconfirmed tree at: " + screen_x + " and " + screen_y);
            }
            if (num_unconfirmed_trees > 5){
                console.log("5 trees unconfirmed in a row. rotating screen.");
                return false;
            }
        }
    }
    //did not find a color in the screenshot
    return false;
}



function confirmTree(screen_x, screen_y) {
    robot.moveMouse(screen_x, screen_y);
    basic.sleep(500);
    lenToCheck = 50
    startValue = 70
    totalCyan = 0
    lineToCheck = robot.screen.capture(startValue, 37, lenToCheck, 1);
    for (i = 0; i < lenToCheck; i++) {
        [r,g,b] = basic.hexToRGB(lineToCheck.colorAt(i,0));
        if (r < 30 && g > 180 && b > 180) {
            totalCyan++
        }
    }
    return (totalCyan > 12);
}

//main();
