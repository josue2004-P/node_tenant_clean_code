const express = require("express");
const router = express.Router();
const SendEmail = require("../../../../application/use_cases/email/SendEmail");

router.get("/test", async (req, res) => {
  const enviarCorreo = SendEmail(); // inicializamos el caso de uso

  const resultado = await enviarCorreo({
    to: ["josuepe03@hotmail.com"],
    subject: "Correo de prueba",
    html: `
    <h1>Prueba exitosa 🎉</h1>
    <p>Yaa pude ni lic</p>
  `,
  });

  if (resultado.success) {
    res.json({
      message: "Correo enviado correctamente",
      response: resultado.response,
    });
  } else {
    res.status(500).json({
      error: "Error al enviar el email",
      detalle: resultado.error,
    });
  }
});

module.exports = router;
