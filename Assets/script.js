// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // listener for click events on the save button
  $("#saveBtn").on("click", function(event) {
    event.preventDefault();
    // working from the #saveBtn, select the relevant elements using jQuery
    // this - bubbles up from <i> to the siblings/parents (<div>, text)
    let time = $(this).parent().attr("id");
    let description = $(this).siblings(".description").val();
    // save the item in localStorage
    localStorage.setItem(time, description);
  })

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // get current hour from dayJS
  let currentHour = dayjs().hour();
  console.log("Current Hour in DayJS is " + currentHour);

  // use .each jQuery function to execute function for all timeblocks (9-5PM)
  $(".timeblock").each(function (){
    // split the hour-id in the timeblocks so it can be compared with DayJS time
    let timeBlockNow = $(this).attr("id").split("-")[1];

    // compare current Hour from DayJS to match time in the timeblocks
    // add / remove classes based on current time
    if (currentHour == timeBlockNow) {
      $(this).addClass("present");
      $(this).removeClass("past");
    } else if (currentHour < timeBlockNow) {
      $(this).removeClass("present");
      $(this).addClass("future");
    } else if (currentHour > timeBlockNow) {
      $(this).removeClass("future");
      $(this).addClass("past");
    }
  })

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  
  

  // TODO: Add code to display the current date in the header of the page.
  // Date & time powered by DayJS
    let currentTimeDay = dayjs();
    $("#currentDay").text(currentTimeDay.format(' MMM D, YYYY, h:mm a'));

});


// .addClass - use this to target all elements within time block
// $("this").addClass("past")
// $("this").addClass("present")
// $("this").addClass("future")

// .removeClass
// $("this").removeClass("past")
// $("this").removeClass("present")
// $("this").removeClass("future")
