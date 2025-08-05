import { Express } from "express";
import { Router } from "express";
import upload from "../config/multer";
import { registerCompany, postJob, getTotalPosts } from "../controllers/company.controller";

const companyRouter = Router();

companyRouter.post("/register", upload.single("image"), registerCompany);
companyRouter.post("/post", postJob);
companyRouter.get("/getTotalPosts", getTotalPosts);

export { companyRouter };
