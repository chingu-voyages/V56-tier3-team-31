const Patient = require("../models/Patient");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { io } = require("../lib/socket");

const createPatient = async (req, res) => {
  const patient = await Patient.create(req.body);
  io.emit("addPatientStatus", patient);
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
  if (status === 7) return; //Do nothing when patient status is dimissal
  io.emit("updatePatientStatus", patient);

  res.status(StatusCodes.OK).json({ patient });
};
const deletePatient = async (req, res) => {
  const { id: patientId } = req.params;

  const patient = await Patient.findOne({ _id: patientId });

  if (!patient) {
    throw new CustomError.NotFoundError(`No Patient with id : ${patientId}`);
  }

  await Patient.deleteOne({ _id: patientId });
  res.status(StatusCodes.OK).json({ msg: "Success! Patient removed." });
};
const displayPatientStatus = async (req, res) => {
  const patients = await Patient.find({ status: [1, 2, 3, 4, 5, 6] }).select(
    "firstName lastName status no id"
  );
  patients.sort((a, b) => a.status - b.status);

  res.status(StatusCodes.OK).json({ patients });
};
module.exports = {
  displayPatientStatus,
  updatePatientStatus,
  getAllPatients,
  getSinglePatient,
  createPatient,
  deletePatient,
  updatePatient,
};
