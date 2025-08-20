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
job.get("/:userId", verifyCompanyAccess, getCompanyPosts);
job.post("/create", verifyCompanyAccess, postJob);
job.get("/detail/:id", getPostById);

job.put("/update/:id", verifyCompanyAccess, modifyPost);
job.put("/delet/:id", verifyCompanyAccess, removePost);


// allpost , get all campany post , create post 

export { job };
