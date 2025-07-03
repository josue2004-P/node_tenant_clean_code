const resend = require('../../../config/resend.config');

module.exports = () => {
  return async ({ to, subject, html }) => {
    try {
      // Asegúrate de que `to` sea array
      const lista = Array.isArray(to) ? to : [to];

      // Creamos el array de correos individuales
      const batch = lista.map(email => ({
        from: 'Association Pérez <no-reply@associationperez.online>',
        to: [email],
        subject,
        html
      }));

      const response = await resend.batch.send(batch);

      return { success: true, response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
};
