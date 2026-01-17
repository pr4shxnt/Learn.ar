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
    type: String,
    required: true,
    enum: ["Chemistry", "Biology"],
  },
  topic: {
    type: String,
    required: true,
    enum: (subject) => {
      if (subject === "Chemistry") {
        return [
          "Organic Chemistry",
          "Inorganic Chemistry",
          "Physical Chemistry",
        ];
      } else {
        return ["Anatomy", "Cells", "Genetics"];
      }
    },
  },
  threeDModel: {
    type: String,
    required: true,
  },
});

const Chapter = mongoose.model("Chapter", chapterSchema);
export default Chapter;
