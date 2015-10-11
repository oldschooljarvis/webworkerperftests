console.log('UI thread start.');

var worker1 = new SharedWorker('worker1.js');
var worker2 = new SharedWorker('worker2.js');

var mc = new MessageChannel();

worker1.port.postMessage(mc.port1, [mc.port1]);
worker2.port.postMessage(mc.port2, [mc.port2]);

setTimeout(function() {
    console.log('Begin blocking UI thread @ ' + performance.now());
    for (var i = 0; i < 100000000; i++)
    {
        var a = new Date();
    }
    console.log('End blocking UI thread @ ' + performance.now());
}, 5000);

worker1.port.onmessage = function(e) {
    console.log(e.data);
}

worker2.port.onmessage = function(e) {
    console.log(e.data);
}