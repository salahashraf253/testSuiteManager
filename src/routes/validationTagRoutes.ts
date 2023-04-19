import express from "express";
import { createValidationTagForTestCase } from "../controllers/validationTagController";

export const router = express.Router()

router.post('/testSuites/:testSuiteId/testCases/:testCaseId/validationTags', createValidationTagForTestCase);
// router.post('/testSuites/:testSuiteId/validationTags', createValidationTagForTestSuite);

// router.get('/validationTags/:validationTagId', getValidationTag);
// router.get('/validationTags', getValidationTags);
// router.get('/testCases/validationTags', getValidationTagsForTestCase);
// router.get('/testSuites/validationTags', getValidationTagsForTestSuite);

