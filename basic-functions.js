// import robotjs library pls...
var robot = require("robotjs");


module.exports = {

    sleep: function(ms) {
        //this function has the code wait randomMS milliseconds before continuing execution.
        //randomMs is a pseudo-normally distributed random variable with mean ms and range ms/5. 
        var radius = ms/10
        var randomMS = Math.floor(this.gaussianRandom(ms-radius, ms+radius));
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, randomMS);
    }, 

    rotateCamera: function(sec = 1000) {
        console.log("rotating camera");
        robot.keyToggle('right','down');
        this.sleep(sec);
        robot.keyToggle('right','up');
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
        // 3 digits
        if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];

        // 6 digits
        } else if (h.length == 6) {
        r = "0x" + h[0] + h[1];
        g = "0x" + h[2] + h[3];
        b = "0x" + h[4] + h[5];
        }
        return [(+r),(+g),(+b)];
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