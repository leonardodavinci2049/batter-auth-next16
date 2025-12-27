import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { admin, twoFactor } from "better-auth/plugins";
import { createPool } from "mysql2/promise";
import { envs } from "@/core/config/envs";
import { ac, roles } from "./permissions";
import { sendOtpEmail } from "./send-otp-email";
import { sendResetPasswordEmail } from "./send-reset-password-email";
import { sendVerificationEmail } from "./send-verification-email";

export const auth = betterAuth({
  secret: envs.BETTER_AUTH_SECRET,
  database: createPool({
    host: envs.DB_MYSQL_HOST,
    port: envs.DB_MYSQL_PORT,
    user: envs.DB_MYSQL_USER,
    password: envs.DB_MYSQL_PASSWORD,
    database: envs.DB_MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

    sendResetPassword: async ({ user, url }) => {
      void sendResetPasswordEmail({
        to: user.email,
        subject: "Reset your password",
        url,
      });
    },
  },
  rateLimit: {
    enabled: true,
    window: 10,
    max: 2,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationEmail({
        to: "atiqullah.naemi21@gmail.com",
        verificationUrl: url,
        userName: user.name,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account",
    },
    github: {
      clientId: envs.GITHUB_CLIENT_ID as string,
      clientSecret: envs.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    admin({
      ac,
      roles,
      defaultRole: "user",
      adminRoles: ["admin", "superadmin"],
    }),
    nextCookies(),
    twoFactor({
      skipVerificationOnEnable: true,
      otpOptions: {
        async sendOTP({ user, otp }) {
          sendOtpEmail({ to: user.email, otp });
        },
      },
    }), // make sure this is the last plugin in the array
  ],
});
