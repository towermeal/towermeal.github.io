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
    // grill lunch every Mon-Fri 11:45am - 1:15pm
    else if (totalMin >= hourToMin(11,45) && totalMin <= hourToMin(13,15))
    {
      isTowerMeal = true;
      typeTowerMeal = 0; // lunch
    }
    // grill dinner every day 5:45pm - 7:15pm
    else if (totalMin >= hourToMin(17,45) && totalMin <= hourToMin(19,15))
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
    timeLeft(typeTowerMeal, totalMin);
    //document.getElementById("timeUntil").innerHTML = "Currently Open";
  }
  else
  {
    //timeTill(dayOfWeek, hour, min);
    document.getElementById("timeUntil").innerHTML = "Grill Not Open";
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
function timeLeft(typeTowerMeal, totalMin)
{
  if (typeTowerMeal == 3) // breakfast meal
  {
    minLeft = (hourToMin(9,0) - totalMin) % 60;
    document.getElementById("timeUntil").innerHTML = "&nbsp" + minLeft + " minutes until breakfast ends." + "&nbsp";
  }
  else if (typeTowerMeal == 0) // lunch meal
  {
    hourLeft = Math.floor((hourToMin(13,15) - totalMin) / 60);
    minLeft = (hourToMin(13,15) - totalMin) % 60;

    if (hourLeft != 0)
    {
      document.getElementById("timeUntil").innerHTML = "&nbsp" + hourLeft + " hour and " + minLeft + " minutes until lunch grill closes." + "&nbsp";
    }
    else
    {
      document.getElementById("timeUntil").innerHTML = "&nbsp" + minLeft + " minutes until lunch grill closes." + "&nbsp";
    }

  }
  else if (typeTowerMeal == 1) // dinner meal
  {
    hourLeft = Math.floor((hourToMin(19,15) - totalMin) / 60);
    minLeft = (hourToMin(19,15) - totalMin) % 60;

    if (hourLeft != 0)
    {
      document.getElementById("timeUntil").innerHTML = "&nbsp" + hourLeft + " hour and " + minLeft + " minutes until dinner grill closes." + "&nbsp";
    }
    else
    {
      document.getElementById("timeUntil").innerHTML = "&nbsp" + minLeft + " minutes until dinner grill closes." + "&nbsp";
    }
  }
  else if (typeTowerMeal == 2) // brunch meal
  {
    hourLeft = Math.floor((hourToMin(13,15) - totalMin) / 60);
    minLeft = (hourToMin(13,15) - totalMin) % 60;

    if (hourLeft != 0)
    {
      document.getElementById("timeUntil").innerHTML = "&nbsp" + hourLeft + " hour and " + minLeft + " minutes until breakfast ends." + "&nbsp";
    }
    else
    {
      document.getElementById("timeUntil").innerHTML = "&nbsp" + minLeft + " minutes until breakfast ends." + "&nbsp";
    }
  }
}

// Converts hour+minutes => minutes only
function hourToMin(hour, min)
{
  return (hour*60 + min)
}
