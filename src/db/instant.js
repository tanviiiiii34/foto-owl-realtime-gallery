import { init } from "@instantdb/react";

console.log(
  "Instant App ID:",
  import.meta.env.VITE_INSTANT_APP_ID
);

export const db = init({
  appId: import.meta.env.VITE_INSTANT_APP_ID,
});
