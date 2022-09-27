// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { weatherRouter } from "./weather/get-weather-data";
import { weatherCronRouter } from "./weather/new-cron-weather";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("weather.", weatherRouter)
  .merge("cron.", weatherCronRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
