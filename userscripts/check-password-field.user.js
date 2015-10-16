// ==UserScript==
// @name        Check passoword field is safe
// @namespace   htt://taoufix.com/password
// @include     *
// @version     1.2.3
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var pwStyle = "input.pwOK { background-color: #ccffcc !important; background-image: none !important; }"
    + "input.pwWarn { background-color: #ffff98 !important; background-image: none !important; }"
    + "input.pwKO { background-color: #ffbbbb !important; background-image: none !important; }";


$( "<style>" + pwStyle + "</style>" ).appendTo("head");

var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

$('input[type=password]').each(function () {
    var ok;
    var action = $(this).closest('form').attr('action');
    if (action.startsWith('https://')) {
        // Form action is HTTPS
        ok = true;
    } else if (action.startsWith('http://')) {
        // Form action is HTTP :(
        ok = false;
    } else if (location.protocol === 'https:') {
        // Form action is a relative path and the whole page is HTTPS
        ok = true;
    } else {
        ok = false;
    }
    
    var pwClass;
    if (!ok) {
        pwClass = 'pwKO';
    } else if (getLocation(action).hostname === location.hostname) {
        pwClass = 'pwOK';
    } else {
        // Warn about cross domain in HTTPS
        pwClass = 'pwWarn';
    }
    
    $(this).addClass(pwClass);
    
    // Show form action on mouse hover.
    $(this).attr('title', 'form action: ' + action);
});
