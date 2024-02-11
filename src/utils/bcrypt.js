const bcrypt = require("bcrypt");

const saltRounds = 15;
// 

const encryptedPassword = function (password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePassword = function (password, hash) {
  const passMatch = bcrypt.compareSync(password, hash);
  return passMatch;
};

module.exports = {encryptedPassword,comparePassword}
