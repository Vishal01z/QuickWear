import express from "express";

const router = express.Router();

// Sample route
router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      name: "White T-Shirt",
      price: 499,
      description: "Comfortable cotton t-shirt",
    },
    {
      id: 2,
      name: "Denim Jacket",
      price: 1299,
      description: "Stylish and warm denim jacket",
    },
  ]);
});

export default router;
