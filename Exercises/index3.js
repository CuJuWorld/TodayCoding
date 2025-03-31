var moment = require('moment');
require('moment-countdown'); // Import moment-countdown

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

    // Calculate countdown until the event
    const countdownTimer = eventMoment.countdown(now);

    // Format the countdown to a human-readable string
    const formattedCountdown = countdownTimer.toString();

    return formattedCountdown;
}

// Example usage
const eventDate = "2025-03-13T17:06:06"; // Specify your event date here
const locale = "en"; // Specify your locale here, such as "zh-hk"

const countdownOutput = countdown(eventDate, locale);
console.log(countdownOutput);