import { Express, NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";

import { prisma } from "../lib/prisma";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";


const postJob = async (req: Request, res: Response, next: NextFunction) => {
 
  try {
    const {
      title,
      type,
      location,
      salary,
      duration,
      startDate,
      deadline,
      description,
      responsibilities,
      requirements,
      benefits,
    } = req.body;

    // Required fields
    const requiredFields = {
      title,
      type,
      location,
      salary,
      duration,
      description,
      responsibilities,
      requirements,
      benefits,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      throw new CustomError(
        `Missing required field(s): ${missingFields.join(", ")}`,
        400
      );
    }

    // Prepare data for Prisma
    const jobData = {
      title,
      type,
      location,
      salary,
      duration,
      startDate,
      deadline,
      description,
      responsibilities,
      requirements,
      benefits,
    };

    // Create job in database
    const job = await prisma.job.create({
      data: jobData,
    });

    res.json(job);
  } catch (error) {
    next(error);
  }
};


const getTotalPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const jobPost = await prisma.job.findMany();
    
      const totalpost = jobPost.length;
   res.json({
  jobPost: jobPost,
  totalpost: totalpost
});
  } catch (error) {
    next(error);
  }
};

export { postJob ,getTotalPosts};
