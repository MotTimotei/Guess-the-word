
function loadXMLDoc() {
    let url = 'http://random-word-api.herokuapp.com/word?number=10'
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            return JSON.parse(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url, false /*async = false*/ ); //the function will execute after the server response 
    xmlhttp.send();
    return xmlhttp.onreadystatechange();
}