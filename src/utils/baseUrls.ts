//all these are public urls and dont require authentication
const cronAPIKey = process.env.NEXT_PUBLIC_EASY_CRON_KEY;

export const baseUrls = {
  weather: "https://api.openweathermap.org/data/2.5/weather",
  quote: "https://api.quotable.io/random",
  uselessFacts: "https://uselessfacts.jsph.pl/random.json?language=en",
  cronAdd: "https://www.easycron.com/rest/add",
  cronDelete: `https://www.easycron.com/rest/delete?token=${cronAPIKey}&id=`,
  newWeatherCron: encodeURI(
    "https://text-me-rouge.vercel.app/api/weather/trigger-weather-text"
  ),
  newQuoteCron: encodeURI(
    "https://text-me-rouge.vercel.app/api/quotes/trigger-quote-text"
  ),
};
