

  // short description: Work with your computer to transcribe quicker.
  // long description: Right now even the best machine learning algorithms require a little help to get things right. We should design platforms that utilise computer pattern recognition and human skills efficiently to produce the best outcome.

  // TODO:
  // custom confidence thresholds
  // add playback editing for low confidence words
  //    - audio playback (start/ stop/ speed)
  //    - shifting input on red words as they come up in speech
  //        - time dependent or in sequence
  // add custom speaker naming
  //    - and toggle live speaker during playback
  // improve speaker recognition/ correction
  // add toggle options
  // add error messages
  // adapt for if speaker detection is not enabled

    var json = 'json/podcast_transcript.json';

    $(document).ready(function() {
      $(".text-transcript").hide();
      $(".toggle-raw").click(function() {
        $(".raw").toggle();
      });
    });


    $.getJSON(json, function(data) {
      // data is the JSON string
      var results = data.results;
      var transcript_raw = JSON.stringify(results.transcripts[0].transcript);

      // create an array of start times for each speaker
      var speaker_times = [];
      var segments = results.speaker_labels.segments;
      for (var i = 0; i < segments.length; i++) {
          speaker = [];
          speaker.push(segments[i].speaker_label);
          speaker.push(segments[i].start_time);
          speaker_times.push(speaker);
      };

      // assign variables for use in for loop below
      var text = "";
      var speaker_counter = 0;
      var new_speaker = "";

      // loop through and append each word
      for (var i = 0; i < results.items.length; i++) {
        // get data from JSON string
        word = results.items[i].alternatives[0].content;
        confidence = results.items[i].alternatives[0].confidence;
        word_start_time = results.items[i].start_time;
        type = results.items[i].type;

        // ensure punctuation characters don't have spaces before them
        if (type == "pronunciation") {
          space = " ";
        } else if (type == "punctuation") {
          space = "";
        };

        // make sure first word has a speaker - may be unecessary
        if (i == 0) {
          // find out and set the speaker counter for the first word
          while (Number(speaker_times[speaker_counter][1]) < Number(word_start_time)) {
            speaker_counter++;
          };
          speaker_counter = speaker_counter - 1;
          new_speaker = speaker_times[speaker_counter][0];
          $('.speaker').before("<span class='speaker-header'>" + speaker_times[speaker_counter][0] + ":</span>");
          $('.speaker').before("<br><br>");
        };

        // add line break if speaker changes
        if ((speaker_counter < speaker_times.length) && (i != 0)) {
          if (Number(speaker_times[speaker_counter][1]) < Number(word_start_time)) {
            // TODO only display if speaker changes for less than a specified amount of time
            // default minumum time set to 1 sec
            var min_time = 2;
            if (speaker_times[speaker_counter + 1] && (Number(speaker_times[speaker_counter + 1][1]) - Number(speaker_times[speaker_counter][1]) > min_time)) {

              // only display if speaker has actually changed
              if (new_speaker != speaker_times[speaker_counter][0]) {
                new_speaker = speaker_times[speaker_counter][0];
                $('.speaker').before("<br><br>");
                $('.speaker').before("<span style='font-weight: bold'>" + speaker_times[speaker_counter][0] + ":</span>");
                $('.speaker').before("<br><br>");
              };
            };
            speaker_counter++;
          };
        };

        // print each word
        text = space + word;

        // appeand text to speaker div
        // if confidence if below 90% color word red
        if ((confidence > 0.95) || (type == "punctuation")) {
          $('.speaker').before(text);
        } else if ((confidence > 0.90) || (type == "punctuation")) {
          $('.speaker').before("<span class='l95'>" + text + "</span>");
        } else {
          $('.speaker').before("<span class='l90'>" + text + "</span>");
        };



        //for (var i = 0; i < speaker_times.length; i++) {
        //console.log(speaker_times[i]);
        //}

      };

      var obj = JSON.stringify(results);
      $('.raw').html(transcript_raw);
      $('.whole').html(obj);

    });
