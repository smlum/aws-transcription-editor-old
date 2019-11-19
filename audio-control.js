// audio controller

// TODO:
// audio shortcuts infobox
// toggle shortcuts



$(document).ready(function() {

  var myAudio = document.getElementById("audio");
  var isPlaying = false;
  var playbackRate = 1.0;


  $('#content').on ("click", ".word-container", function () {
    var newTime = $(this).data('time');
    console.log(newTime);  
    myAudio.currentTime = newTime;
    // myAudio.play();
  });

  $('.word-container').click(function() {    
    // var newTime = $(this).data('time');      
    console.log('newTime');  
    // myAudio.currentTime = newTime;
  });

  // toggle play and pause
  function togglePlay() {
    if (isPlaying) {
      myAudio.pause();
    } else {
      myAudio.play();
    };
  };

  myAudio.onplaying = function() {
    isPlaying = true;
  };
  myAudio.onpause = function() {
    isPlaying = false;
  };

  //to play on the key A do this(using Jquery):
  document.addEventListener('keydown', function(e) {
    // play and pause audio
    if (e.ctrlKey && e.keyCode == 32 && !(e.shiftKey)) {
      togglePlay()
    };
    // stop audio (ctrl + space)
    if (e.ctrlKey && e.shiftKey && e.keyCode == 32) {
      myAudio.load();
      isPlaying = false;
    };
    // speed up audio (ctrl + shift + >)
    if (e.ctrlKey && e.shiftKey && e.keyCode == 190) {
      if (playbackRate < 3.0) {
        playbackRate = playbackRate + 0.25;
      };
      myAudio.playbackRate = playbackRate;
    };
    // slow down audio (ctrl + shift + <)
    if (e.ctrlKey && e.shiftKey && e.keyCode == 188) {
      if (playbackRate > 0.25) {
        playbackRate = playbackRate - 0.25;
      };
      myAudio.playbackRate = playbackRate;
    };
    // skip forward 5 seconds (ctrl + >)
    if (e.ctrlKey && e.keyCode == 190 && !(e.shiftKey)) {
      myAudio.currentTime += 5.0;
    };
    // skip back 5 seconds (ctrl + <)
    if (e.ctrlKey && e.keyCode == 188 && !(e.shiftKey)) {
      myAudio.currentTime -= 5.0;
    };
  });

});
