import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res)
    case "POST":
      return saveProduct(req, res)
  }
}

const getProducts = async (_req: NextApiRequest, res: NextApiResponse) => {
  const result = await prisma.product.findMany({
    orderBy: { createdAT: "desc" },
  })
  return res.status(200).json(result)
}

const saveProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, description, price, image } = req.body

    const newProduct = await prisma.product.create({
      data: { name, description, image, price },
    })

    return res.status(200).json(newProduct)
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
