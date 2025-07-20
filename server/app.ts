import express from 'express';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";

const app = express();

// app.use(cors({
//   origin:["http://localhost:3000"],
//   credentials:true
// }))
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());


app.get('/home', (req, res) => {
  res.send('Hello from app.ts');
});


export default app;
