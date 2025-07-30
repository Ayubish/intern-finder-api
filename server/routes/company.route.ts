import { Express } from "express";
import { Router } from 'express';
import upload from "../config/multer";
import registerCompany from "../controllers/company.controller";




const companyRouter = Router();


companyRouter.post('/company',upload.single("image"), registerCompany);




export {
  companyRouter
}