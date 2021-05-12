const User = require("./../models/user");
const bcrypt = require("bcrypt");

// API for Register User Or Create User
exports.register = (req, res) => {

  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      return res.status(401).json({
        error: err,
      });
    } else {
      const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        mobileNo: req.body.mobileNo,
        address: req.body.address,
      };
      const user = new User(data);
      user.save((err, registeredUser) => {
        if (!err) {
          return res.status(201).send(registeredUser);
        } else {
          return res.status(401).send(err);
        }
      });
    }
  });
};


// API for Display Users list
exports.users = (req, res) => {

  let page = req.query.page || 1;
  let limit = req.query.limit || 5;
  User.find((err, users) => {
    if (!err) {
      return res.status(200).json({
        status: "success",
        page: page,
        data: { users },
      });
    } else {
      return res.status(401).json({
        error: err,
      });
    }
  })
    .skip(limit * page - limit)
    .limit(limit * 1); // limit converted into number
};


// API for Update user
exports.updateUser = (req, res) => {

  User.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobileNo: req.body.mobileNo,
      address: req.body.address,
    },
    (err, user) => {
      if (!err) {
        return res.status(200).json({
          status: "success",
          data: { user },
        });
      } else {
        return res.status(401).json({
          error: err,
        });
      }
    }
  );
};

// API for Delete User
exports.deleteUser = (req, res) => {

  User.findByIdAndDelete(req.params.id, (err, user) => {

    if (!err) {
      return res.status(200).json({
        status: "success",
        data: { user },
      });
    } else {
      return res.status(401).json({
        error: err,
      });
    }
  })
}


// API for Search Users By Single key word
exports.searchUser = (req, res) => {

  let condition = {};

  if (req.query.firstName) {
    condition.firstName = req.query.firstName;
  } else if (req.query.lastName) {
    condition.lastName = req.query.lastName;
  } else if (req.query.email) {
    condition.email = req.query.email;
  } else if (req.query.mobileNo) {
    condition.mobileNo = req.query.mobileNo;
  } else {
    condition = {};
  }

  let page = req.query.page || 1;
  let limit = req.query.limit || 5;
  User.find(condition, (err, users) => {
    if (!err) {
      return res.status(200).json({
        status: "success",
        page: page,
        data: { users },
      });
    } else {
      return res.status(401).json({
        error: err,
      });
    }
  })
    .skip(limit * page - limit)
    .limit(limit * 1); 
};
