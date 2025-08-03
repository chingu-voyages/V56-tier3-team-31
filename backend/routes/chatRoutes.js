const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const { createChatResponse } = require("../controllers/chatController");

router.route("/").post(createChatResponse);

module.exports = router;
