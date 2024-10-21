// const Producto = require('../models/product.models');

// const handleGetAllProducts = async (req, res) => {
//   try {
//     const productos = await Producto.getAllProducts(req.query);
//     res.json(productos);
//   } catch (error) {
//     res.status(500).send('Error');
//   }
// };

// const handleCreateProduct = async (req, res) => {
//   const { titulo, descripcion, precio, categoria_id, artista, ano, formato, condicion } = req.body;
//   const newProduct = await Producto.createProduct({
//     titulo, descripcion, precio, categoria_id, vendedor_id: req.user.id, artista, ano, formato, condicion
//   });
//   res.json({ id: newProduct.id, message: 'Producto publicado exitosamente' });
// };


// // Actualizar un producto existente
// const handleUpdateProduct = async (req, res) => {
//   const { id } = req.params;
//   const { titulo, descripcion, precio, categoria_id, artista, ano, formato, condicion } = req.body;
//   try {
//     const updatedProduct = await Producto.updateProduct(id, {
//       titulo, descripcion, precio, categoria_id, artista, ano, formato, condicion
//     });
//     if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
//     res.json({ message: 'Producto actualizado exitosamente', updatedProduct });
//   } catch (error) {
//     res.status(500).json({ error: 'Error al actualizar el producto' });
//   }
// };

// // Eliminar un producto existente
// const handleDeleteProduct = async (req, res) => {
//   const { id } = req.params;
//   const vendedor_id = req.user.id; // Se asegura de que el vendedor sea el que está logueado
//   try {
//     const deletedProduct = await Producto.deleteProduct(id, vendedor_id);
//     if (!deletedProduct) return res.status(404).json({ message: 'Producto no encontrado o no autorizado para eliminar' });
//     res.json({ message: 'Producto eliminado exitosamente' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error al eliminar el producto' });
//   }
// };

// module.exports = { handleGetAllProducts, handleCreateProduct, handleUpdateProduct, handleDeleteProduct};


const Producto = require('../models/product.models');

const handleGetAllProducts = async (req, res) => {
  try {
    const productos = await Producto.getAllProducts(req.query);
    res.json(productos);
  } catch (error) {
    res.status(500).send('Error');
  }
};

const handleCreateProduct = async (req, res) => {
  const { titulo, descripcion, precio, categoria_id, artista, ano, formato, condicion, imagen_url, estado } = req.body;
  const newProduct = await Producto.createProduct({
    titulo, descripcion, precio, categoria_id, vendedor_id: req.user.id, artista, ano, formato, condicion, imagen_url, estado
  });
  res.json({ id: newProduct.id, message: 'Producto publicado exitosamente' });
};


// Actualizar un producto existente
const handleUpdateProduct = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, precio, categoria_id, artista, ano, formato, condicion } = req.body;
  try {
    const updatedProduct = await Producto.updateProduct(id, {
      titulo, descripcion, precio, categoria_id, artista, ano, formato, condicion
    });
    if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto actualizado exitosamente', updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto existente
const handleDeleteProduct = async (req, res) => {
  const { id } = req.params;
  const vendedor_id = req.user.id; // Se asegura de que el vendedor sea el que está logueado
  try {
    const deletedProduct = await Producto.deleteProduct(id, vendedor_id);
    if (!deletedProduct) return res.status(404).json({ message: 'Producto no encontrado o no autorizado para eliminar' });
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = { handleGetAllProducts, handleCreateProduct, handleUpdateProduct, handleDeleteProduct};
