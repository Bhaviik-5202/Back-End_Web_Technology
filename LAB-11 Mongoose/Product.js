const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3020;

const DB_API = "mongodb://localhost:27017/Product_DB";

app.use(express.json());

mongoose.connect(DB_API)
  .then(() => console.log("Product Database Connected..."))
  .catch(err => console.error("MongoDB Connection Error:", err));

const productSchema = new mongoose.Schema({
  productName: String,
  productPrice: Number,        
  hireDate: {                
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

/* =========================
   ROUTES
   ========================= */

// Get all Products
app.get('/product', async (req, res) => {
  try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// get all Products by id
app.get('/product/:id', async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).send("Product Not Found");
      }

      res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Invalid Product ID" });
    }
});

// Add new Product
app.post('/product', async (req, res) => {
  try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();

      res.status(201).json(savedProduct);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
  }
});

// Update Product by id
app.put('/product/:id', async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new : true}
    );

    if (!updateProduct) {
        return res.status(404).send("Product Not Found");
      };

    res.statusCode(200).json(updateProduct);
  } catch (error) {
    res.status(400).json({ error: "Invalid Faculty ID" });
  }
});

// Delete Product by ID
app.delete('/product/:id', async (req, res) => {
    try {
      const deleteProduct = await Product.findByIdAndDelete(req.params.id);

      if (!deleteProduct) {
        return res.status(404).json({ error: "Product Does Not Exist." });
      };

      res.status(200).json({ message: "Product Deleted Successfully." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});