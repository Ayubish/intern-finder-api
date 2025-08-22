import { Router } from "express";
import upload from "../config/multer";

import {
  getAllPosts,
  getCompanyPosts,
  getPostById,
  modifyPost,
  postJob,
  removePost,
} from "../controllers/jobs.controller";
import { verifyCompanyAccess } from "../middlewares/auth.middleware";

const job = Router();

job.get("/", getAllPosts);
job.get("/detail/:id", getPostById);
job.get("/:userId", verifyCompanyAccess, getCompanyPosts);
job.post("/create", verifyCompanyAccess, upload.none(), postJob);
job.put("/update/:id", verifyCompanyAccess, modifyPost);
job.put("/delet/:id", verifyCompanyAccess, removePost);

export { job };
