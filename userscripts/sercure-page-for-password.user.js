// ==UserScript==
// @name        Secure page for password
// @namespace   htt://taoufix.com/password
// @include     *
// @version     1.0
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

if (location.protocol === 'https') {
    $('input[type=password]').css('background-color', '#ccffcc');
} else {
    $('input[type=password]').css('background-color', '#ffbbbb');
}
