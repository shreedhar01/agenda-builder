import express, { type NextFunction, type Request, type Response } from "express";

import authRouter from "../api_v1/routes/auth.routes.js"
import { ApiError } from "@agenda-builder/shared-types";

export const expressLoader = ():express.Application => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.get("/", (req:Request, res:Response) => {
    return res.send("server is running");
  });

  app.use("/auth",authRouter)

  app.use((err: Error, req:Request, res:Response, _next:NextFunction)=>{
    if(err instanceof ApiError){
      return res.status(err.statusCode).json({
        success:err.success,
        message:err.message,
        errors:err.error,
        data:err.data
      })
    }
    
    console.error(err);
    return res.status(500).json({
      success:false,
      message:"Internal Server Error",
      error:[],
      data:[]
    })
  })

  return app;
};