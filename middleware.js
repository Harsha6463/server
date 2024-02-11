const ERROR_KEYS = require("./src/common/errorkeys");

const authentication = function (req, res, next) {
  console.log(req.url);
  console.log(req.headers);

  try {
    if (req.headers.authentication) {
      //     const token = req.headers.authentication.replace("Bearer",'')
      //    var decoded = jwt.sign(token,securitykey)
      next();
    } else {
      throw Error(ERROR_KEYS.UNAUTHORISED);
    }
  } catch (error) {
    console.log(error.message);
    if (error.message == ERROR_KEYS.UNAUTHORISED) {
      res.status(401).send({ message: error.message });
    } else {
      res.status(500).send({ message: error.message });
    }
  }
};

module.exports = { authentication };
