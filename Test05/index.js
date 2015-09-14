var t = performance.now();
console.log('UI load timestamp: ' + t);

var worker1 = new Worker('worker1.js');

worker1.onmessage = function(e) {
    //Receive and log.
    t = performance.now();
    console.log('Worker --> UI: ' + (t - e.data));
}

function rafLoop() {
    //Send a message, and receive a reply (once per-frame).
    t = performance.now();
    worker1.postMessage(t);

    window.requestAnimationFrame(rafLoop);
}
rafLoop();