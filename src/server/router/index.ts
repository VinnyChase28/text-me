// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { mainRouter } from "./weather/get-weather-data";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("weather.", mainRouter)
  .merge("cron.weather", mainRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
