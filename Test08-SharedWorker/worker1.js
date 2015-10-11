var startString = 'Worker1 start @ '+performance.now();

var port = null;

onconnect = function(e) {
    var swPort = e.ports[0];
    swPort.postMessage(startString);
    swPort.onmessage = function(e) {
        port = e.data;
        port.onmessage = function(e) {
            swPort.postMessage('Message received by Worker1 @ ' + performance.now() + ', contents are:' + e.data);
        }
    }
}

setTimeout(function() {
    port.postMessage('Hello from Worker1! @ '+ performance.now().toString());
}, 6000);