//common bot to human conversions

var botUnits = function() {}

botUnits.formatDate = function(timestamp) {
  var date = new Date(timestamp * 1000 );
  //console.log("timestamp:" +timestamp + "\ndate"+date);
  var monthNames = [
    "January [一月]", "February [二月]", "March [三月]",
    "April [四月]", "May [五月]", "June [六月]", "July [七月]",
    "August [八月]", "September [九月]", "October [十月]",
    "November [十一月]", "December [十二月]"
  ];
  var dayNames = [
    "Sunday [星期天]",
    "Monday [星期一]",
    "Tuesday [星期二]",
    "Wednesday [星期三]",
    "Thursday [星期四]",
    "Friday [星期五]",
    "Saturday [星期六]"
  ]

  var weekday = date.getDay();
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();

  return dayNames[weekday] +"  - " + day + ' ' + monthNames[monthIndex] + ' ' + year + ' | '+ h + ":" + m + ":" + s;
}

module.exports = botUnits;
