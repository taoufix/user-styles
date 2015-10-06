// ==UserScript==
// @name        Check passoword field is safe
// @namespace   htt://taoufix.com/password
// @include     *
// @version     1.2.1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

var l = getLocation("http://example.com/path");

$('input[type=password]').each(function () {
    var ok;
    var action = $(this).closest('form').attr('action');
    if (action.startsWith('https://') && getLocation(action).hostname === location.hostname) {
        // Form action is HTTPS and is in the same domain :)
        ok = true;
    } else if (action.startsWith('http://')) {
        // Form action is HTTP :(
        ok = false;
    } else if (location.protocol === 'https:') {
        // Form action is a relative path and the whole page is HTTPS :)
        ok = true;
    } else {
        ok = false;
    }
    
    $(this).css('background-color', ok ? '#ccffcc' : '#ffbbbb');
    
    // Show form action on mouse hover.
    $(this).attr('title', 'form action: ' + action);
});
