import { Router } from "express";
import upload from "../config/multer";

import registerIntern from "../controllers/intern.controller";
import { verifyUser } from "../middlewares/auth.middleware";

const internRouter = Router();

internRouter.post(
  "/register",
  verifyUser,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  registerIntern
);

export { internRouter };
