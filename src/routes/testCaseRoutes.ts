import express from "express";
import { creatingTestCase, fetchingTestCaseById, listingTestCases, updatingTestCase } from "../controllers/TestCaseController";

export const testCaseRouter = express.Router()

testCaseRouter.get('/testCases/:testCaseId', fetchingTestCaseById)

testCaseRouter.patch('/testCases/:testCaseId', updatingTestCase)
testCaseRouter.post('/testSuite/:testSuiteId/testCases/', creatingTestCase)

testCaseRouter.get('/testCases/', listingTestCases)
