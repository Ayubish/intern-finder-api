
import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { prisma } from "../lib/prisma";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { CustomError } from "../utils/customError";

export const applicationController = async (
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

        // check intern profile
        const intern = await prisma.intern.findUnique({ where: { userId } });
        if (!intern) {
            throw new CustomError("No intern profile found", 403);
        }

        // check job
        const job = await prisma.job.findUnique({ where: { id: jobId } });
        if (!job) {
            throw new CustomError("Job not found", 404);
        }
        const existingApplication = await prisma.application.findFirst({
            where: {
                jobId: job.id,
                internId: intern.id,
            },
        });

        if (existingApplication) {
            throw new CustomError("You have already applied for this job.", 400);
        }
        // handle resume file upload
        let resumeUrl;
        if (req.file) {
            const cleanFileName = req.file.originalname.replace(/\s+/g, "-");
            const extension = path.extname(cleanFileName);
            let filename = cleanFileName.split(".")[0];
            filename = `${filename}-${Date.now()}${extension}`;

            const uploadDir = path.join(__dirname, "../../public/application/resume");
            const filePath = path.join(uploadDir, filename);

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            await fs.promises.writeFile(filePath, req.file.buffer);
            const baseUrl = `${req.protocol}://${req.get("host")}`;
            resumeUrl = `${baseUrl}/application/resume/${filename}`;
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


