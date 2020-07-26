const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const { adminAuth, userAuth } = require("../../middleware/auth");
const User = require("../../models/User");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/add",
  [
    adminAuth,
    [
      check("name", "Name is required").notEmpty(),
      check("phone", "Please include a valid phoneNumber").notEmpty(),
      check("otp", "Please enter valid OTP")
        .isLength({ min: 6, max: 6 })
        .isNumeric(),
      check("userType").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, otp, userType } = req.body;
    if (!(userType === "Teacher" || userType === "Student")) {
      return res.send("Invalid user type");
    }

    try {
      let user = await User.findOne({ phone });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        phone,
        otp,
        userType,
      });

      await user.save();
      res.status(200).json("register success !!");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post("/login", async (req, res) => {
  const { phone, otp, userType } = req.body;

  try {
    let user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid User" }] });
    }
    if (user.otp != otp || user.userType !== userType) {
      return res.status(400).json({ errors: [{ msg: "Invalid User" }] });
    }

    const payload = {
      user: {
        id: user.id,
        userType: user.userType,
      },
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/get-info", async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;

    const data = await User.findById(req.user.id, {
      name: 1,
      phone: 1,
      userType: 1,
      _id: 0,
    });
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
