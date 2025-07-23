import { Express } from "express";
import { Router } from 'express';
import companyController from "../controllers/company.controller";
import upload from "../config/multer";



const registerRouter = Router();


registerRouter.post('/company',upload.single("image"), companyController);

export {
  registerRouter
}