const express = require("express");
const bcrypt = require("bcrypt");
const {
  userModel,
  validUser,
  validEditUser,
  validLogin,
  genToken,
} = require("../models/userModel");
const { authToken } = require("../middleware/auth");
const router = express.Router();

router.get("/", (req, res) => {
  userModel.find({}, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

router.get("/current", authToken, (req, res) => {
  userModel.findOne({ _id: req._id }, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(data);
  });
});
router.get("/auth", (req, res) => {
  res.json({ status: "ok" });
});
router.post("/login", async (req, res) => {
  // console.log("req.body", req.body);
  let valid = validLogin(req.body);
  if (!valid.error) {
    try {
      let data = await userModel.findOne({ email: req.body.email });
      if (data) {
        let validPass = await bcrypt.compare(req.body.password, data.password);
        if (!validPass) {
          res.status(401).json({ message: "Password not valid" });
        } else {
          let token = genToken(data._id, data.email);
          res.json({
            token,
            user: data,
          });
        }
      } else {
        res.status(401).json({ message: "user not found!" });
      }
    } catch (err) {
      res.status(401).json(err);
    }
  } else {
    res.status(400).json(valid.error);
  }
});
router.post("/add", async (req, res) => {
  let valid = validUser(req.body);
  console.log(valid);
  if (!valid.error) {
    let salt = await bcrypt.genSalt(12);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    try {
      let data = await userModel.insertMany([req.body], { user: 1, email: 1 });
      res.json(data);
    } catch (err) {
      res.status(400).json({ err });
    }
  } else {
    res.status(400).json(valid.error.details);
  }
});
router.put("/edit", (req, res) => {
  let valid = validEditUser(req.body);
  if (!valid.error) {
    userModel.updateOne({ _id: req.body.id }, req.body, (err, data) => {
      if (err) {
        res.status(400).json(err);
      }
      res.json(data);
    });
  } else {
    res.status(400).json(valid.error.details);
  }
});

module.exports = router;
