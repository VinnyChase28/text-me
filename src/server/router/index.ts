// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { weatherRouter } from "./weather/get-weather";
import { weatherCronRouter } from "./weather/new-weather-cron";
import { quoteRouter } from "./quotes/get-quote";
import { factRouter } from "./facts/get-fact";
import { quoteCronRouter } from "./quotes/new-quote-cron";
import { getUserSettingsRouter } from "./supabase/get-user-settings";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("weather.", weatherRouter)
  .merge("weather.", weatherCronRouter)
  .merge("quotes.", quoteRouter)
  .merge("quotes.", quoteCronRouter)
  .merge("facts.", factRouter)
  .merge("supabase.", getUserSettingsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
