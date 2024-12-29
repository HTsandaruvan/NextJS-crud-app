import ky from "ky";

// On https://my-site.com

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URI, // This prepends a base URL to every request made with this api instance.
  timeout: 60000, // The maximum time (in ms) to wait for a response. 60,000ms = 1 minute.
  retry: 0, // Disables automatic retries. (Set to a number for the number of retry attempts)
});
