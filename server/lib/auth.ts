import { betterAuth, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",

    }),
    emailAndPassword: {
    enabled: true, 
    
  },
  session:{

  },
  user: {
  additionalFields: {
    role: { type: "string" }
  }
}
});

