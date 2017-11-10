function main()
{
  var d = new Date(); // date object
  var dayOfWeek = d.getDay(); // day of the week
  var hour = d.getHours(); // hour of the day
  var min = d.getMinutes(); // minute of the hour

  var totalMin = hourToMin(hour, min);

  var isTowerMeal = false;
  var typeTowerMeal = 0; // 0 for lunch, 1 for dinner, 2 for brunch, 3 for breakfast

  // No late meal on the weekend
  if (dayOfWeek != 0 && dayOfWeek != 6)
  {
    // breakfast every Mon-Fri 8am-9am
    if (totalMin >= hourToMin(8,0) && totalMin <= hourToMin(9,0))
    {
      isTowerMeal = true;
      typeTowerMeal = 3;
    }
    // lunch every Mon-Fri 11:45am - 1:30pm
    else if (totalMin >= hourToMin(11,45) && totalMin <= hourToMin(13,30))
    {
      isTowerMeal = true;
      typeTowerMeal = 0; // lunch
    }
    // dinner every day 5:45pm - 7:30pm
    else if (totalMin >= hourToMin(17,45) && totalMin <= hourToMin(19,30))
    {
      isTowerMeal = true;
      typeTowerMeal = 1;
    }
  }
  else // weekends meals saturday/sunday
  {
    //  11:45 - 1pm brunch
    if (totalMin >= (11,45) && totalMin <= hourToMin(13,0))
    {
      isTowerMeal = true;
      typeTowerMeal = 2;
    }
    // 5:45pm - 7:30pm dinner
    else if (totalMin >= hourToMin(17,45) && totalMin <= hourToMin(19,30))
    {
        isTowerMeal = true;
        typeTowerMeal = 1;
    }
  }

  changeText(isTowerMeal); // update site text

  // Show time until or left of late meal
  if (isTowerMeal)
  {
    //timeLeft(typeTowerMeal, hour, min);
    document.getElementById("timeUntil").innerHTML = "Currently Open";
  }
  else
  {
    //timeTill(dayOfWeek, hour, min);
    document.getElementById("timeUntil").innerHTML = "Not Open";
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

// Calculates and displays time until late meal starts
function timeTill(dayOfWeek, hour, min)
{
  var hourLeft;
  var minLeft;

  // Weekend
  if (dayOfWeek == 0 || dayOfWeek == 6)
  {
      document.getElementById("timeUntil").innerHTML = "&nbsp" + "No Late Meal on the weekends, silly." + "&nbsp";
  }
  // Friday
  else if (dayOfWeek == 5)
  {
    if (hour < 14) // before 2pm
    {
      hourLeft = 13 - hour;
      minLeft = 60 - min;

      document.getElementById("timeUntil").innerHTML = "&nbsp" + hourLeft + " hours and " + minLeft + " minutes until Late Meal begins" + "&nbsp";
    }
    else // after late lunch
    {
      document.getElementById("timeUntil").innerHTML = "&nbsp" + "No more Late Meal today. Sorry, tigers." + "&nbsp"
    }
  }
  else
  {
    if (hour < 14) // before 2pm
    {
      hourLeft = 13 - hour;
      minLeft = 60 - min;

      document.getElementById("timeUntil").innerHTML = "&nbsp" + hourLeft + " hours and " + minLeft + " minutes until Late Meal begins" + "&nbsp";
    }
    else if (hour == 20 && min < 30) // before 8:30pm but after 8pm
    {
      minLeft = 30 - min;
      document.getElementById("timeUntil").innerHTML = "&nbsp" + minLeft + " minutes until Late Meal begins." + "&nbsp";
    }
    else if ((hour < 20) && (min <= 30))
    {
      hourLeft = 20 - hour;
      minLeft = 30 - min;

      document.getElementById("timeUntil").innerHTML = "&nbsp" + hourLeft + " hours and " + minLeft + " minutes until Late Meal begins" + "&nbsp";
    }
    else if ((hour < 20) && (min > 30))
    {
      hourLeft = 19 - hour;
      minLeft = 60 - min;

      document.getElementById("timeUntil").innerHTML = "&nbsp" + hourLeft + " hours and " + minLeft + " minutes until Late Meal begins" + "&nbsp";
    }
    else
    {
      document.getElementById("timeUntil").innerHTML = "&nbsp" + "No more Late Meal today. Sorry, tigers." + "&nbsp";
    }
  }
}

// Converts hour+minutes => minutes only
function hourToMin(hour, min)
{
  return (hour*60 + min)
}
