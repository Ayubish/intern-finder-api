import { Express, NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";

import { prisma } from "../lib/prisma";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import { error, log } from "console";

const postJob = async (req: Request, res: Response, next: NextFunction) => {
  const companyId = req.user.companyId;
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
      companyId,
      title,
      type,
      location,
      salary,
      duration,
      startDate: new Date(startDate),
      deadline: new Date(deadline),
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

const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs = await prisma.job.findMany();

    res.json(jobs);
  } catch (error) {
    next(error);
  }
};
const getCompanyPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const companyId = req.user.companyId;
  try {
    const jobs = await prisma.job.findMany({ where: { companyId } });

    const totalViews = jobs.reduce((sum, job) => sum + job.views, 0);
    res.json({ jobs, totalViews, totalJobs: jobs.length });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      throw new CustomError(`message: the id not found`, 400);
    }
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });
    if (!job) {
      throw new CustomError(`No user found with ID ${jobId}`, 404);
    }

    res.json(job);
  } catch (error) {
    next(error);
  }
};

// UPDATE JOB POST
const modifyPost = async (req: Request, res: Response, next: NextFunction) => {
  const companyId = req.user.companyId;
  const { id } = req.params;

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

    // Ensure job exists and belongs to the company
    const existingJob = await prisma.job.findUnique({
      where: { id },
    });

    if (!existingJob) {
      throw new CustomError("Job not found", 404);
    }
    console.log(existingJob);
    
    if (existingJob.companyId !== companyId) {
      throw new CustomError("Unauthorized to update this job", 403);
    }

    // Prepare data for update (only fields provided)
    const jobData: any = {
      ...(title && { title }),
      ...(type && { type }),
      ...(location && { location }),
      ...(salary && { salary }),
      ...(duration && { duration }),
      ...(startDate && { startDate: new Date(startDate) }),
      ...(deadline && { deadline: new Date(deadline) }),
      ...(description && { description }),
      ...(responsibilities && { responsibilities }),
      ...(requirements && { requirements }),
      ...(benefits && { benefits }),
    };

    const updatedJob = await prisma.job.update({
      where: { id },
      data: jobData,
    });

    res.json(updatedJob);
  } catch (error) {
    next(error);
  }
};


// DELETE JOB POST
const removePost = async (req: Request, res: Response, next: NextFunction) => {
  const companyId = req.user.companyId;
  const { id } = req.params;

  try {
    const existingJob = await prisma.job.findUnique({
      where: { id },
    });

    if (!existingJob) {
      throw new CustomError("Job not found", 404);
    }
    if (existingJob.companyId !== companyId) {
      throw new CustomError("Unauthorized to delete this job", 403);
    }

    await prisma.job.delete({
      where: { id },
    });

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
};


export { postJob, getAllPosts, getCompanyPosts, getPostById,modifyPost , removePost };
