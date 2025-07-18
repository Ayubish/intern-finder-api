import { z } from "zod";

export const companyOnboardingSchema = z.object({
  // Basic Information
  companyName: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  companySize: z.string().min(1, "Company size is required"),
  foundedYear: z.string().optional(),
  companyLogo: z.any().optional(),

  // Company Details
  description: z.string().min(10, "Description must be at least 10 characters"),
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  headquarters: z.string().min(1, "Headquarters location is required"),
  locations: z.array(z.string()).optional(),

  // Contact Information
  contactEmail: z.string().email("Please enter a valid email address"),
  contactPhone: z.string().optional(),

  // Company Culture
  companyValues: z.array(z.string()).optional(),
});

export type CompanyOnboardingData = z.infer<typeof companyOnboardingSchema>;
