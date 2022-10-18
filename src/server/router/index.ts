// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { weatherRouter } from "./weather/get-weather";
import { weatherCronRouter } from "./weather/new-weather-cron";
import { weatherText } from "./weather/trigger-weather-text";
import { quoteRouter } from "./quotes/get-quote";
import { factRouter } from "./facts/get-fact";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("weather.", weatherRouter)
  .merge("weather.", weatherCronRouter)
  .merge("weather.", weatherText)
  .merge("quotes.", quoteRouter)
  .merge("facts.", factRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
