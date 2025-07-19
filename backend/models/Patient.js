const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    no: {
      type: String,
      trim: true,
      required: [true, "Please provide patient No."],
      maxlength: [6, "No. can not be more than 6 characters"],
    },
    firstName: {
      type: String,
      trim: true,
      required: [true, "Please provide first name"],
      maxlength: [100, "first can not be more than 100 characters"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Please provide last name"],
      maxlength: [100, "Last name can not be more than 100 characters"],
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    telephone: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    status: {
      type: Number,
      required: [true, "Please provide the status"],
      min: 1,
      max: 7,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", PatientSchema);
