import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { prisma } from "../lib/prisma";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { CustomError } from "../utils/customError";

export const applyForJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session?.user?.id) {
      throw new CustomError("Not authenticated", 401);
    }

    const userId = session.user.id;
    const { jobId } = req.params;

    const intern = await prisma.intern.findUnique({ where: { userId } });
    if (!intern) {
      throw new CustomError("No intern profile found", 403);
    }

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      throw new CustomError("Job not found", 404);
    }

    // handle resume file upload
    let resumeUrl;
    if (req.file) {
      const cleanFileName = req.file.originalname.replace(/\s+/g, "-");
      const extension = path.extname(cleanFileName);
      let filename = cleanFileName.split(".")[0];
      filename = `${filename}-${Date.now()}${extension}`;

      const uploadDir = path.join(__dirname, "../../uploads/application");
      const filePath = path.join(uploadDir, filename);

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      await fs.promises.writeFile(filePath, req.file.buffer);
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      resumeUrl = `${baseUrl}/static/application/${filename}`;
    }

    const { coverLetter } = req.body;
    if (!coverLetter) {
      throw new CustomError("Cover letter is required", 400);
    }

    const application = await prisma.application.create({
      data: {
        resume: resumeUrl,
        coverLetter,
        jobId: job.id,
        companyId: job.companyId,
        internId: intern.id,
      },
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    next(error);
  }
};
export const updateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "under_review",
      "interview",
      "accepted",
      "rejected",
    ];
    if (!status || !allowedStatuses.includes(status)) {
      throw new CustomError("Invalid application status", 400);
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      throw new CustomError("Application not found", 404);
    }

    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: { status },
    });

    res.status(200).json({
      message: "Application status updated successfully",
      application: updatedApplication,
    });

    // console.log(application);
  } catch (error) {
    next(error);
  }
};
export const preCheckJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session?.user?.id) {
      throw new CustomError("Not authenticated", 401);
    }

    const userId = session.user.id;
    const { jobId } = req.params;

    const intern = await prisma.intern.findUnique({ where: { userId } });
    if (!intern) {
      throw new CustomError("No intern profile found", 403);
    }

    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId,
        internId: intern.id,
      },
    });

    if (existingApplication) {
      return res.json({
        applied: true,
        status: existingApplication.status,
      });
    }

    return res.json({
      applied: false,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const companyId = req.user.campanyId;
    const getApplicant = await prisma.application.findMany({
      where: { companyId },
      include: {
        intern: true,
        job: true,
      },
    });
    res.json(getApplicant);
  } catch (error) {
    next(error);
  }
};
export const getSingleApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const applicationId = req.params.applicationId;
    const getApplication = await prisma.application.findFirst({
      where: { id: applicationId },
      include: {
        intern: true,
        job: true,
      },
    });
    res.json(getApplication);
  } catch (error) {
    next(error);
  }
};
