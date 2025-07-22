import { Express, NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";

import { prisma } from "../lib/prisma";


const companyController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  
   const users = await prisma.user.findMany();
    res.json(users);
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
