const Patient = require("../models/Patient");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createPatient = async (req, res) => {
  const patient = await Patient.create(req.body);
  res.status(StatusCodes.CREATED).json({ patient });
};
const getAllPatients = async (req, res) => {
  const patients = await Patient.find({});

  res.status(StatusCodes.OK).json({ patients });
};
const getSinglePatient = async (req, res) => {
  const { id: patientId } = req.params;

  const patient = await Patient.findOne({ _id: patientId });

  if (!patient) {
    throw new CustomError.NotFoundError(`No Patient with id : ${patientId}`);
  }

  res.status(StatusCodes.OK).json({ patient });
};
const updatePatient = async (req, res) => {
  const { id: patientId } = req.params;

  const patient = await Patient.findOneAndUpdate({ _id: patientId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!patient) {
    throw new CustomError.NotFoundError(`No Patient with id : ${patientId}`);
  }

  res.status(StatusCodes.OK).json({ patient });
};
const updatePatientStatus = async (req, res) => {
  const { id: patientId } = req.params;
  const { status } = req.body;
  const patient = await Patient.findOneAndUpdate(
    { _id: patientId },
    { status },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!patient) {
    throw new CustomError.NotFoundError(`No Patient with id : ${patientId}`);
  }

  res.status(StatusCodes.OK).json({ patient });
};
const deletePatient = async (req, res) => {
  const { id: patientId } = req.params;

  const patient = await Patient.findOne({ _id: patientId });

  if (!patient) {
    throw new CustomError.NotFoundError(`No Patient with id : ${patientId}`);
  }

  await Patient.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Patient removed." });
};

module.exports = {
  updatePatientStatus,
  getAllPatients,
  getSinglePatient,
  createPatient,
  deletePatient,
  updatePatient,
};
