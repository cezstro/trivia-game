/*
 * Globals
 */

   
 $( document ).ready(function() {
    //hide elements
    $(".progress").hide();
    //date for footer
    var dateNow = new Date();
    var intYear = dateNow.getFullYear();

    var queryUrl = "https://opentdb.com/api.php?amount=10";

    // the stopwatch object
    var stopwatch = {

        time: 0,
        lap: 1,
        reset: function() {
            console.log("reset function");
            stopwatch.time = 0;

            //clear the stage
            $("#intro-div").animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
            // DONE: Change the "display" div to "00:00."
            $("#display").html("00:00");

            //
            $(".progress").show("slow", function() {
                //console.log("progress bar");
                $(".progress-bar").css('width', '70%');//will change to variable
            });
            
            //ajax call to trivia api
            $.ajax({
                url: queryUrl,
                method: "GET"
            }).done(function(response){
                console.log(response.results[0].question);

                for(var i=0;i<response.results.length;i++){
                    $("#questions-div").append(
                        '<h4>'+response.results[i].question+'</h2><div class="form-check form-check-inline"><label class="form-check-label"><input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio'
                         + i + '" value="option' + i + '">'+ ' ' + '</label></div>');

                    console.log(response.results[i].question)
                    //$("#questions-div").append("<p>"+i+"</p>");
                }
            });
        },
        start: function() {
            console.log("start function");
            // DONE: Use setInterval to start the count here and set the clock to running.
            if (!clockRunning) {
                intervalId = setInterval(stopwatch.count, 1000);
                clockRunning = true;
            }
        },
        stop: function() {
            console.log("stop function");
            // DONE: Use clearInterval to stop the count here and set the clock to not be running.
            clearInterval(intervalId);
            clockRunning = false;
        },
        count: function() {

            // DONE: increment time by 1, remember we cant use "this" here.
            stopwatch.time++;

            // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
            //       and save the result in a variable.
            var converted = stopwatch.timeConverter(stopwatch.time);
            console.log(converted);

            // DONE: Use the variable we just created to show the converted time in the "display" div.
            $("#display").html(converted);
        },
        timeConverter: function(t) {

            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);

            if (seconds < 10) {
            seconds = "0" + seconds;
            }

            if (minutes === 0) {
            minutes = "00";
            }
            else if (minutes < 10) {
            minutes = "0" + minutes;
            }

            return minutes + ":" + seconds;
        }
    };



    //get current year and populate the footer with copyright
    $("#footer-date").html("&copy;Copyright " + intYear + " Raheem Hardy");
    console.log("date " + intYear);

    //start the timer when the start button is pressed
    $("#start-button").on("click", stopwatch.reset);

    //progress bar timer
    




 });

