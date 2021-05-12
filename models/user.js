const mongoose = require("mongoose");

const users = mongoose.Schema({
  firstName: { type: String, required: [true, "First Name required"] },
  lastName: { type: String, required: [true, "Last Name required"] },
  email: {
    type: String,
    validate: {
      validator: async function (email) {
        const user = await this.constructor.findOne({ email });
        if (user) {
          if (this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: (props) => "The specified email address is already in use.",
    },
    required: [true, "User email required"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
    select: false,
  },
  mobileNo: { type: String, required: [true, "Mobile No required"] },
  address: { type: String },
});

module.exports = mongoose.model("users", users, "users");
