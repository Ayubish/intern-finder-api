import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import { registerRouter } from "./routes/register.route";
import { verifyUser } from "./middlewares/auth.middleware";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());


app.use("/api/register",verifyUser,registerRouter)


app.use(errorHandler);
export default app;
