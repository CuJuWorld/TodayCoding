var requirejs = require('requirejs');
var moment=requirejs('moment');
// var dateNow = Date.now();  //Current date object 
// console.log("dateNow", dateNow);
// var now = moment(dateNow)
// console.log("now", now);


// Set the locale to Hong Kong
moment.locale('zh-hk');

// Get the current date and time
let now = moment(); // now
now = moment().subtract(1, 'years'); // This will convert AM to PM
now = moment().subtract(3, 'days'); // This will convert AM to PM
now = moment().add(8, 'hours'); // This will convert AM to PM

// Format the date
const formattedDate1 = now.format('YYYY年MM月DD日 hh:mmA').replace('早上', 'AM').replace('下午', 'PM');
const formattedDate2 = now.format('YYYY年M月DD日 hh:mmA').replace('早上', 'AM').replace('下午', 'PM');

// Output the formatted date
console.log(formattedDate1);
console.log(formattedDate2);

moment.locale('en');


