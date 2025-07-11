const bcrypt = require('bcrypt');

async function comparePassword(plainPassword, hashedPassword) {
  if (!plainPassword || !hashedPassword) {
    throw new Error('Password or hash is missing');
  }
  return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = comparePassword;
