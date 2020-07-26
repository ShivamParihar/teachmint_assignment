const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const { shivamAuth, userAuth } = require("../../middleware/auth");
const User = require("../../models/User");
const Classroom = require("../../models/Classroom");
const { Types } = require("mongoose");
const { findOneAndDelete } = require("../../models/User");

// @route    POST api/users
// @desc     Register user
// @access   User
router.post(
  "/add",
  (req, res, next) => userAuth(req, res, next, "Teacher"),
  async (req, res) => {
    const {
      Id,
      name,
      subject,
      startTime,
      endTime,
      days,
      instructorId,
      students,
    } = req.body;

    let classroom = await Classroom.findOne({ Id });

    if (classroom) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Classroom with Id already exists" }] });
    }

    try {
      classroom = new Classroom({
        Id,
        name,
        subject,
        startTime,
        endTime,
        days,
        instructorId,
        students,
      });

      await classroom.save();
      res.status(200).json("classroom Created !!");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.get("/classroom-list", async (req, res) => {
  const { sortBy, classnameFilter, subjectFilter } = req.query;

  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;

    // create match filter
    const matchFilter = {};
    if (subjectFilter !== "all") matchFilter["subject"] = subjectFilter;
    if (classnameFilter !== "all") matchFilter["name"] = classnameFilter;

    // sort
    const sortFilter = {};
    if (sortBy === "name") sortFilter["name"] = 1;
    else if (sortBy === "subject") sortFilter["subject"] = 1;
    else sortFilter["createdAt"] = 1;

    if (req.user.userType === "Teacher") {
      matchFilter["instructorId"] = Types.ObjectId(req.user.id);

      let classrooms = await Classroom.aggregate([
        {
          $match: matchFilter,
        },
        {
          $sort: sortFilter,
        },
      ]);

      res.send({ classrooms: classrooms, userType: "Teacher" });
    } else {
      let classrooms = await Classroom.find({
        students: Types.ObjectId(req.user.id),
      });
      console.log(classrooms);
      res.send({ classrooms: classrooms, userType: "Student" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete(
  "/delete-classroom/:id",
  (req, res, next) => userAuth(req, res, next, "Teacher"),
  async (req, res) => {
    console.log("asdfg", req.params.id);
    try {
      await Classroom.findOneAndDelete({ Id: req.params.id });
      res.send("Deleted successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  }
);

router.get("/specfic-classroom/:id", async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;

    const data = await Classroom.findOne({ Id: req.params.id });
    res.send({ data: data, userType: req.user.userType });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post(
  "/update-classroom",
  (req, res, next) => userAuth(req, res, next, "Teacher"),
  async (req, res) => {
    try {
      await Classroom.findOneAndUpdate({ Id: req.body.data.Id }, req.body.data);
      res.send("Updated Successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
    res.send("sad");
  }
);

module.exports = router;
