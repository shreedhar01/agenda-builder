import express, { type Express  ,type NextFunction, type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import { ApiError } from "@repo/shared-types";
import cors from "cors"

import authRouter from "./api_v1/routes/auth.routes.js"
import userRouter from "./api_v1/routes/user.routes.js"
import clubRouter from "./api_v1/routes/club.routes.js"
import agendaRouter from "./api_v1/routes/agenda.routes.js"
import agendaItemRouter from "./api_v1/routes/agendaItem.routes.js"

const app:Express = express();

app.use(cors({
  origin:["http://localhost:3000"],
  credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  return res.send("server is running");
});

app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/club", clubRouter)
app.use("/agenda", agendaRouter)
app.use("/agendaItem", agendaItemRouter)

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.error,
      data: err.data
    })
  }

  console.error(err);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: [],
    data: []
  })
})

// Export for Vercel serverless
export default app;

// Local development server
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
}