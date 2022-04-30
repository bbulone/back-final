// https://mongoosejs.com/docs/schematypes.html
var mongoose = require("mongoose");
const { DateTime } = require("luxon");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var formatDate = function () {
  return DateTime.fromJSDate(this.dateOfBirth).toISODate();
};

var pianoSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true, enum: ["yamaha", "kawai"] },
});

pianoSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

pianoSchema.virtual("id").get(function () {
  return this._id;
});

// Export model.
module.exports = mongoose.model("piano", pianoSchema);
