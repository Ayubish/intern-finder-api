import { Router } from "express";
import upload from "../config/multer";

import {
  verifyCompanyAccess,
  verifyInternAccess,
} from "../middlewares/auth.middleware";
import {
  applyForJob,
  getAllApplication,
  getSingleApplication,
  preCheckJob,
  updateStatus,
} from "../controllers/application.controller";

const application = Router();

application.get("/company", verifyCompanyAccess, getAllApplication);
application.post("/:jobId/apply", upload.single("resume"), applyForJob);
application.put(
  "/update/:applicationId/status",
  verifyCompanyAccess,
  updateStatus
);
application.get("/:applicationId", verifyCompanyAccess, getSingleApplication);
application.get("/precheck/:jobId", preCheckJob);

export { application };
