import { Express } from "express";
import { Router } from 'express';
import companyController from "../controllers/company.controller";
// import upload from "../config/multer";

// import path from "path";
// import sharp from "sharp";
// import fs from "fs";




// declare const __filename: string;
// declare const __dirname: string;


const registerRouter = Router();


registerRouter.post('/company', companyController);

export {
  registerRouter
}