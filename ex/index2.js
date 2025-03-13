var requirejs = require('requirejs');
var moment=requirejs('moment');

// Countdown function
function countdown(eventDate, locale) {
    // Set the locale
    moment.locale(locale);

    // Get the current date and time
    const now = moment();

    // Parse the event date
    const eventMoment = moment(eventDate);

    // Check if the event has already ended
    if (now.isAfter(eventMoment)) {
        return "Event has ended.";
    }

    // Calculate the difference in milliseconds
    const duration = moment.duration(eventMoment.diff(now));

    // Extract values
    // Calculate the total duration in complete years
    const years = Math.floor(duration.asYears());
    // Calculate the total duration in weeks and find the remaining weeks that do not form complete years
    const weeks = Math.floor(duration.asWeeks()) % 52; // Number of weeks excluding years
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    // Create an array to hold the countdown parts
    const parts = [];

    // Push only non-zero values to the parts array
    if (years > 0) parts.push(`${years} years`);
    if (weeks > 0) parts.push(`${weeks} weeks`);
    if (days > 0) parts.push(`${days} days`);
    if (hours > 0) parts.push(`${hours} hours`);
    if (minutes > 0) parts.push(`${minutes} minutes`);
    if (seconds > 0) parts.push(`${seconds} seconds`);

    // Join the parts into a single string
    const formattedCountdown = parts.length > 0 ? parts.join(', ') : "Less than a second remaining.";

    return formattedCountdown;
}

// Example usage
const eventDate = "2025-03-13T17:06:06"; // specify your event date here
const locale = "zh-hk"; // specify your locale here

const countdownOutput = countdown(eventDate, locale);
console.log(countdownOutput);