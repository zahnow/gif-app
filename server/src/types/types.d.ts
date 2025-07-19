import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      session?: {
        user: {
          id: string;
          name?: string;
          email?: string;
        };
      };
    }
  }
}
