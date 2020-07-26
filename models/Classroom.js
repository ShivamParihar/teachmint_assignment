const mongoose = require("mongoose");
const { ObjectID } = require("bson");
const User = require("./User");

const ClassroomSchema = new mongoose.Schema(
  {
    Id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    days: {
      type: Array,
      required: true,
    },
    instructorId: {
      type: ObjectID,
      ref: User,
      required: true,
    },
    students: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Classroom = mongoose.model("Classroom", ClassroomSchema);
