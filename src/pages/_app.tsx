// src/pages/_app.tsx
import { useEffect, useState } from "react";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import type { AppRouter } from "../server/router";
import { supabase } from "../utils/supabaseClient";
import "../styles/globals.css";

import { getPosition } from "../utils/getPosition";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  useEffect(() => {
    getPosition()
      .then((position: any) => {
        setLocation({
          ...location,
          latitude: position?.coords?.latitude.toString(),
          longitude: position?.coords?.longitude.toString(),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const user = supabase.auth.user();

  if (!location.latitude && !location.longitude) {
    return (
      <p>
        Please enable location tracking! We are useless without it. Yours truly,
        totally not the CCP
      </p>
    );
  }
  return <Component props={user} {...pageProps} />;
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },

      // To use SSR properly you need to forward the client's headers to the server
      // headers: () => {
      //   if (ctx?.req) {
      //     const headers = ctx?.req?.headers;
      //     delete headers?.connection;
      //     return {
      //       ...headers,
      //       "x-ssr": "1",
      //     };
      //   }
      //   return {};
      // }
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
