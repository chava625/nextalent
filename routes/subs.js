const express = require("express");
const { authToken } = require("../middleware/auth");
const { subModel, validSub, editSub } = require("../models/subsModel");
const router = express.Router();

router.get("/", (req, res) => {
  subModel.find({}, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.json(data);
  });
});
router.get("/search", (req, res) => {
  let searchQ = req.query.q;
  let mySearch = new RegExp(searchQ);
  subModel.find(
    {
      $or: [
        { profession: { $regex: mySearch, $options: "i" } },
        { info: { $regex: mySearch, $options: "i" } },
      ],
    },
    (err, data) => {
      if (err) {
        console.log(err);
      }
      res.json(data);
    }
  );
});
router.post("/add", authToken, async (req, res) => {
  const userId = req._id;
  let valid = validSub(req.body);
  if (!valid.error) {
    try {
      const newSub = new subModel({ ...req.body, userId: userId });
      let data = await newSub.save();
      res.json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.status(400).json(valid.error.details);
  }
});
router.put("/edit", authToken, (req, res) => {
  let valid = editSub(req.body);
  if (!valid.error) {
    subModel.updateOne({ userId: req._id }, {$set: req.body}, (err, data) => {
      if (err) {
        res.status(400).json(err);
        return;
      }
      res.json(data);
    });
  } else {
    res.status(400).json(valid.error.details);
  }
});
router.delete("/delete/:id", authToken, (req, res) => {
  let delId = req.params.id;
  subModel.deleteOne({ _id: delId }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.json(data);
  });
});
router.post("/favorite", authToken, (req, res) => {
  subModel.insertMany([req.body], (err, data) => {
    if (err) {
      res.status(400).json(data);
    }
    res.json(data);
  });
});
router.get("/ofUser", authToken, (req, res) => {
  let userId = req._id;
  subModel.find({ userId: userId }, (err, data) => {
    if (err) {
      res.status(401).json(err);
    } else {
      res.json(data);
    }
  });
});
module.exports = router;
