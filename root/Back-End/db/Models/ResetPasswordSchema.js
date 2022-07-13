const mongoose = require("mongoose");

const ResetPasswordSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    resetCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResetPassword", ResetPasswordSchema);
