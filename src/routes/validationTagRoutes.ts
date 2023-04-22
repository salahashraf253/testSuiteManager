import express from "express";
import {
    createValidationTagForTestCase,
    createValidationTagForTestSuite,
    fetchValidationTag,
    fetchValidationTags,
    fetchValidationTagsForTestCase,
    fetchValidationTagsForTestSuite
} from "../controllers/validationTagController";

export const validationTagRouter = express.Router()

validationTagRouter.post('/testSuites/:testSuiteId/testCases/:testCaseId/validationTags', createValidationTagForTestCase);
validationTagRouter.post('/testSuites/:testSuiteId/validationTags', createValidationTagForTestSuite);

validationTagRouter.get('/validationTags/:validationTagId', fetchValidationTag);
validationTagRouter.get('/validationTags', fetchValidationTags);
validationTagRouter.get('/testCases/validationTags', fetchValidationTagsForTestCase);
validationTagRouter.get('/testSuites/validationTags', fetchValidationTagsForTestSuite);