import { Express } from "express";
import { Router } from "express";
import upload from "../config/multer";
import { registerCompany } from "../controllers/company.controller";
import { verifyUser } from "../middlewares/auth.middleware";

const companyRouter = Router();

companyRouter.post(
  "/register",
  verifyUser,
  upload.single("image"),
  registerCompany
);

export { companyRouter };
