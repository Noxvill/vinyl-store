const Producto = require('../models/producto.models');

const handleGetAllProducts = async (req, res) => {
  try {
    const productos = await Producto.getAllProducts(req.query);
    res.json(productos);
  } catch (error) {
    res.status(500).send('Error');
  }
};

const handleCreateProduct = async (req, res) => {
  const { titulo, descripcion, precio, categoria_id, artista, ano, formato, condicion } = req.body;
  const newProduct = await Producto.createProduct({
    titulo, descripcion, precio, categoria_id, vendedor_id: req.user.id, artista, ano, formato, condicion
  });
  res.json({ id: newProduct.id, message: 'Producto publicado exitosamente' });
};

module.exports = { handleGetAllProducts, handleCreateProduct };
