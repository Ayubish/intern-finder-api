import { Router } from "express";
import upload from "../config/multer";

import {
  getAllPosts,
  getCompanyPosts,
  getPostById,
  postJob,
} from "../controllers/jobs.controller";
import { verifyCompanyAccess } from "../middlewares/auth.middleware";

const job = Router();

job.get("/", getAllPosts);
job.get("/:userId", verifyCompanyAccess, getCompanyPosts);
job.post("/create", verifyCompanyAccess, upload.none(), postJob);
job.get("/detail/:id", getPostById);



// allpost , get all campany post , create post 

export { job };
