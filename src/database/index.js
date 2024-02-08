const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); // connect db

module.exports = prisma;
