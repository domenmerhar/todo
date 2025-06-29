import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import pool from "../db/pool";

export const auth = betterAuth({
  plugins: [username({ minUsernameLength: 3, maxUsernameLength: 20 })],

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  database: pool,
});
