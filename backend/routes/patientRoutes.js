const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  createPatient,
  getAllPatients,
  getSinglePatient,
  updatePatientStatus,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");

router
  .route("/")
  .post([authenticateUser], authorizePermissions("admin"), createPatient)
  .get(getAllPatients);
router
  .route("/updatePatientStatus")
  .post([authenticateUser], updatePatientStatus);

router
  .route("/:id")
  .get(authenticateUser, getSinglePatient)
  .patch([authenticateUser, authorizePermissions("admin")], updatePatient)
  .delete([authenticateUser, authorizePermissions("admin")], deletePatient);

module.exports = router;
