const User = require("./../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// API for Login
exports.login = (req, res) => {

  let data = req.body;
  User.findOne({ email: data.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        return res.status(401).send("Please check Email");
      } else {
        bcrypt.compare(data.password, user.password, function (err, result) {
          if (err) {
            console.log(err);
            return res.status(401).json({
              error: err,
            });
          } else {
            if (result) {
              const token = jwt.sign({ sub: user.id }, "secretKey", {
                expiresIn: "7d",
              });
              return res.status(200).send({ id: user.id, token });
            } else {
              return res.status(401).send("Please check Password");
            }
          }
        });
      }
    }
  })
    .select("+password")
    .exec();
};
