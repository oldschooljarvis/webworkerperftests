var t = performance.now();
console.log('UI thread loaded at: ' + t);
var worker1 = new Worker('worker1.js');

//START CONFIG
var setupDuration = 3.0; //seconds (minimum)
var testDuration = 10.0; //seconds
var fps = 60; //determined by RAF, screen refresh rate
//END CONFIG

var frameCount = Math.floor(testDuration * fps);

//get a pre-initialized array intended to hold performance data
var perfData = (function () {
    var a = [];
    for (var f = 0; f < frameCount; f++) {
        a[f] = 0;
    }
    return a;
})();

var f = 0; //current frame
var results = {};

//gift bag for our worker thread
setTimeout(function () {
    worker1.postMessage({
        setupDuration: setupDuration,
        testDuration: testDuration,
        perfData: perfData
    });
}, (setupDuration * 1000) - 2000); //2000ms prior to setup completion


worker1.onmessage = function (e) {
    //Receive and log.
    t = performance.now();
    perfData[f] = e.data;

    f++;
}

function rafLoop() {
    if (f < frameCount) {
        //Send a message, and receive a reply (once per-frame).
        //setTimeout(function() { //No longer needed, at least for this test; nothing is taking priority on the UI thread anymore.
        t = performance.now();
        worker1.postMessage(t);
        //}, 0);

        window.requestAnimationFrame(rafLoop);
    }
}

setTimeout(function () { //Kick off the test after setup is complete.
    console.log('Test in progress, please wait', testDuration, 'seconds.');
    rafLoop();
}, setupDuration * 1000);


setTimeout(function () { //Receive the performance data from the worker.
    worker1.onmessage = function (e) {
        results.incomingPerfData = perfData;
        results.outgoingPerfData = e.data;
    };
}, ((setupDuration + testDuration) * 1000) + 1000); //1000ms after test completion

setTimeout(function () { //Compute the results and log to console.
    var n = 0;
    var meanIncoming = 0;
    var meanOutgoing = 0;
    for (var i = 0; i < frameCount; i++) {
        var diff = results.incomingPerfData[i] - results.outgoingPerfData[i];
        if (i % 2 == 0) {
            console.log('diff (' + i + ') | ui --> worker: ', diff);
            meanOutgoing += diff;
        }
        else {
            console.log('diff (' + i + ') | worker --> ui: ', diff);
            meanIncoming += diff;
        }
        n += diff;
    }
    console.log('mean (ui --> worker): ', meanOutgoing / (frameCount / 2));
    console.log('mean (worker --> ui): ', meanIncoming / (frameCount / 2));
    console.log('mean (bidirectional): ', n / frameCount);
}, ((setupDuration + testDuration) * 1000) + 3000); //3000ms after test completion