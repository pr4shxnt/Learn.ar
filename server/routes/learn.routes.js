import express from "express";
import {
  getAllSubjects,
  createSubject,
  getChaptersBySubject,
  createChapter,
  getAssessmentByChapter,
  createAssessment,
} from "../controllers/learn.controller.js";

const router = express.Router();

// Subject routes
router.get("/subjects", getAllSubjects);
router.post("/subjects", createSubject);

// Chapter routes
router.get("/subjects/:subjectId/chapters", getChaptersBySubject);
router.post("/chapters", createChapter);

// Assessment routes
router.get(
  "/subjects/:subjectId/chapters/:chapterNumber/assessment",
  getAssessmentByChapter,
);
router.post("/assessments", createAssessment);

export default router;
