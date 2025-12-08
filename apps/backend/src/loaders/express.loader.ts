import express from "express";

import authRouter from "../api_v1/routes/auth.routes.js"

export const expressLoader = ():express.Application => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.get("/", (req, res) => {
    res.send("server is running");
  });

  app.use("/auth",authRouter)

  return app;
};