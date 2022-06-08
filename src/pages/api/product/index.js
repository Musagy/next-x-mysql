import { pool } from "../../../config/db";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    case "POST":
      return saveProduct(req, res);
  }
}

const getProducts = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM products");
  // console.log(result)
  return res.status(200).json(result);
};

const saveProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    const [result] = await pool.query("INSERT INTO products SET ?", {
      name,
      description,
      image,
      price,
    });

    return res.status(200).json({
      name,
      description,
      image,
      price,
      id: result.insertId,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
