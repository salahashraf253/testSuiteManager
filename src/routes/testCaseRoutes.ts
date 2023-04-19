import express from "express";
import { creatingTestCase, fetchingTestCaseById, listingTestCases } from "../controllers/TestCaseController";

export const testCaseRouter = express.Router()

testCaseRouter.get('/testCases/:testCaseId', fetchingTestCaseById)

testCaseRouter.post('/testSuite/:testSuiteId/testCases/', creatingTestCase)

testCaseRouter.get('/testCases/', listingTestCases)
