console.log('UI thread start.');

var worker1 = new Worker('worker1.js');
var worker2 = new Worker('worker2.js');

var mc = new MessageChannel();

worker1.postMessage(mc.port1, [mc.port1]);
worker2.postMessage(mc.port2, [mc.port2]);

setTimeout(function() {
    console.log('Begin blocking UI thread @ ' + performance.now());
    for (var i = 0; i < 100000000; i++)
    {
        var a = new Date();
    }
    console.log('End blocking UI thread @ ' + performance.now());
}, 5000);