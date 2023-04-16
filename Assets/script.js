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
  // Testing/debugging only: change number to simulate the hour
  // let currentHour = 11;

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
  function init() {
    // item from localStorage is set into the 'description' class
    $("#hour-9 .description").val(localStorage.getItem("hour-9"))
    $("#hour-10 .description").val(localStorage.getItem("hour-10"))
    $("#hour-11 .description").val(localStorage.getItem("hour-11"))
    $("#hour-12 .description").val(localStorage.getItem("hour-12"))
    $("#hour-13 .description").val(localStorage.getItem("hour-13"))
    $("#hour-14 .description").val(localStorage.getItem("hour-14"))
    $("#hour-15 .description").val(localStorage.getItem("hour-15"))
    $("#hour-16 .description").val(localStorage.getItem("hour-16"))
    $("#hour-17 .description").val(localStorage.getItem("hour-17"))
  };

  // load notes from local storage on page loading
  init();

  // Date & time powered by DayJS
    let currentTimeDay = dayjs();
    $("#currentDay").text(currentTimeDay.format(' MMM D, YYYY, h:mm a'));

});