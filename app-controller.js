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
var installButton = document.getElementById("installButton");
var installButton = document.getElementById("installButton");

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
    leftPreview.innerHTML = ltext2html(eftTextArea.value);
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

    rightPreview.innerHTML = text2html(rightTextArea.value);
    leftPreview.innerHTML = text2html(leftTextArea.value);
    buttomPreview.innerHTML = text2html(buttomTextArea.value);

}

function text2html(texte) {

    texte = texte.replace(/\r/g, "");
    texte = texte.replace(/\n/g, "<br />");

    return texte;
}
// ----------------------------------------------------------------------------
pullFromCache();