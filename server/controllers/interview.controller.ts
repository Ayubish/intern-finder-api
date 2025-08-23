import { Express, NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";
import { prisma } from "../lib/prisma";


export const createInterview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { internId, jobId } = req.params;
      const { date, type, location, platform, link } = req.body;
  
      const companyId = req.user.companyId;
  
      if (!internId || !date) {
        throw new CustomError("Intern ID and date are required", 400);
      }
  
      
      const job = await prisma.job.findFirst({
        where: {
          id: jobId,
          companyId: companyId,
        },
      });
  
      if (!job) {
        throw new CustomError("Job not found or access denied", 404);
      }
  
      const intern = await prisma.intern.findUnique({
        where: { id: internId },
      });
  
      if (!intern) {
        throw new CustomError("Intern not found", 404);
      }
  
 
      const existingInterview = await prisma.interview.findFirst({
        where: {
          jobId,
          internId,
        },
      });
  
      if (existingInterview) {
        throw new CustomError(
          "Interview already scheduled for this intern and job",
          409
        );
      }
  
   
      const interview = await prisma.interview.create({
        data: {
          jobId,
          internId,
          date: new Date(date),
          type,
          location,
          platform,
          link,
        },
        include: {
          job: true,
          intern: true,
        },
      });
  
      res.status(201).json(interview);
    } catch (error) {
      next(error);
    }
  };
  

export const getCompanyInterviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { companyId } = req.user.companyId;

    const interviews = await prisma.interview.findMany({
      where: {
        job: {
          companyId: companyId,
        },
      },
    //   include: {
    //     job: true,
    //     intern: true,
    //   },
      orderBy: {
        date: 'asc',
      },
    });

    res.json(interviews);
  } catch (error) {
    next(error);
  }
};


export const getJobInterviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobId } = req.params;
  const companyId = req.user.companyId;
    

    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        companyId: companyId,
      },
    });

    if (!job) {
      throw new CustomError("Job not found or access denied", 404);
    }

    const interviews = await prisma.interview.findMany({
      where: {
        jobId,
      },
      include: {
        intern: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    res.json(interviews);
  } catch (error) {
    next(error);
  }
};

export const getCompanyInterviewById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { companyId } = req.user.companyId;

    const interview = await prisma.interview.findFirst({
      where: {
        id,
        job: {
          companyId: companyId,
        },
      },
      include: {
        job: true,
        intern: true,
      },
    });

    if (!interview) {
      throw new CustomError("Interview not found or access denied", 404);
    }

    res.json(interview);
  } catch (error) {
    next(error);
  }
};

export const updateInterview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { date, type, location, platform, link } = req.body;

    
    const existingInterview = await prisma.interview.findUnique({
      where: { id },
      include: {
        job: true,
      },
    });

    if (!existingInterview) {
      throw new CustomError("Interview not found", 404);
    }

    // Update the interview
    const updatedInterview = await prisma.interview.update({
      where: { id },
      data: {
        date: date ? new Date(date) : undefined,
        type,
        location,
        platform,
        link,
      },
      include: {
        job: true,
        intern: true,
      },
    });

    res.json(updatedInterview);
  } catch (error) {
    next(error);
  }
};


export const deleteInterview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Check if interview exists
    const existingInterview = await prisma.interview.findUnique({
      where: { id },
    });

    if (!existingInterview) {
      throw new CustomError("Interview not found", 404);
    }

    // Delete the interview
   const deletedInterview = await prisma.interview.delete({
      where: { id },
    });

    res.status(204).json(deleteInterview);
  } catch (error) {
    next(error);
  }
};

// Intern side APIs

export const getInternInterviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { internId } = req.user.internId;

    const interviews = await prisma.interview.findMany({
      where: {
        internId,
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    res.json(interviews);
  } catch (error) {
    next(error);
  }
};

export const getInterviewById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { internId } = req.user.internId;

    const interview = await prisma.interview.findUnique({
      where: { id },
      include: {
        job: {
          include: {
            company: true,
          },
        },
        intern: true,
      },
    });

    if (!interview) {
      throw new CustomError("Interview not found", 404);
    }

    res.json(interview);
  } catch (error) {
    next(error);
  }
};

// // PATCH /interviews/:id/confirm
export const confirmInterview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { confirmed } = req.body;

    if (typeof confirmed !== 'boolean') {
      throw new CustomError("Confirmed field must be a boolean", 400);
    }

   
    const existingInterview = await prisma.interview.findUnique({
      where: { id },
    });

    if (!existingInterview) {
      throw new CustomError("Interview not found", 404);
    }

    
    const updatedInterview = await prisma.interview.update({
      where: { id },
      data: {
        confirmed: confirmed,
        updatedAt: new Date(),
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
        intern: true,
      },
    });

    res.json({
      ...updatedInterview,
      message: `Interview ${confirmed ? 'confirmed' : 'unconfirmed'} successfully`,
    });
  } catch (error) {
    next(error);
  }
};
