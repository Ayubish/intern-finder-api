import { Router } from "express";
import upload from "../config/multer";

import {
  getAllPosts,
  getCompanyPosts,
  postJob,
} from "../controllers/jobs.controller";
import { verifyCompanyAccess } from "../middlewares/auth.middleware";

const job = Router();

job.get("/", getAllPosts);
job.get("/:userId", verifyCompanyAccess, getCompanyPosts);
job.post("/create", verifyCompanyAccess, upload.none(), postJob);

export { job };
