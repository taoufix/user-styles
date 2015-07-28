// ==UserScript==
// @name        Check passoword field is safe
// @namespace   htt://taoufix.com/password
// @include     *
// @version     1.1.0
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$('input[type=password]').each(function () {
    var ok;
    var action = $(this).closest('form').attr('action');
    if (action.startsWith('https://')) {
        // Form action is HTTPS :)
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
});
