import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";
import { prisma } from "../lib/prisma";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const registerCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, industry, description, size, year, contactEmail, headQuarter, phone, website, additionalLocations, values } =
            req.body;
        const mandatoryData = [name, industry, description, size, year, contactEmail, headQuarter];

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
            throw new CustomError(`Missing required field(s): ${missingFields.join(", ")}`, 400);
        }

        const isUserRegistered = await prisma.user.findUnique({
            where: { id: req.user.id },
        });
        if (isUserRegistered?.completed == true) throw new CustomError("the user registered ", 400);

        let imgUrl;
        if (req.file) {
            const resizedBuffer = await sharp(req.file?.buffer).toBuffer();

            const cleanFileName = req.file?.originalname.replace(/\s+/g, "-");
            let filename = cleanFileName?.split(".")[0];
            filename = `${filename}-${Date.now()}.jpeg`;
            const uploadDir = path.join(__dirname, "../../uploads/profile");
            const filePath = path.join(uploadDir, filename);

            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
            await fs.promises.writeFile(filePath, resizedBuffer);

            const baseUrl = `${req.protocol}://${req.get("host")}`;
            imgUrl = `${baseUrl}/static/profile/${filename}`;
        }

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

const updateCompanyProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, industry, description, size, year, contactEmail, headQuarter, phone, website, additionalLocations, values } =
            req.body;

        // Find the company by user ID
        const company = await prisma.company.findFirst({
            where: { userId: req.user.id },
        });

        if (!company) {
            throw new CustomError("Company not found for this user", 404);
        }

        let imgUrl = company.image;
        if (req.file) {
            const resizedBuffer = await sharp(req.file.buffer).toBuffer();
            const cleanFileName = req.file.originalname.replace(/\s+/g, "-");
            let filename = cleanFileName.split(".")[0];
            filename = `${filename}-${Date.now()}.jpeg`;
            const uploadDir = path.join(__dirname, "../../uploads/profile");
            const filePath = path.join(uploadDir, filename);

            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
            await fs.promises.writeFile(filePath, resizedBuffer);

            const baseUrl = `${req.protocol}://${req.get("host")}`;
            imgUrl = `${baseUrl}/static/profile/${filename}`;
        }

        const updateData: any = {
            ...(name && { name }),
            ...(industry && { industry }),
            ...(description && { description }),
            ...(size && { size }),
            ...(year && { year: parseInt(year) }),
            ...(contactEmail && { contactEmail }),
            ...(headQuarter && { headQuarter }),
            ...(phone && { phone }),
            ...(website && { website }),
            ...(additionalLocations && { additionalLocations }),
            ...(values && { values }),
            ...(imgUrl && { image: imgUrl }),
        };

        const updatedCompany = await prisma.company.update({
            where: { id: company.id },
            data: updateData,
        });

        // Optionally update user profile name/image if changed
        const userUpdateData: any = {};
        if (name) userUpdateData.name = name;
        if (imgUrl) userUpdateData.image = imgUrl;
        if (Object.keys(userUpdateData).length > 0) {
            await prisma.user.update({
                where: { id: req.user.id },
                data: userUpdateData,
            });
        }

        res.json(updatedCompany);
    } catch (error) {
        next(error);
    }
};

const getCompanyInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const company = await prisma.company.findFirst({
            where: { userId: req.user.id },
        });
        res.json(company);
    } catch (error) {
        next(error);
    }
};

export { registerCompany, updateCompanyProfile, getCompanyInfo };
