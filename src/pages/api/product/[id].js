import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getProduct(req, res);
    case "DELETE":
      return deleteProduct(req, res);
    case "PUT":
      return updateProduct(req, res);
  }
}

const getProduct = async (req, res) => {
  const { id } = req.query;
  const [result] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
  return res.status(200).json(result[0]);
};

const deleteProduct = async (req, res) => {
  const { id } = req.query;
  await pool.query("DELETE FROM products WHERE id = ?", [id]);
  return res.status(204).json();
};
const updateProduct = async (req, res) => {
  const { id } = req.query;
  const { name, description, price, image } = req.body;
  try {
    await pool.query(
      "UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?",
      [name, description, price, image, id]
    );
    return res.status(204).json();
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};
