var robot = require("robotjs");
var basic = require('./basic-functions.js');
var game = require('./game.js');

let roofColors = [
    '4f4f4f', '6b6b6b', '333333', '4a4a4a', '626262', '616161',
    '545454', '6a6a6a', '5d5d5d', '505050', '6d6d6d', '6c6c6c',
    '6e6e6e', '5e5e5e', '535353', '323232', '484848', '717171',
    '555555', '636363', '656565', '676767', '434343', '5c5c5c',
    '565656', '696969', '2f2f2f', '525252', '5f5f5f', '606060',
    '3c3c3c', '515151', '2c2c2c', '575757', '595959', '727272',
    '4e4e4e', '5b5b5b', '464646', '4d4d4d', '454545', '404040',
    '5a5a5a', '585858', '474747', '272727', '282828', '3a3a3a',
    '292929', '444444', '3d3d3d', '3b3b3b', '463821', '43361f',
    '392b1a', '424242', '392e1a', '362b19', '2a2a2a', '3d301b',
    '2b2214', '271f13', '251d11', '211a0e', '1d170c', '4c4c4c',
    '19130a', '4c3923', '3e3e3e', '2d2d2d', '494949', '2b2b2b',
    '646464', '322617', '4b4b4b', '3f3f3f', '40341e', '6a5031',
    '414141', '6d5232', '767676', '2e2e2e', '140f09', '0f0c07',
    '6f6f6f', '35302f', '2f2303', '1f1300', '5e472c', '373131'
  ];
  let wallColors = [
    '2a2413', '292312', '3a3423', '3a3322',
    '282212', '272111', '312c1c', '453019',
    '413c2c', '1f1912', '1f1911', '3d382a',
    '322311', '110c05', '201a12', '373121',
    '262111', '160f07', '3a3323', '332e1d',
    '2d2816', '211b13', '2f2a17', '332f1e',
    '2f210f', '402e17', '35301e', '312b18',
    '342f1e', '393322', '272212', '3d3829',
    '403a2b', '1e1911', '423d2d', '383222',
    '322d1d', '2e2916', '3c3524', '302b17',
    '302c1c'
  ];
  let darkWallColors = [
    '1a170c', '15110c', '272217', '282318', '16120c', '1c180c',
    '1f1c0f', '1b170c', '2a271d', '201c0f', '1c180d', '16120d',
    '221f13', '2b271d', '282418', '242115', '221f14', '231f14',
    '211d10', '1d190d', '292418', '1d180d', '221e10', '292519',
    '252115', '17120d', '2d291f', '232014', '2a2519', '262216',
    '252215', '231f11', '1e190d', '2b281d', '2d291e', '17130d',
    '221e13', '2e2b1f', '1e1a0d', '302c21', '2e2a1f', '2b261a',
    '242011', '18130d', '18130e', '1f1a0e', '241f11', '18140e',
    '1f1b0e', '272317', '252012', '242015', '262316', '322d22',
    '272316', '2d281b', '322e22', '2f2b20', '312d21', '252112',
    '2b2619', '2c271a', '282417', '332f23', '201b0e', '262212',
    '1a150f', '343024', '211c0f', '272313', '2b2719', '221d0f',
    '19140e', '292518', '2f2a1c', '211d0f', '343023', '2f291c',
    '201c0e', '282313', '262112', '302a1c', '2e291b', '272213',
    '292517', '363125', '2c2719', '312c1d', '1b160f', '383326',
    '282413', '302b1d', '241e10', '1b1610', '322c1e', '241f10',
    '2b2615', '231e10', '292414', '1c1710',
  ];
  let gapColors = [
    '39350e', '3d380f',
    '413d0f', '454011',
    '494413', '4c4713',
    '56681a', '36410f',
    '504a14', '544e14',
    '4a5a17', '4e5e17'
  ];
  let markOfGraceColors = [
    'a08609', 'a48909',
    '7c0f07', '780e07',
    '740e07', '871107',
    'ab8f0a', '800f07',
    '840f07', 'ae920a',
    'a78c09', '8f1109',
    '8b1107', 'a41409',
    'a01409', '9d8409',
    '000e0e'
  ];

function main() {
    console.log("Starting Draynor agility course...");
    basic.sleep(6000); // 4000 ms = 4 seconds
    var numLaps = 0;
    var numMarks = 0;
    startTime = new Date().getTime();

    //here we zoom out and close any open window
    game.openNthIcon(11);
    basic.sleep(700);
    robot.moveMouse(1460,624);
    basic.sleep(700);
    robot.mouseClick();
    basic.sleep(700);
    game.closeNthIcon(11);

    while (numLaps < 340) {
        game.faceDirection('W');
        doObstacle(254, [750,350,120,50], obstacle='climb rough wall');
//        if (findMarkOfGrace(730,325,150,140)) {numMarks ++}
        doObstacle(224, [730,300,70,70], 'tightrope 1', 10000);
//        if (findMarkOfGrace(680,388,187,167)) {numMarks ++}
        doObstacle(224, [750,470,45,45], 'tightrope 2', 10000);
        robot.keyToggle('up','down');
        basic.sleep(1000);
        robot.keyToggle('up','up');
//        if (findMarkOfGrace(750,380,120,140)) {numMarks ++}
        doObstacle(255, [740,380,40,40], 'balance narrow wall', 8000);
        game.faceDirection('S');
//        if (findMarkOfGrace(788,330,51,135)) {numMarks ++}
        doObstacle(116, [730,240,140,130], 'jump up wall', 8000, darkWallColors);
//        if (findMarkOfGrace(630,415,215,45)) {numMarks ++}
        doObstacle(96, [540,500,20,20], 'jump gap', 8000, gapColors);
//        if (findMarkOfGrace(650,440,166,163)) {numMarks ++}
        doObstacle(112, [580,620,60,60], obstacle= 'jump down crate');

        numLaps++;
        console.log('laps done: ' + numLaps);
        currTime = new Date().getTime();
        console.log((currTime - startTime)/60000, ' minutes elapsed');

        game.faceNorth();
        robot.moveMouse(1523,35);
        basic.sleep(100);
        robot.mouseClick();
        basic.sleep(6000);
    }
    console.log("Done!");
}

function doObstacle(numCyanPixels, bounds=[50,100,1300,550], obstacle='obstacle', sleepTime=10000, colorList) {
    startObsTime = new Date().getTime();
    const largeBounds=[50,100,1300,550];
    var numRotations = 0;
    while (numRotations < 5) {
        if (numRotations > 2) {
            bounds = largeBounds;
        }
        var img = robot.screen.capture(bounds[0], bounds[1], bounds[2], bounds[3]);
        for (var i = 0; i < 100; i++) {
            var random_x = basic.getRandomInt(0, bounds[2] - 1);
            var random_y = basic.getRandomInt(0, bounds[3] - 1);
            var sampleColor = img.colorAt(random_x, random_y);
            var inList = false;
            if (!colorList || colorList.includes(sampleColor)) {
                var screen_x = random_x + bounds[0];
                var screen_y = random_y + bounds[1];
                robot.moveMouse(screen_x, screen_y); //here we confirm the wall by counting the number of cyan pixels in the corner.
                basic.sleep(600);
                if (game.countColors() ==numCyanPixels) {
                    currObsTime = new Date().getTime();
                    console.log("found " + obstacle + " at: " + screen_x + " and " + screen_y + ' in ' + (currObsTime-startObsTime)/1000 + ' seconds');
                    robot.moveMouse(screen_x, screen_y);
                    robot.mouseClick();
                    basic.sleep(sleepTime);
                    return true;
                }
            }
        }
    }
    return false;
}

function findMarkOfGrace(start_x, start_y, width, height) {
    var img = robot.screen.capture(start_x, start_y, width, height);
    for (var i=0; i<width; i++) {
        for(var j=0; j<height; j++) {
            var pixelColor = img.colorAt(i, j);
            if (markOfGraceColors.includes(pixelColor)) {
                var screen_x = i + start_x;
                var screen_y = j + start_y;
                robot.moveMouse(screen_x, screen_y);
                basic.sleep(600);
                numOrange = game.countColors('orange');
                if (numOrange = 11250) {
                    robot.mouseClick();
                    basic.sleep(3000);
                    robot.moveMouse(1600-screen_x, 900-screen_y);
                    robot.mouseClick();
                    basic.sleep(3000);
                    return true;
                }
            }
        }            
    }
    return false;
}


//game.faceDirection('S');
main();
//basic.sleep(6000);
//console.log(game.countColors('orange'));
