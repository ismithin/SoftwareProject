import { PrismaClient } from '@prisma/client';

// Initialize the Prisma Client
const db = new PrismaClient();

// Export the prisma instance for use in other parts of the app
export { db };

