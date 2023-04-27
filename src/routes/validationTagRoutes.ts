import express from "express";
import {
    createValidationTagForTestCase,
    createValidationTagForTestSuite,
    fetchValidationTag,
    fetchValidationTags,
    fetchValidationTagsForTestCase,
    fetchValidationTagsForTestSuite,
    changeValidationTag
} from "../controllers/validationTagController";

export const validationTagRouter = express.Router()

validationTagRouter.post('/validationTags/testSuites/:testSuiteId/testCases/:testCaseId', createValidationTagForTestCase);
validationTagRouter.post('/validationTags/testSuites/:testSuiteId', createValidationTagForTestSuite);

validationTagRouter.patch('/validationTags/:validationTagId', changeValidationTag);

validationTagRouter.get('/validationTags/testCases', fetchValidationTagsForTestCase);
validationTagRouter.get('/validationTags/testSuites', fetchValidationTagsForTestSuite);

validationTagRouter.get('/validationTags/:validationTagId', fetchValidationTag);
validationTagRouter.get('/validationTags', fetchValidationTags);
