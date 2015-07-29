// ==UserScript==
// @name        HN Tweaks
// @namespace   http://taoufix.com/hackernews
// @include     https://news.ycombinator.com/*
// @version     2.0.1
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==


var INDENT = 40;

// Styles
$( "<style>.expand { font-family: monospace; }</style>" ).appendTo( "head" )

// For each comment
if (window.location.pathname === '/item') {
  $('tr.athing:gt(0)').each(function() {
    
    // Add expand link
    var $commhead = $(this).find('.comhead');
    $commhead.html('[<a class="expand" href="#">+</a>]' + $commhead.html());
    
    // Collapse if not top most comment
    var img = $(this).find('.ind img');
    if (img.attr('width') > 0) {
      $(this).toggle(false);
    }
  
  });
}

function expandChildren() {
  var $athing = $(this).closest('tr.athing');
  var width = parseInt($athing.find('.ind img').attr('width'));
  var $nextThing = $athing.next();
  
  var toggle;
  // Change command link
  var $a = $athing.find('.comhead a.expand');
  if ($a.html() === '+') {
    toggle = true;
    $a.html('-');
  } else {
    toggle = false;
    $a.html('+');
  }
  
  if (typeof $nextThing !== 'undefined') {
    expandComment($nextThing, width+INDENT, toggle);
  }
  
  return false;
}

function expandComment($athing, width, toggle) {
  var currentWidth = parseInt($athing.find('.ind img').attr('width'));
  
  if (currentWidth === width) {
     $athing.toggle(toggle);
     if (!toggle) {
       $athing.find('.comhead a.expand').html('+');
     }

     var $nextThing = $athing.next();
     if (typeof $nextThing !== 'undefined') {
         expandComment($nextThing, width, toggle);  
     }
  } else if (currentWidth > width) {
    if (!toggle) {
      $athing.toggle(false);
      $athing.find('.comhead a.expand').html('+');
    }
    expandComment($athing.next(), width, toggle);  
  }
}

$('a.expand').click(expandChildren);


// Points
var MIN_SCORE = 100;
var SCORE_REGEXP = /(\d+) points/;
$('span.score').each(function() {
  var match = SCORE_REGEXP.exec($(this).text());
  if (match != null && parseInt(match[1]) >= MIN_SCORE) {
    $(this).css('color', '#ff3030');
  }
});
