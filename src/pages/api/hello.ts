import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const now :any = await prisma.$queryRawUnsafe("SELECT NOW();")

  res.status(200).json(now[0]["NOW()"])
}
