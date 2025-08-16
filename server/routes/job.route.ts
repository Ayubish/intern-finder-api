import { Router } from "express";
import upload from "../config/multer";

import registerIntern from "../controllers/intern.controller";
import { getAllPosts, postJob } from "../controllers/jobs.controller";

const job = Router();

job.get("/", getAllPosts);
job.post("/create", upload.none(), postJob);

export { job };
