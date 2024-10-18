import dotenv from "dotenv";
import { env } from "../helpers";

export const config = {
  API_VERSION: "v1",
  salt: 10,

  // jwt parameters
  refreshTokenPrivateKey: "secret",
  accessTokenPrivateKey: "secret",
  refreshTokenExpiration: "1m",
  accessTokenExpiration: "1m",

  // token parameters
  refreshTokenName: "refreshToken",
  cookieDomain: "localhost",

  // database
  databaseUrl: "mongodb://authusers:123456@mongo:27017/authusers",
  databaseUser: "authusers",
  databasePassword: "123456",

  // redis
  redisUrl: "redis://alice:foobared@awesome.redis.server:6380",

  smtp: {
    user: "5f5318facc4961",
    pass: "d8b92947e1d106",
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    secure: false,
  },

  CLIENT_URL: "http://localhost:3000",

  resetPasswordAccessTokenPrivateKey: "secret",
  adminAccessTokenPrivateKey: "secret",
  companyAccessTokenPrivateKey: "secret",
};

export const loadConfigVariables = () => {
  // loading .env and .env.local
  dotenv.config();
  dotenv.config({ path: ".env.local" });

  config.salt = env("SALT", config.salt) as number;

  // jwt parameters
  config.refreshTokenPrivateKey = env(
    "REFRESH_TOKEN_PRIVATE_KEY",
    config.refreshTokenPrivateKey,
  ) as string;
  config.accessTokenPrivateKey = env(
    "ACCESS_TOKEN_PRIVATE_KEY",
    config.accessTokenPrivateKey,
  ) as string;
  config.refreshTokenExpiration = env(
    "REFRESH_TOKEN_EXPIRATION",
    config.refreshTokenExpiration,
  ) as string;
  config.accessTokenExpiration = env(
    "ACCESS_TOKEN_EXPIRATION",
    config.accessTokenExpiration,
  ) as string;
  config.resetPasswordAccessTokenPrivateKey = env(
    "RESET_PASSWORD_ACCESS_TOKEN_PRIVATE_KEY",
    config.resetPasswordAccessTokenPrivateKey,
  ) as string;
  config.adminAccessTokenPrivateKey = env(
    "ADMIN_ACCESS_TOKEN_PRIVATE_KEY",
    config.adminAccessTokenPrivateKey,
  ) as string;
  config.companyAccessTokenPrivateKey = env(
    "COMPANY_ACCESS_TOKEN_PRIVATE_KEY",
    config.companyAccessTokenPrivateKey,
  ) as string;

  // token parameters
  config.cookieDomain = env("COOKIE_DOMAIN", config.cookieDomain) as string;

  // database
  config.databaseUrl = env("DATABASE_URL", config.databaseUrl) as string;
  config.databaseUser = env("DATABASE_USER", config.databaseUser) as string;
  config.databasePassword = env("DATABASE_PASSWORD", config.databasePassword) as string;

  // redis
  config.redisUrl = env("REDIS_URL", config.redisUrl) as string;

  config.smtp.host = env("SMTP_HOST", config.smtp.host) as string;
  config.smtp.user = env("SMTP_USER", config.smtp.user) as string;
  config.smtp.pass = env("SMTP_PASS", config.smtp.pass) as string;  
  
  config.CLIENT_URL = env("CLIENT_URL", config.CLIENT_URL) as string;
};  