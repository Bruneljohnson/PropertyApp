declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "test" | "development" | "production";
      PORT: string;

      // AWS S3 Bucket
      AWS_BUCKET_NAME: string;
      AWS_BUCKET_REGION: string;
      AWS_ACCESS_KEY: string;
      AWS_SECRET_ACCESS_KEY: string;
    }
  }
}

declare global {
  namespace Express {
    export interface Request {
      photo?: string;
    }
  }
}
export {};
