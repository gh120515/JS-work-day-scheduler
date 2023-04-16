// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {

  // listener for click events on the save button
  $(".saveBtn").on("click", function(event) {
    event.preventDefault();
    // working from the #saveBtn, select the relevant elements using jQuery
    // this - bubbles up from <i> to the siblings/parents (<div>, text)
    let time = $(this).parent().attr("id");
    let description = $(this).siblings(".description").val();
    // save the item in localStorage
    localStorage.setItem(time, description);
  })

  // get current hour from dayJS
  let currentHour = dayjs().hour();
  console.log("Current Hour in DayJS is " + currentHour);

  // use .each jQuery function to execute function for all timeblocks (9-5PM)
  $(".time-block").each(function (){
    // split the hour-id in the timeblocks so it can be compared with DayJS time
    let timeBlockNow = parseInt($(this).attr("id").split("hour-")[1]);

    // compare current Hour from DayJS to match time in the timeblocks
    // add / remove classes based on current time
    if (currentHour === timeBlockNow) {
      $(this).addClass("present");
      $(this).removeClass("past");
      $(this).removeClass("future");
    } else if (currentHour < timeBlockNow) {
      $(this).removeClass("present");
      $(this).removeClass("past");
      $(this).addClass("future");
    } else if (currentHour > timeBlockNow) {
      $(this).removeClass("future");
      $(this).removeClass("present");
      $(this).addClass("past");
    }
  })

  // grab items from localStorge (set by id - eg hour-11) & set in each time block (9AM-5PM) when page is loaded
  function init(){
    $("#hour-9 .time-block").val(localStorage.getItem("hour-9"))
    $("#hour-10 .time-block").val(localStorage.getItem("hour-10"))
    $("#hour-11").val(localStorage.getItem("hour-11"))
    $("#hour-12").val(localStorage.getItem("hour-12"))
    $("#hour-13").val(localStorage.getItem("hour-13"))
    $("#hour-14").val(localStorage.getItem("hour-14"))
    $("#hour-15").val(localStorage.getItem("hour-15"))
    $("#hour-16").val(localStorage.getItem("hour-16"))
    $("#hour-17").val(localStorage.getItem("hour-17"))
  };

  init();

  // TODO: Add code to display the current date in the header of the page.
  // Date & time powered by DayJS
    let currentTimeDay = dayjs();
    $("#currentDay").text(currentTimeDay.format(' MMM D, YYYY, h:mm a'));

});