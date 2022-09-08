import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getProduct(req, res)
    case "DELETE":
      return deleteProduct(req, res)
    case "PUT":
      return updateProduct(req, res)
  }
}

const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  if (typeof id === "string") {
    const result = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    })
    return res.status(200).json(result)
  }
}

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  if (typeof id === "string") {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    })
    return res.status(204).send("deleted product")
  }
}
const updateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const { name, description, price, image } = req.body
  try {
    if (typeof id === "string") {
      await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
          name,
          description,
          image,
          price,
        },
      })
      return res.status(204).send("eliminado")
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
