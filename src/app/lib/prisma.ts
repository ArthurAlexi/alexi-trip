import {PrismaClient} from "@prisma/client"

const globalFoPrisma = global as unknown as { prisma : PrismaClient}

export const prisma = globalFoPrisma.prisma || new PrismaClient({
    log: ['query'],
})

if(process.env.NODE_ENV !== "production") globalFoPrisma.prisma