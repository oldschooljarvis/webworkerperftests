console.log('Worker1 start @ '+performance.now());

var port = null;

onmessage = function(e) {
    port = e.data;
    port.onmessage = function(e) {
        console.log('Message received by Worker1 @ ' + performance.now() + ', contents are:', e.data);
    }
}

setTimeout(function() {
    port.postMessage('Hello from Worker1! @ '+ performance.now().toString());
}, 6000);