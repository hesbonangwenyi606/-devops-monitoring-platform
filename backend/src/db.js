const { PrismaClient } = require('@prisma/client');  // ✅ import Prisma
const prisma = new PrismaClient();

module.exports = prisma;
