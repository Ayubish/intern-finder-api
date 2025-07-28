import { Express } from "express";
import { Router } from 'express';
import upload from "../config/multer";
import registerCompany from "../controllers/company.controller";
import registerIntern from "../controllers/intern.controller";



const registerRouter = Router();


registerRouter.post('/company',upload.single("image"), registerCompany);
registerRouter.post('/intern',upload.fields(
  [
  { name: "image", maxCount: 1 },
  { name: "resume", maxCount: 1 }
]), registerIntern);




export {
  registerRouter
}