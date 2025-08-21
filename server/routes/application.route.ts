import { Router } from "express";
import upload from "../config/multer";


import { verifyInternAccess } from "../middlewares/auth.middleware";
import { applicationController } from "../controllers/application.controller";

const application = Router();

application.post("/:jobId/apply",upload.single("resume"),applicationController);
// application.post("/create");
// application.get("/detail/:id",);
// application.post("/");
// application.put("/update/:id");
// application.put("/delet/:id");



export { application };
