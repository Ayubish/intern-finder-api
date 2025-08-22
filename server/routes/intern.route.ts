import { Express } from "express";
import { Router } from 'express';
import upload from "../config/multer";

import registerIntern from "../controllers/intern.controller";



const internRouter = Router();


internRouter.post('/register',upload.fields(
  [
  { name: "image", maxCount: 1 },
  { name: "resume", maxCount: 1 }
]), registerIntern);




export {
  internRouter
}