const express = require("express");
const { authToken } = require("../middleware/auth");
const { favModel, validFav } = require("../models/favoModel");
const router = express.Router();

router.get("/", (req, res, next) => {
  favModel.find({}, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

router.post("/add", authToken, async (req, res, next) => {
  console.log(req.body, "_id", req._id);
  const newFav = { ...req.body, userId: req._id };
  let valid = validFav(newFav);
  if (!valid.error) {
    const exits = await favModel.findOne(newFav);
    if (exits)
      return res
        .status(400)
        .json({ message: `user allready exits in favorites` });

    favModel.insertMany([newFav], (err, data) => {
      if (err) {
        res.status(401).json(err);
        return;
      }
      res.json(data);
      console.log(data);
    });
  } else {
    res.status(400).json(valid.error.details);
  }
});
router.get("/ofUser", authToken, (req, res, next) => {
  let userId = req._id;
  console.log(userId);
  favModel
    .find({ userId: userId })
    .populate("subId")
    .exec()
    .then((data) => {
      res.json(data);
    });
});
router.delete("/delete/:id", authToken, (req, res) => {
  let delId = req.params.id;
  console.log('delete',delId, req._id);
  favModel.deleteOne({ _id: delId, userId: req._id }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.json(data);
  });
});

module.exports = router;
