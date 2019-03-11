"use strict";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [{abbr:"jan", full:"January",   len:31},  
                {abbr:"feb", full:"February",  len:undefined}, 
                {abbr:"mar", full:"March",     len:31},    
                {abbr:"apr", full:"April",     len:30},    
                {abbr:"may", full:"May",       len:31},      
                {abbr:"jun", full:"June",      len:30},     
                {abbr:"jul", full:"July",      len:31},     
                {abbr:"aug", full:"August",    len:31},   
                {abbr:"sep", full:"September", len:30},
                {abbr:"oct", full:"October",   len:31},  
                {abbr:"nov", full:"November",  len:30}, 
                {abbr:"dec", full:"December",  len:31}, 
               ];

main();

/*    - - - - - - - - - - - - - - - - - - - - - - - - - -    */

function main()
  {                            
  let set   = document.getElementById("set");
  let minus = document.getElementById("minus");
  let year  = document.getElementById("year");
  let plus  = document.getElementById("plus");
  let usage = document.getElementById("usage");

  let tmp = new Date();
  let today = {year:tmp.getFullYear(),
               month:tmp.getMonth(),
               date:tmp.getDate(),
              };
/*
*    define all event handlers in section below
*/
  set.addEventListener("click", function()
    {
    let isLeapYear = (new Date(year.value,1,29).getMonth() == 1) ? true : false;
    months[1].len = (isLeapYear) ? 29 : 28;
    if (verify(year.value))
      {
      doCalendar(year.value, today);
      }
    else
      {
      alert("'" + year.value + "' is an invalid year");
      year.value = "";
      usage.click();
      }
    });

  minus.addEventListener("click", function()
    {
    if (year.value > 1)
      {
      year.value--;
      set.click();
      }
    else
      {
      tmp = (year.value == 1) ? "decrementing '" + year.value + "' will be too small"
                         : "'" + year.value + "' is an invalid year";
      alert(tmp);
      year.value = "";
      usage.click();
      }
    });

  plus.addEventListener("click", function()
    {
    if (year.value < 50000)
      {
      year.value++;
      set.click();
      }
    else
      {
      tmp = (year.value == 50000) ? "incrementing '" + year.value + "' will be too large"
                             : "'" + year.value + "' is an invalid year";
      alert(tmp);
      year.value = "";
      usage.click();
      }
    });

  usage.addEventListener("click", function()
    {
    tmp = "(i) enter any year, between 1 and 50000, into the central " +
          "year / value box, and then click the 'SET YEAR' button,\nOR\n" +
          "(ii) click the '>' or '<' button to increment / decrement " + 
          "the current year by one.";
    alert(tmp);
    });

  year.value = today.year;    // initialize 'set' input with current year
  set.click();                // simulate click event to initialize calendar
  }
   
/*    - - - - - - - - - - - - - - - - - - - - - - - - - -    */

function doCalendar(input, today)   // creates annual calendar for input year
  {
/*
*    populate each cell of the outer table with a 8x7 table having
*    the name of a month spanning the top row, the days of the week
*    in the second row, and the calendar days in the remaining 6 rows
*/
  let monthTables = document.getElementsByClassName("month");
  for (let i=0; i<monthTables.length; i++)
    {
    let html = "<table id=" + months[i].abbr + " class=inner>";
    html += "<tr><td class='span' colspan=7>" + months[i].full + "</td></tr>";

    html += "<tr>";
    for (let k=0; k<7; k++)
      {
      html += "<td class='dayname'>" + weekdays[k] + "</td>";
      }
    html += "</tr>";

    let bias = new Date(input,i,1).getDay();
    let maxdate = months[i].len;
    let cell = -1;
    let mod7, typeday;
    html += "<tr>";
    for (let k=0; k<bias; k++)
      {
      cell++;
      mod7 = cell % 7;
      typeday = (0 < mod7 && mod7 < 6) ? 'weekday' : 'weekend';
      html += "<td class=" + typeday + ">&nbsp</td>";     // white-space filler
      }
    let date = 0;
    for (let k=bias; k<7; k++)
      {
      cell++;
      mod7 = cell % 7;
      typeday = (0 < mod7 && mod7 < 6) ? 'weekday' : 'weekend';
      date++;
      if (input == today.year && i == today.month && date == today.date)
        {
        html += "<td id='today'>" + date + "</td>";
        }
      else
        {
        html += "<td class=" + typeday + ">" + date + "</td>";
        }
      }
    html += "</tr>";

    for (let j=2; j<7; j++)
      {
      html += "<tr>";
      for (let k=0; k<7; k++)
        {
        cell++;
        mod7 = cell % 7;
        typeday = (0 < mod7 && mod7 < 6) ? 'weekday' : 'weekend';
        if (date < maxdate)
          {
          date++;
          if (input == today.year && i == today.month && date == today.date)
            {
            html += "<td id='today'>" + date + "</td>";
            }
          else
            {
            html += "<td class=" + typeday + ">" + date + "</td>";
            }
          }
        else
          {
          html += "<td class=" + typeday + ">&nbsp</td>"; // white-space filler
          }
        }
      html += "</tr>";
      }
    html += "</table>";
    monthTables[i].innerHTML = html;
    }
  return;
  }
   
/*    - - - - - - - - - - - - - - - - - - - - - - - - - -    */

function verify(input)      // checks if input year is admissable
  {
  let regex = /^\d{1,5}$/;
  if (regex.test(input) && 1 <= input && input <= 50000)
    {
    return true;
    }
  else
    {
    return false;
    }
  }
