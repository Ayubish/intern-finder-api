import { Router } from "express";
import upload from "../config/multer";


import { verifyCompanyAccess, verifyInternAccess } from "../middlewares/auth.middleware";
import {applyForJob, getAllApplication, preCheckJob, updateStatus } from "../controllers/application.controller";
import { verify } from "crypto";

const application = Router();

application.post("/:jobId/apply",upload.single("resume"),applyForJob);
application.put("/update/:applicationId/status",verifyCompanyAccess,updateStatus);
application.get("/:applicationId",verifyCompanyAccess,getAllApplication);
application.get("/precheck/:jobId",preCheckJob);





export { application };
