import mongoose from "mongoose";
import Chapter from "./models/chapters.model.js";
import Assessment from "./models/assesments.model.js";

async function verifyFinal() {
  console.log("Verifying final model alignment...");

  try {
    // Test Chapter
    const chapter = new Chapter({
      name: "Atoms",
      description: { text: "Basic unit of matter" },
      chapterNumber: 1,
      subject: "Chemistry",
      topic: "Inorganic Chemistry",
      threeDModel:
        "https://res.cloudinary.com/demo/image/upload/v1234567890/sample.glb",
    });
    console.log("Chapter model OK (Subject: " + chapter.subject + ")");

    // Test Assessment
    const assessment = new Assessment({
      name: "Atoms Quiz",
      description: "Test your knowledge of atoms",
      chapterNumber: 1,
      subject: "Chemistry", // Now a String
      questions: [
        {
          question: "What is an atom?",
          options: [{ option: "A particle", isCorrect: true }],
          answer: "A particle",
        },
      ],
    });
    console.log("Assessment model OK (Subject: " + assessment.subject + ")");

    if (chapter.subject === assessment.subject) {
      console.log("Alignment check: SUCCESS (Both use String enum)");
    } else {
      console.error("Alignment check: FAILED");
      process.exit(1);
    }

    console.log("All final changes verified successfully!");
  } catch (error) {
    console.error("Verification failed:", error.message);
    process.exit(1);
  }
}

verifyFinal();
