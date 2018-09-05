/*

document.getElementById('heading').innerHTML = localStorage['title'] || 'Just Wrdcite'; // default text
document.getElementById('content').innerHTML = localStorage['text'] || 'This text is automatically saved every second :) '; // default text

setInterval(function() { // fuction that is saving the innerHTML of the div
localStorage['title'] = document.getElementById('heading').innerHTML; // heading div
localStorage['text'] = document.getElementById('content').innerHTML; // content div
}, 1000);
