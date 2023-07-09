const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getSpecificUser,
  getCurrentUser,
  selectTrainer,
  setTrainee,
} = require("../controllers/usersController");

router.get("/", getAllUsers);

router.get("/:id", getSpecificUser);

router.get("/users/me", getCurrentUser);

router.put("/:id/trainer", selectTrainer);

router.put("/:id/trainees", setTrainee);

module.exports = router;
