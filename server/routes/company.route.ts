import { Router } from "express";
import upload from "../config/multer";
import { getCompanyInfo, registerCompany, updateCompanyProfile } from "../controllers/company.controller";
import { verifyUser } from "../middlewares/auth.middleware";

const companyRouter = Router();

companyRouter.post("/register", verifyUser, upload.single("image"), registerCompany);
companyRouter.post("/update", verifyUser, upload.single("image"), updateCompanyProfile);
companyRouter.get("/", verifyUser, getCompanyInfo);

export { companyRouter };
