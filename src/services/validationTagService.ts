import { Types } from "mongoose";
// import { TestCaseInsertion } from "../interfaces/testCaseInterfaces";
import validationTagModel from "../model/ValidationTag";
import testCaseModel from "../model/TestCase";
import { LinkingResourcesError, NotFoundError } from "../shared/errors";
import { _idToid } from "../shared/utils";
import { ValidationTagInsertion } from "../interfaces/validationTagInterfaces";
import { addValidationTagToTestCase } from "./testCaseService";
const TestSuite = require('../model/TestSuite').TestSuite;

export async function insertValidationTagForTestCase(testSuiteId: string, testCaseId: string, validationTagInfo: ValidationTagInsertion) {
    let validationTagId: Types.ObjectId | undefined = undefined;

    try {
        // Check if test case exists
        const testCase = await testCaseModel.findById(testCaseId, { validationTagRefs: false, _v: false }).exec();
        if (!testCase) {
            throw new NotFoundError(`Test Case with id '${testCaseId}' was not found!`);
        }

        // Check if test suite exists
        const testSuite = await TestSuite.findById(testSuiteId, { testCaseRefs: false, validationTagRefs: false, _v: false }).exec();
        if (!testSuite) {
            throw new NotFoundError(`Test Suite with id '${testSuiteId}' was not found!`);
        }

        // Check if testCaseId belongs to testSuiteId
        if (!testCase.parent.testSuite.id.equals(new Types.ObjectId(testSuiteId))) {
            throw new LinkingResourcesError(`Test Case with id '${testCaseId}' does not belong to Test Suite with id '${testSuiteId}'!`);
        }

        // Prepare validation tag and insert it to the DB
        validationTagInfo.parent = {
            testCase: {
                id: new Types.ObjectId(testCaseId)
            },
            testSuite: {
                id: new Types.ObjectId(testSuiteId)
            }
        };
        const validationTag = await validationTagModel.create(validationTagInfo);
        console.log(validationTag);
        validationTagId = validationTag._id;

        // Add validation tag id to test case in the database
        await addValidationTagToTestCase(testCaseId, { id: validationTagId });
        return _idToid(validationTag.toJSON())

    } catch (err: unknown) {
        console.log(err);
        if (validationTagId) {
            await validationTagModel.findByIdAndDelete(validationTagId);
        }
        throw err;
    }
}