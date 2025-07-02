import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins/username";
import { nextCookies } from "better-auth/next-js";
import { pool } from "./db";

export const auth = betterAuth({
  plugins: [
    username({ minUsernameLength: 3, maxUsernameLength: 20 }),
    nextCookies(),
  ],

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },

    storeSessionInDatabase: true,
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  database: pool,
});
