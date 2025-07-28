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
  displayPatientStatus,
} = require("../controllers/patientController");

router.route("/").post(createPatient).get(getAllPatients);
router.route("/displayPatientStatus").get(displayPatientStatus);
router.route("/updatePatientStatus/:id").patch(updatePatientStatus);

router
  .route("/:id")
  .get(authenticateUser, getSinglePatient)
  .patch(updatePatient)
  .delete(deletePatient);

module.exports = router;
