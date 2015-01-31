function ajax(url, onProgress, callback, data, x) {
    try {
        x = new(this.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
        x.open(data ? 'POST' : 'GET', url, 1);
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        x.onreadystatechange = function() {
            x.readyState > 3 && callback && callback(x.responseText, x);
        };
        x.addEventListener("progress", onProgress, false);
        x.send(data)
    } catch (e) {
        window.console && console.log(e);
    }
};

function onLoad(responseText) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    if (script.text) {
        script.text = content; // IE
    } else {
        script.appendChild(document.createTextNode(responseText));
    }
    document.getElementsByTagName('head')[0].appendChild(script);
    document.getElementById('appLoader').className = 'finished';
    setTimeout(function() {
        angular.bootstrap(document, ['wordpress-hybrid-client']);
    }, 1000);
}

function onProgress(e) {
    var percentComplete = 100 * e.loaded / wordpressHybridClient.js.size || 0;
    var txt = document.createTextNode(Math.round(percentComplete / 100 * 90 + 10));
    document.getElementById('appLoaderPourcent').innerText = txt.textContent;
}

ajax(wordpressHybridClient.js.name, onProgress, onLoad);