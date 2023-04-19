import express from "express";
import { createValidationTagForTestCase } from "../controllers/validationTagController";

export const validationTagRouter = express.Router()

validationTagRouter.post('/testSuites/:testSuiteId/testCases/:testCaseId/validationTags', createValidationTagForTestCase);
// validationTagRouter.post('/testSuites/:testSuiteId/validationTags', createValidationTagForTestSuite);

// validationTagRouter.get('/validationTags/:validationTagId', getValidationTag);
// validationTagRouter.get('/validationTags', getValidationTags);
// validationTagRouter.get('/testCases/validationTags', getValidationTagsForTestCase);
// validationTagRouter.get('/testSuites/validationTags', getValidationTagsForTestSuite);