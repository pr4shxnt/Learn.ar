import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  chapterNumber: {
    type: Number,
    required: true,
  },
});

const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;
