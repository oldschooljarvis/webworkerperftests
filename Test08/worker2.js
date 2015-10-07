console.log('Worker2 start @ '+performance.now());

var port = null;

onmessage = function(e) {
    port = e.data;
    port.onmessage = function(e) {
        console.log('Message received by Worker2 @ ' + performance.now() + ', contents are:', e.data);
    }
}

setTimeout(function() {
    port.postMessage('Hello from Worker2! @ '+ performance.now().toString());
}, 7000);