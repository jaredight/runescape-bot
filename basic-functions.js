// import robotjs library pls...
var robot = require("robotjs");


module.exports = {

    sleep: function(ms, randomize=true) {
        //this function has the code wait randomMS milliseconds before continuing execution.
        //randomMs is a pseudo-normally distributed random variable with mean ms and range ms/5. 
        if (randomize) {
            var radius = ms/10;
            var randomMS = Math.floor(this.gaussianRandom(ms-radius, ms+radius));
        }
        else {
            randomMS = ms;
        }
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, randomMS);
    }, 

    rotateCamera: function(sec=925, randomize=true, direction='right') {
        console.log("rotating camera");
        robot.keyToggle(direction,'down');
        this.sleep(sec, randomize);
        robot.keyToggle(direction,'up');
    }, 

    testScreenCapture: function() {
        var img = robot.screen.capture(0, 0, 1600, 900);
        var pixel_color = img.colorAt(30,18);
        console.log(pixel_color);
    },

    getRandomInt: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    hexToRGB: function(h) {
        let r = 0, g = 0, b = 0;
        r = "0x" + h[0] + h[1];
        g = "0x" + h[2] + h[3];
        b = "0x" + h[4] + h[5];
        
        return [(+r),(+g),(+b)];
    },

    getColors: function(start_x, start_y, width=10, height=10) {
        var img = robot.screen.capture(start_x, start_y, width, height);
        const colorList = [];
        for (var i=0; i<width; i++) {
            for(var j=0; j<height; j++) {
                var pixelColor = img.colorAt(i, j);
                if (!colorList.includes(pixelColor)) {
                    colorList.push(pixelColor);
                }
            }            
        }
        return colorList;
    },

    gaussianRand: function() {
        var rand = 0;
      
        for (var i = 0; i < 6; i += 1) {
          rand += Math.random();
        }
      
        return rand / 6;
      },
      
    gaussianRandom: function(start, end) {
        return Math.floor(start + this.gaussianRand() * (end - start + 1));
      }
}