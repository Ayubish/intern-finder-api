import { Express, NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";
import { log } from "console";
import { prisma } from "../lib/prisma";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import { email, string } from "better-auth/*";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const registerCompany = async (
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
      contactEmail,
      headQuarter,
      phone,
      website,
      additionalLocations,
      values,
    } = req.body;
    const mandatoryData = [
      name,
      industry,
      description,
      size,
      year,
      contactEmail,
      headQuarter,
    ];

    // if (
    //   !name ||
    //   !industry ||
    //   !description ||
    //   !size ||
    //   !year ||
    //   !contactEmail ||
    //   !headQuarter
    // ) {
    //   throw new CustomError("All fields are required", 400);
    // }
    const requiredFields = {
      name,
      industry,
      description,
      size,
      year,
      contactEmail,
      headQuarter,
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

    const isUserRegistered = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    if (isUserRegistered?.completed == true)
      throw new CustomError("the user registered ", 400);

    let imgUrl;
    if (req.file) {
      const resizedBuffer = await sharp(req.file?.buffer).toBuffer();

      const cleanFileName = req.file?.originalname.replace(/\s+/g, "-");
      let filename = cleanFileName?.split(".")[0];
      filename = `${filename}-${Date.now()}.jpeg`;
      const uploadDir = path.join(__dirname, "../../uploads/profile");
      const filePath = path.join(uploadDir, filename);

      if (!fs.existsSync(uploadDir))
        fs.mkdirSync(uploadDir, { recursive: true });
      await fs.promises.writeFile(filePath, resizedBuffer);

      const baseUrl = `${req.protocol}://${req.get("host")}`;
      imgUrl = `${baseUrl}/static/profile/${filename}`;
    }

    // console.log(imgUrl,req.file);

    const companyData = {
      name,
      industry,
      description,
      size,
      year: parseInt(year),
      contactEmail,
      headQuarter,
      phone,
      website,
      additionalLocations,
      values,
      image: imgUrl || null,
      user: { connect: { id: req.user.id } },
    };

    const userData = {
      name,
      image: imgUrl || null,
      completed: true,
    };

    await prisma.$transaction([
      prisma.company.create({
        data: companyData,
      }),
      prisma.user.update({
        where: { id: req.user.id },
        data: userData,
      }),
    ]);

    const companyDb = await prisma.company.findMany({
      where: { userId: req.user.id },
    });

    res.json(companyDb);
  } catch (error) {
    next(error);
  }
};
// const postJob = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const {
//       title,
//       description,
//       deadline,
//       startDate,
//       duration,
//       location,
//       commitment,
//       isPaid,
//       qualifications,
//       requirements,
//       whoCanApply,
//       educationLevel,
//       perks,
//     } = req.body;
//     const mandatoryData = [
//       title,
//       description,
//       deadline,
//       startDate,
//       duration,
//       location,
//       commitment,
//       isPaid,
//       qualifications,
//       requirements,
//       whoCanApply,
//       educationLevel,
//       perks,
//     ];

//     const requiredFields = {
//       title,
//       description,
//       deadline,
//       startDate,
//       duration,
//       location,
//       commitment,
//       isPaid,
//       qualifications,
//       requirements,
//       whoCanApply,
//       educationLevel,
//       perks,
//     };

//     const missingFields = Object.entries(requiredFields)
//       .filter(([_, value]) => !value)
//       .map(([key]) => key);

//     if (missingFields.length > 0) {
//       throw new CustomError(
//         `Missing required field(s): ${missingFields.join(", ")}`,
//         400
//       );
//     }

//     const jobPostData = {
//       title,
//       description,
//       deadline,
//       startDate,
//       duration,
//       location,
//       commitment,
//       isPaid,
//       qualifications,
//       requirements,
//       whoCanApply,
//       educationLevel,
//       perks,
//     };

//     const jobPost = await prisma.post.create({
//       data: jobPostData,
//     });
//     //   prisma.user.update({
//     //     where: { id: req.user.id },
//     //     data: userData,
//     //   }),
//     // ]);

//     // const companyDb = await prisma.company.findMany({
//     //   where: { userId: req.user.id },
//     // });

//     res.json(jobPost);
//   } catch (error) {
//     next(error);
//   }
// };

// const getTotalPosts = async (req: Request, res: Response, next: NextFunction) => {
//   try {

//     const jobPost = await prisma.post.findMany();
//     //   prisma.user.update({
//     //     where: { id: req.user.id },
//     //     data: userData,
//     //   }),
//     // ]);

//     // const companyDb = await prisma.company.findMany({
//     //   where: { userId: req.user.id },
//     // });
//       const totalpost = jobPost.length;
//    res.json({
//   jobPost: jobPost,
//   totalpost: totalpost
// });
//   } catch (error) {
//     next(error);
//   }
// };

export { registerCompany };

// import { Express, NextFunction, Request, Response } from "express";
// import { CustomError } from "../utils/customError";
// import { log } from "console";
// import { prisma } from "../lib/prisma";
// import { fromNodeHeaders } from "better-auth/node";
// import { auth } from "../lib/auth";
// import { string } from "better-auth/*";
// import sharp from "sharp";
// import path from "path";
// import fs from 'fs'

// const companyController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const {
//       name,
//       industry,
//       description,
//       size,
//       year,
//       contactEmail,
//       headQuarter,
//       phone,
//       website,
//       additionalLocations,
//       values,
//     } = req.body;
//     if (
//       !name ||
//       !industry ||
//       !description ||
//       !size ||
//       !year ||
//       !contactEmail ||
//       !headQuarter
//     ) {
//       throw new CustomError("All fields are required", 400);
//     }

//     const isUserRegistered = await prisma.user.findUnique({
//       where: { id: req.user.id },
//     });
//     if (isUserRegistered?.completed ==  true)
//       throw new CustomError("the user registered ", 400);

//    let imgUrl,image;
//    if (req.file){
//    const resizedBuffer = await sharp(req.file?.buffer).toBuffer();

//     const cleanFileName = req.file?.originalname.replace(/\s+/g, "-");
//     let filename = cleanFileName?.split(".")[0];
//     filename = `${filename}-${Date.now()}.jpeg`;
//     const uploadDir = path.join(__dirname, "../../public/logo");
//     const filePath = path.join(uploadDir, filename);

//     if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
//     await fs.promises.writeFile(filePath, resizedBuffer);
//     imgUrl= filename;
//   }

//   const updateData: any = {
//   name: name,
//   completed: true,
//   industry:industry,
//   description:description,
//   size:size,
//   year: parseInt(year),
//   contactEmail:contactEmail,
//   headQuarter:headQuarter,
//   phone:phone,
//   website:website,
//   additionalLocations:additionalLocations,
//   values:values,
// };

// if (imgUrl) {
//   updateData.image = imgUrl;
//   image = imgUrl;
// }

//     const Registere = await prisma.user.update(
//       {
//         where:{id: req.user.id},
//         data:updateData
//       }
//     );
//     const company = await prisma.company.create({
//       data: {
//         name,
//         industry,
//         description,
//         size,
//         year: parseInt(year),
//         contactEmail,
//         headQuarter,
//         phone,
//         website,
//         additionalLocations,
//         values,
//         user: {
//           connect: {
//             id: req.user.id,
//           },
//         },
//       },
//     });

//   const companyDb = await prisma.company.findMany(
//     {
//       where: { userId: req.user.id },
//     }
//   )

//     res.json(companyDb);
//   } catch (error) {
//     next(error);
//   }
// };

// export default companyController;
//
