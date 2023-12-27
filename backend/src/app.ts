import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import appRouter from "./routes";

config();
const app = express();

/* middleware codes */
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
