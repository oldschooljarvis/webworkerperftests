var t = performance.now();
console.log('Worker thread loaded at: ' + t);

//These will be received from the UI thread
var setupDuration;
var testDuration;
var perfData;

var f = 0; //current frame

onmessage = function (e) {
    setupDuration = e.data.setupDuration;
    testDuration = e.data.testDuration;
    perfData = e.data.perfData;
}

console.log('Loading test.');

setTimeout(function () {
    onmessage = function (e) {
        //Receive and log
        perfData[f] = e.data;

        //Grab a fresh time and send a reply.
        t = performance.now();
        postMessage(t);

        f++;
    };

    setTimeout(function () {
        //Send the result data back
        postMessage(perfData);
    }, ((setupDuration + testDuration) * 1000)); //2000ms after test completion
}, 2000);