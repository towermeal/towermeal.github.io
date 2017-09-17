function main()
{
  var d = new Date(); // date object
  var dayOfWeek = d.getDay(); // day of the week
  var hour = d.getHours(); // hour of the day
  var min = d.getMinutes(); // minute of the hour

  var isTowerMeal = false;
  var typeTowerMeal = 0; // 0 for lunch, 1 for dinner, 2 for brunch, 3 for breakfast

  // No late meal on the weekend
  if (dayOfWeek != 0 && dayOfWeek != 6)
  {
    // breakfast every Mon-Fri 8am-9am
    if (hour == 8)
    {
      isTowerMeal = true;
      typeTowerMeal = 3;
    }
    // lunch every Mon-Fri 11:45am - 1:30pm
    else if ((hour == 11 && min >= 45) ||
          hour == 12 ||
          (hour == 13 && min <= 30))
    {
      isTowerMeal = true;
      typeTowerMeal = 0; // lunch
    }
    // dinner every day 5:45pm - 7:30pm
    else if ((hour == 17 && min >= 45) ||
              (hour == 18) || (hour == 19 && min <= 30))
    {
      isTowerMeal = true;
      typeTowerMeal = 1;
    }
  }
  else // weekends meals saturday/sunday
  {
    //  11:45 - 1pm brunch
    if ((hour == 11 && min >= 45) || hour == 12)
    {
      isTowerMeal = true;
      typeTowerMeal = 2;
    }
    // 5:45pm - 7:30pm dinner
    else if ((hour == 17 && min >= 45) ||
              (hour == 18) || (hour == 19 && min <= 30))
    {
        isTowerMeal = true;
        typeTowerMeal = 1;
    }
  }

  changeText(isTowerMeal); // update site text

  // Show time until or left of late meal
  if (isTowerMeal)
  {
    timeLeft(typeTowerMeal, hour, min);
  }
  else
  {
    timeTill(dayOfWeek, hour, min);
  }

}
// Update site text
function changeText(isTowerMeal)
{
  if (isTowerMeal)
  {
    document.getElementById("yesJava").innerHTML = "Yes!";
  }
  else
  {
    document.getElementById("noJava").innerHTML = "Nah.";
  }
}
// Calculate and display time left of meal
function timeLeft(typeTowerMeal, hour, min)
{
  var hourLeft
  var minLeft;

  if (typeTowerMeal == 3) // breakfast meal
  {
    hourLeft = 0;
    minLeft = 60 - min;
    document.getElementById("timeUntil").innerHTML = "&nbsp" + minLeft + " minutes until breakfast ends." + "&nbsp";
  }
  else if (typeTowerMeal == 0) // lunch meal
  {
    hourLeft = 13 - hour;
    minLeft = (30 + (60 * hourLeft)) - min;

    if (hourLeft != 0 && minLeft <= 45)
    {
      document.getElementById("timeUntil").innerHTML = "&nbsp" + hourLeft + " hour and " + minLeft + " minutes until lunch ends." + "&nbsp";
    }
    else if (hourLeft != 0 && (minLeft - 60) > 0)
    {
      document.getElementById("timeUntil").innerHTML = "&nbsp" + hourLeft + " hour and " + (minLeft - 60) + " minutes until lunch ends." + "&nbsp";
    }
    else
    {
      document.getElementById("timeUntil").innerHTML = "&nbsp" + minLeft + " minutes until lunch ends." + "&nbsp";
    }
  }
  else if (typeTowerMeal == 1) // dinner late meal
  {
    hourLeft = 17 - hour;
    minLeft = 45 + (60 * hourLeft) - min;

    if (hourLeft != 0 && minLeft <= 45)
    {
      document.getElementById("timeUntil").innerHTML = "&nbsp" + hourLeft + " hour and " + minLeft + " minutes until dinner ends." + "&nbsp";
    }
    else if (hourLeft != 0 && (minLeft - 60) > 0)
    {
      document.getElementById("timeUntil").innerHTML = "&nbsp" + hourLeft + " hour and " + (minLeft - 60) + " minutes until dinner ends." + "&nbsp";
    }
    else
    {
      document.getElementById("timeUntil").innerHTML = "&nbsp" + minLeft + " minutes until dinner ends." + "&nbsp";
    }
  }
  else if (typeTowerMeal == 2)
  {
    hourLeft = 13 - hour;
    minLeft = (60 * hourLeft) - min;

    if (hourLeft != 0 && minLeft <= 45)
    {
      document.getElementById("timeUntil").innerHTML = "&nbsp" + hourLeft + " hour and " + minLeft + " minutes until breakfast ends." + "&nbsp";
    }
    else if (hourLeft != 0 && (minLeft - 60) > 0)
    {
      document.getElementById("timeUntil").innerHTML = "&nbsp" + hourLeft + " hour and " + (minLeft - 60) + " minutes until breakfast ends." + "&nbsp";
    }
    else
    {
      document.getElementById("timeUntil").innerHTML = "&nbsp" + minLeft + " minutes until breakfast ends." + "&nbsp";
    }
  }
}
// displays next meal time
function timeTill(dayOfWeek, hour, min)
{
  var hourLeft;
  var minLeft;

  // Weekend
  if (dayOfWeek == 0 || dayOfWeek == 6)
  {
    if (hour < 11 || (hour == 11 && min <= 45))
      document.getElementById("timeUntil").innerHTML = "&nbsp" + "Brunch starts at 11:45am." + "&nbsp";
    else if (hour < 5 || (hour == 5 && min <= 45))
      document.getElementById("timeUntil").innerHTML = "&nbsp" + "Dinner starts at 5:45pm." + "&nbsp";
    else
      document.getElementById("timeUntil").innerHTML = "&nbsp" + "No more meals today." + "&nbsp";
  }
  else
  {
    if (hour < 8)
      document.getElementById("timeUntil").innerHTML = "&nbsp" + "Breakfast starts at 8:00am" + "&nbsp";
    else if (hour < 11 || (hour == 11 && min <= 45))
      document.getElementById("timeUntil").innerHTML = "&nbsp" + "Lunch starts at 11:45am." + "&nbsp";
    else if (hour < 5 || (hour == 5 && min <= 45))
      document.getElementById("timeUntil").innerHTML = "&nbsp" + "Dinner starts at 5:45pm." + "&nbsp";
    else
      document.getElementById("timeUntil").innerHTML = "&nbsp" + "No more meals today." + "&nbsp";
  }
}
