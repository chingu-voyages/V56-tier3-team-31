const { StatusCodes } = require("http-status-codes");
require("dotenv").config();
const Patient = require("../models/Patient");
const data = require("./MOCK_DATA.json");
const connectDB = require("../db/connect");
const populateData = async (req, res) => {
  try {
    await connectDB(
      "mongodb+srv://vinhqua:iOw8AMUBSDWGbn6Y@cluster0.uvd1bzz.mongodb.net/Surgery-Status"
    );
    console.log("Connected to the database...");
    const patients = await Patient.insertMany(data);
    console.log(patients);
  } catch (error) {
    console.log(error);
  }
};

populateData();
