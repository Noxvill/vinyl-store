const Compra = require('../models/buy.models');

// Manejar la creación de una compra
const handleCreatePurchase = async (req, res) => {
  const { producto_id, monto_pagado } = req.body;
  const comprador_id = req.user.id; // El ID del comprador será el del usuario autenticado
  try {
    const newPurchase = await Compra.createPurchase({
      producto_id,
      comprador_id,
      monto_pagado
    });
    res.json({ id: newPurchase.id, message: 'Compra registrada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar la compra' });
  }
};

// Manejar la obtención de todas las compras
const handleGetAllPurchases = async (req, res) => {
  try {
    const purchases = await Compra.getAllPurchases();
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las compras' });
  }
};

module.exports = {
  handleCreatePurchase,
  handleGetAllPurchases
};
