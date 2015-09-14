var t = performance.now();
console.log('Worker load timestamp: ' + t);

onmessage = function(e) {
    //Receive and log.
    t = performance.now();
    console.log('UI --> Worker: ' + (t - e.data));

    //Grab a fresh time and send a reply.
    t = performance.now();
    postMessage(t);
}