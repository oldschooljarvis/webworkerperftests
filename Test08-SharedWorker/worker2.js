var startString = 'Worker2 start @ '+performance.now();

var port = null;

onconnect = function(e) {
    var swPort = e.ports[0];
    swPort.postMessage(startString);
    swPort.onmessage = function(e) {
        port = e.data;
        port.onmessage = function(e) {
            swPort.postMessage('Message received by Worker2 @ ' + performance.now() + ', contents are:' + e.data);
        }
    }
}

setTimeout(function() {
    port.postMessage('Hello from Worker2! @ '+ performance.now().toString());
}, 7000);