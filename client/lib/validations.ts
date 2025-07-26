import { z } from "zod";

export const companyOnboardingSchema = z.object({
  // Basic Information
  name: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  size: z.string().min(1, "Company size is required"),
  year: z.string().optional(),
  image: z.any().optional(),

  // Company Details
  description: z.string().min(10, "Description must be at least 10 characters"),
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  headQuarter: z.string().min(1, "headQuarter location is required"),
  additionalLocations: z.array(z.string()).optional(),

  // Contact Information
  contactEmail: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),

  // Company Culture
  values: z.array(z.string()).optional(),
});

export type CompanyOnboardingData = z.infer<typeof companyOnboardingSchema>;

export const internOnboardingSchema = z
  .object({
    // Personal Information
    name: z.string().min(1, "Full name is required"),
    image: z.any().optional(),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.string().min(1, "Gender is required"),
    country: z.string().min(1, "Country is required"),

    // Education
    degree: z.string().min(1, "Please select an option"),
    university: z.string().optional(),
    major: z.string().optional(),
    graduationYear: z.string().optional(),
    gpa: z.string().optional(),

    // Experience
    about: z
      .string()
      .min(10, "About me description must be at least 10 characters"),
    resume: z.any().optional(),
    linkedin: z
      .string()
      .url("Please enter a valid LinkedIn URL")
      .optional()
      .or(z.literal("")),
    github: z
      .string()
      .url("Please enter a valid GitHub URL")
      .optional()
      .or(z.literal("")),
    portfolioUrl: z
      .string()
      .url("Please enter a valid portfolio URL")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      // If degree is not "No Degree", then university, major, and graduationYear are required
      if (data.degree !== "No Degree") {
        return data.university && data.major && data.graduationYear;
      }
      return true;
    },
    {
      message:
        "University, major, and graduation year are required when degree selected",
      path: ["university"], // This will show the error on the university field
    }
  );

export type InternOnboardingData = z.infer<typeof internOnboardingSchema>;
