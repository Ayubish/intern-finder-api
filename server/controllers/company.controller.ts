import { Express, NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";
import { log } from "console";
import { prisma } from "../lib/prisma";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import { string } from "better-auth/*";
// import sharp from "sharp";
// import path from "path";
// import fs from "fs";

const companyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      industry,
      description,
      size,
      year,
      email,
      location,
      phone,
      website,
      additionalLocations,
      values,
    } = req.body;
    if (
      !name ||
      !industry ||
      !description ||
      !size ||
      !year ||
      !email ||
      !location
    ) {
      throw new CustomError("All fields are required", 400);
    }

    const isUserRegistered = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    if (isUserRegistered?.completed ==  true)
      throw new CustomError("the user registered ", 400);

    const company = await prisma.company.create({
      data: {
        name,
        industry,
        description,
        size,
        year,
        email,
        location,
        phone,
        website,
        additionalLocations,
        values,
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    res.json(company);
  } catch (error) {
    next(error);
  }
};

export default companyController;

//img

// if (!req.file)
//   return res.status(400).json({ message: "No logo image uploaded" });
// if (!req.file.mimetype.startsWith("image/"))
//   throw new CustomError("Uploaded file is not an image", 400);

// const resizedBuffer = await sharp(req.file.buffer).toBuffer();

// const cleanFileName = req.file.originalname.replace(/\s+/g, "-");
// let filename = cleanFileName.split(".")[0];
// filename = `${filename}-${Date.now()}.jpeg`;
// const uploadDir = path.join(__dirname, "../uploads/profile");
// const filePath = path.join(uploadDir, filename);

// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
// await fs.promises.writeFile(filePath, resizedBuffer);
// const img: string = `/uploads/profile/${filename}`;
// const newUser = await prisma.user.update({
//  where: { id: session.user.id },
//  data:{
//     name: name,
//     image: `/uploads/profile/${filename}`
//  }

// });
