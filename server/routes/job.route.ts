import { Router } from 'express';
import upload from "../config/multer";

import registerIntern from "../controllers/intern.controller";
import { getTotalPosts, postJob } from "../controllers/jobs.controller";



const job = Router();


job.post('/internship', postJob);
job.get('/internships', getTotalPosts);




export {job}
