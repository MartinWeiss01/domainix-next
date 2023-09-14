declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_DOMAINIX_API_URL: string;
    NEXT_PUBLIC_CURRENCY_API_URL: string;
    NEXT_PUBLIC_COOKIE_TOKEN_NAME: string;
    NEXT_PUBLIC_APPLICATION_URL: string;
    JWT_API_CONTROL_KEY: string;
    JWT_API_ISSUER: string;
  }
}