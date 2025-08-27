import { Express, NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";
import { log } from "console";
import { prisma } from "../lib/prisma";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";

import sharp from "sharp";
import path from "path";
import fs from "fs";

const registerIntern = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const imageFile = files["image"]?.[0];
    const resumeFile = files["resume"]?.[0];
    // console.log(imageFile,resumeFile);

    const {
      name,
      dateOfBirth,
      gender,
      country,
      degree,
      university,
      major,
      yearOfGraduation,
      gpa,
      about,
      linkdin,
      github,
      portfolio,
    } = req.body;
    if (!name || !dateOfBirth || !gender || !country || !degree || !about) {
      throw new CustomError("All fields are required", 400);
    }

    if (degree != "No Degree") {
      if (!university || !major || !yearOfGraduation) {
        throw new CustomError(
          "university, major and graduation year are required",
          400
        );
      }
    }

    const isUserRegistered = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    if (isUserRegistered?.completed == true)
      throw new CustomError("the user registered ", 400);

    let imgUrl, resumeUrl;
    if (imageFile) {
      const resizedBuffer = await sharp(imageFile.buffer).toBuffer();

      const cleanFileName = imageFile?.originalname.replace(/\s+/g, "-");
      const extension = path.extname(cleanFileName);
      let filename = cleanFileName?.split(".")[0];
      filename = `${filename}-${Date.now()}${extension}`;
      const uploadDir = path.join(__dirname, "../../uploads/profile");
      const filePath = path.join(uploadDir, filename);

      if (!fs.existsSync(uploadDir))
        fs.mkdirSync(uploadDir, { recursive: true });
      await fs.promises.writeFile(filePath, resizedBuffer);
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      imgUrl = `${baseUrl}/static/profile/${filename}`;
    }

    if (resumeFile) {
      // const resizedBuffer = await sharp(req.file?.buffer).toBuffer();

      const cleanFileName = resumeFile?.originalname.replace(/\s+/g, "-");
      const extension = path.extname(cleanFileName);
      let filename = cleanFileName?.split(".")[0];
      filename = `${filename}-${Date.now()}${extension}`;
      const uploadDir = path.join(__dirname, "../../uploads/resume");
      const filePath = path.join(uploadDir, filename);

      if (!fs.existsSync(uploadDir))
        fs.mkdirSync(uploadDir, { recursive: true });
      // await fs.promises.writeFile(filePath, resizedBuffer);
      await fs.promises.writeFile(filePath, resumeFile?.buffer);
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      resumeUrl = `${baseUrl}/static/profile/${filename}`;
    }

    const internData = {
      name,
      dateOfBirth,
      gender,
      country,
      degree,
      university,
      major,
      yearOfGraduation,
      gpa: parseFloat(gpa),
      portfolio,
      linkdin,
      github,
      about,
      image: imgUrl || null,
      resume: resumeUrl || null,
      user: { connect: { id: req.user.id } },
    };

    const userData = {
      name,
      image: imgUrl || null,
      completed: true,
    };

    const db = await prisma.$transaction([
      prisma.intern.create({
        data: internData,
      }),
      prisma.user.update({
        where: { id: req.user.id },
        data: userData,
      }),
    ]);

    res.json(db);
  } catch (error) {
    next(error);
  }
};

export default registerIntern;

// let resumeUrl;
// if (req.file?.resume) {
//   const resizedBuffer = await sharp(req.file?.buffer).toBuffer();

//   const cleanFileName = req.file?.originalname.replace(/\s+/g, "-");
//   const extension = path.extname(cleanFileName);
//   let filename = cleanFileName?.split(".")[0];
//   filename = `${filename}-${Date.now()}${extension}`;
//   const uploadDir = path.join(__dirname, "../../public/resume");
//   const filePath = path.join(uploadDir, filename);

//   if (!fs.existsSync(uploadDir))
//     fs.mkdirSync(uploadDir, { recursive: true });
//   await fs.promises.writeFile(filePath, resizedBuffer);
//   const baseUrl = `${req.protocol}://${req.get("host")}`;
//   resumeUrl = `${baseUrl}/profile/${filename}`;
// }

// const userData = {
//   name,
//   image: imgUrl || null,
//   completed: true,
// };

// await prisma.$transaction([
//   prisma.intern.create({
//     data: internData,
//   }),
//   prisma.user.update({
//     where: { id: req.user.id },
//     data: userData,
//   }),
// ]);

// const internDb = await prisma.intern.findMany({
//   where: { userId: req.user.id },
// });
// res.json(internDb);
