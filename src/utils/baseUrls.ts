//all these are public urls and dont require authentication

export const baseUrls = {
  weather: "https://api.openweathermap.org/data/2.5/weather",
  quote: "https://api.quotable.io/random",
  uselessFacts: "https://uselessfacts.jsph.pl/random.json?language=en",
  cronAdd: "https://www.easycron.com/rest/add",
  newWeatherCron: encodeURI(
    "https://text-me-rouge.vercel.app/api/weather/trigger-weather-text"
  ),
  newQuoteCron: encodeURI(
    "https://text-me-rouge.vercel.app/api/quotes/trigger-quote-text"
  ),
};
