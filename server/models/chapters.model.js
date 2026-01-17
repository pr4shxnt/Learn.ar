import mongoose, { model } from "mongoose";

const chapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: Object,
    required: true,
  },
  chapterNumber: {
    type: Number,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  threeDModel: {
    type: String,
    required: true,
  },
});

const Chapter = mongoose.model("Chapter", chapterSchema);
export default Chapter;
