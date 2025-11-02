import { db } from "../config/db.js";

// Create a product (protected)
export const createProduct = (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  const sql = "INSERT INTO products (name, description, price, imageUrl) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, description, price, imageUrl], (err, result) => {
    if (err) return res.status(500).json({ msg: "DB error", err });
    res.status(201).json({ msg: "Product created", id: result.insertId });
  });
};

// Get all products
export const getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json({ msg: "DB error", err });
    res.json(result);
  });
};

// Get a single product
export const getProduct = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM products WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ msg: "DB error", err });
    if (!result.length) return res.status(404).json({ msg: "Product not found" });
    res.json(result[0]);
  });
};

// Update a product (protected)
export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl } = req.body;

  const sql = "UPDATE products SET name=?, description=?, price=?, imageUrl=? WHERE id=?";
  db.query(sql, [name, description, price, imageUrl, id], (err, result) => {
    if (err) return res.status(500).json({ msg: "DB error", err });
    res.json({ msg: "Product updated" });
  });
};

// Delete a product (protected)
export const deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ msg: "DB error", err });
    res.json({ msg: "Product deleted" });
  });
};
