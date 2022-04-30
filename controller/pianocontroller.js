var Piano = require("../models/piano");

const { param, body, validationResult } = require("express-validator");

exports.create = [
  // Check validation
  body("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage(" name has non-alphanumeric characters."),

  body("brand")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("brand must be specified."),

  // Process Request
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Piano object with escaped and trimmed data
    var Piano = new Piano({
      _id: req.body.id,
      name: req.body.name,
      brand: req.body.class,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Piano.save(function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Piano created successfully !");
      });
    }
  },
];

// Read
exports.getAll = function (req, res, next) {
  Piano.find().exec(function (err, result) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
};

exports.getById = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Piano.findById(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(result);
      });
    }
  },
];

// Delete
exports.delete = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Piano.findByIdAndRemove(req.params.id).exec(function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json("Piano deleted successfully !");
      });
    }
  },
];

// Update
exports.update = [
  param("id")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Id must be specified.")
    .isNumeric()
    .withMessage("Id must be a number."),

  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),

  body("brand")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified."),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Piano object with escaped and trimmed data
    var Piano = new Piano({
      _id: req.params.id,
      name: req.body.name,
      brand: req.body.brand,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      Piano.findByIdAndUpdate(req.params.id, Piano, function (err, result) {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(201).json("Piano updated successfully !");
      });
    }
  },
];
