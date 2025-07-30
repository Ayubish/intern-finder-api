import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import { verifyUser } from "./middlewares/auth.middleware";
import { companyRouter } from "./routes/company.route";
import { internRouter } from "./routes/intern.route";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());

//   company api
app.use("/api/register",verifyUser,companyRouter)



//intern api
app.use("/api/register",verifyUser,internRouter)


app.use(errorHandler);
export default app;
