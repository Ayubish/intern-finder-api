import { Router } from "express";
import {
  // Company side APIs
  createInterview,
  deleteInterview,
  getCompanyInterviewById,
  getCompanyInterviews,
  getInternInterviews,
  getInterviewById,
  getJobInterviews,
  updateInterview,
//   confirmInterview,
} from "../controllers/interview.controller";
import { verifyCompanyAccess, verifyInternAccess, verifyUser } from "../middlewares/auth.middleware";

const interview = Router();

// Company side routes
interview.post("/create/:internId/:jobId", verifyCompanyAccess, createInterview);
interview.get("/:companyId", verifyCompanyAccess, getCompanyInterviews);
interview.get("/jobs/:jobId/", verifyCompanyAccess, getJobInterviews);
interview.get("/companies/interviews/:id", verifyCompanyAccess, getCompanyInterviewById);
interview.put("/interviews/:id", verifyCompanyAccess, updateInterview);
interview.delete("/remove/:id", verifyCompanyAccess, deleteInterview);

// // Intern side routes
interview.get("/interns/", verifyInternAccess, getInternInterviews);
interview.get("/interns/:id", verifyUser, getInterviewById);
// interview.patch("/interviews/:id/confirm", verifyInternAccess, confirmInterview);

export { interview };
