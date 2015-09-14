var worker1 = new Worker('worker1.js');

var i = 0; //# of messages sent

//Receive a message, then send one back.
worker1.onmessage = function(e) {
    worker1.postMessage(null);
    i+=2;
}

//Kick off an endless stream of bidirectional events with the worker.
setTimeout(function() {
    worker1.postMessage(null);
    i++;
}, 500);

//Measure how many messages sent per frame.
function rafLoop() {
    console.log(i);
    i = 0;
    window.requestAnimationFrame(rafLoop);
}
rafLoop();