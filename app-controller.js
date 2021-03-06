var rightTextArea = document.getElementById("rightTextField");
var rightPreview = document.getElementById("right-box-pre");
var right1Preview = document.getElementById("right-box-1-pre");
var right2Preview = document.getElementById("right-box-2-pre");

var leftTextArea = document.getElementById("leftTextField");
var leftPreview = document.getElementById("left-box-pre");
var left1Preview = document.getElementById("left-box-1-pre");
var left2Preview = document.getElementById("left-box-2-pre");

var buttomTextArea = document.getElementById("buttomTextField");
var buttomPreview = document.getElementById("buttom-box-pre");
var buttom1Preview = document.getElementById("buttom-box-1-pre");
var buttom2Preview = document.getElementById("buttom-box-2-pre");

var printButton = document.getElementById("printButton");

//------------------------------------------------------------------------------
printButton.addEventListener("click", function(e) {
    pushToCache();
    window.print();
});
rightTextArea.addEventListener("keyup", function(e) {
    rightPreview.innerHTML = text2html(rightTextArea.value);
});
rightTextArea.addEventListener("focus", function(e) {
    rightPreview.innerHTML = text2html(rightTextArea.value);
});
leftTextArea.addEventListener("keyup", function(e) {
    leftPreview.innerHTML = text2html(leftTextArea.value);
});
leftTextArea.addEventListener("focus", function(e) {
    leftPreview.innerHTML = text2html(leftTextArea.value);
});
buttomTextArea.addEventListener("keyup", function(e) {
    buttomPreview.innerHTML = text2html(buttomTextArea.value);
});
buttomTextArea.addEventListener("focus", function(e) {
    buttomPreview.innerHTML = text2html(buttomTextArea.value);
});

// -----------------------------------------------------------------------------
function pushToCache() {
    rightPreview.innerHTML = text2html(rightTextArea.value);
    right1Preview.innerHTML = text2html(rightTextArea.value);
    right2Preview.innerHTML = text2html(rightTextArea.value);

    leftPreview.innerHTML = text2html(leftTextArea.value);
    left1Preview.innerHTML = text2html(leftTextArea.value);
    left2Preview.innerHTML = text2html(leftTextArea.value);

    buttomPreview.innerHTML = text2html(buttomTextArea.value);
    buttom1Preview.innerHTML = text2html(buttomTextArea.value);
    buttom2Preview.innerHTML = text2html(buttomTextArea.value);

    localStorage.setItem('right', rightTextArea.value);
    localStorage.setItem('left', leftTextArea.value);
    localStorage.setItem('buttom', buttomTextArea.value);
}

function pullFromCache() {
    rightTextArea.value = localStorage.getItem('right');
    leftTextArea.value = localStorage.getItem('left');
    buttomTextArea.value = localStorage.getItem('buttom');

    if (leftTextArea.value === '' && rightTextArea.value === '' && buttomTextArea.value === '') {
        leftTextArea.value = 'Produced By:\nMount Nebo Media\nMinistry';
        rightTextArea.value = '11:00 a.m. Service';
        buttomTextArea.value = 'this is a test\n\nthis is another test';
    }
    if (leftTextArea.value == null && rightTextArea.value == null && buttomTextArea.value == null) {
        leftTextArea.value = 'Produced By:\nMount Nebo Media\nMinistry';
        rightTextArea.value = '11:00 a.m. Service';
        buttomTextArea.value = 'this is a test\n\nthis is another test';
    }

    rightPreview.innerHTML = text2html(rightTextArea.value);
    leftPreview.innerHTML = text2html(leftTextArea.value);
    buttomPreview.innerHTML = text2html(buttomTextArea.value);

}

function text2html(texte) {
    if (texte == null) {
        return "";
    } else {
        texte = texte.replace(/\r/g, "");
        texte = texte.replace(/\n/g, "<br />");

        return texte;
    }
}

// ----------------------------------------------------------------------------
pullFromCache();

// ----------------------------------------------------------------------------
var objappVersion = navigator.appVersion;
var objAgent = navigator.userAgent;
var objbrowserName = navigator.appName;
var objfullVersion = '' + parseFloat(navigator.appVersion);
var objBrMajorVersion = parseInt(navigator.appVersion, 10);
var objOffsetName, objOffsetVersion, ix;

// In Chrome 
if ((objOffsetVersion = objAgent.indexOf("Chrome")) != -1) {
    objbrowserName = "Chrome";
    objfullVersion = objAgent.substring(objOffsetVersion + 7);


    // trimming the fullVersion string at semicolon/space if present 
    if ((ix = objfullVersion.indexOf(";")) != -1) objfullVersion = objfullVersion.substring(0, ix);
    if ((ix = objfullVersion.indexOf(" ")) != -1) objfullVersion = objfullVersion.substring(0, ix);
    objBrMajorVersion = parseInt('' + objfullVersion, 10);
    if (isNaN(objBrMajorVersion)) {
        objfullVersion = '' + parseFloat(navigator.appVersion);
        objBrMajorVersion = parseInt(navigator.appVersion, 10);
    }

    // In Chrome version 73 or greater
    if (objBrMajorVersion >= 73) {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("./app-service-worker.js")
                .then(function(registration) { // Registration was successful
                    console.log("ServiceWorker registration successful with scope: ", registration.scope);
                    // ----------------------------------------------------------------------
                    var deferredPrompt;
                    window.addEventListener("beforeinstallprompt", function(e) {
                        e.preventDefault();
                        deferredPrompt = e;
                        console.log("before install prompt fired");
                        var installButton = document.getElementById("installButton");
                        installButton.style.display = 'inline-block';
                        installButton.addEventListener("click", function() {
                            deferredPrompt.prompt();
                            deferredPrompt.userChoice.then(function(choiceResult) {
                                if (choiceResult.outcome === 'accepted') {
                                    installButton.style.display = 'none';
                                }
                                deferredPrompt = null;
                            })
                        });
                    });

                }).catch(function(err) { // registration failed :(
                    console.error("ServiceWorker registration failed: ", err);
                });
        }
    }
}