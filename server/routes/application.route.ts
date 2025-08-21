import { Router } from "express";
import upload from "../config/multer";


import { verifyCompanyAccess, verifyInternAccess } from "../middlewares/auth.middleware";
import {applyForJob, preCheckJob, updateStatus } from "../controllers/application.controller";

const application = Router();

application.post("/:jobId/apply",upload.single("resume"),applyForJob);
// application.put("/update/status",updateStatus);
// application.get("/checkJob",preCheckJob);
// application.get("/getCampantApplication",preCheckJob);





export { application };
