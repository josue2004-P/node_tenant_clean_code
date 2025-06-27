const express = require('express');
const router = express.Router();
const redisClient = require('../../../../config/redisClient');

// Ruta para probar guardar y leer valor en Redis
router.get('/test', async (req, res) => {
  const testKey = 'test-key';
  const testValue = '¡Redis funciona! ' + new Date().toISOString();

  try {
    // Guardar valor en Redis con TTL 30 seg
    await redisClient.set(testKey, testValue, { EX: 30 });

    // Leer valor guardado
    const value = await redisClient.get(testKey);

    res.json({
      message: 'Prueba Redis exitosa',
      key: testKey,
      value
    });
  } catch (error) {
    console.error('Error en Redis test:', error);
    res.status(500).json({ error: 'Error conectando a Redis' });
  }
});

module.exports = router;
