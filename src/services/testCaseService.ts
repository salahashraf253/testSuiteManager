import { Types } from "mongoose";
import { TestCaseInsertion } from "../interfaces/testCaseInterfaces";
import testCaseModel from "../model/TestCase";
import { LinkingResourcesError, NotFoundError } from "../shared/errors";
import { _idToid } from "../shared/utils";
const TestSuite = require('../model/TestSuite').TestSuite;


export async function getTestCaseById(testCaseId: string) {

    try {
        const testCase = await testCaseModel.findById(testCaseId, { validationTagRefs: false, _v: false }).exec()
        if(!testCase) {
            throw new NotFoundError(`Test Case with id '${testCaseId}' was not found!`)
        }
        return _idToid(testCase?.toJSON())
    } catch (err: unknown) {
        throw err
    }
}


export async function insertTestCase(testSuiteId: string, testCaseInfo: TestCaseInsertion) {
    let testCaseId: Types.ObjectId | undefined = undefined;

    try {
        Object.assign(testCaseInfo, {
            parent: {
                testSuite: {
                    id: testSuiteId
                }
            }
        })
        const testCase = await testCaseModel.create(testCaseInfo)
        testCaseId = testCase._id
        await addTestCaseToTestSuite(testSuiteId, testCase)

        return _idToid(testCase.toJSON())
    } catch (err: unknown) {
        console.log(err)
        if(err instanceof LinkingResourcesError) {
            await testCaseModel.findByIdAndDelete(testCaseId)
        }
        throw err
    }
}

export async function addTestCaseToTestSuite(testSuiteId: string, testCase: { id?: Types.ObjectId, _id?: Types.ObjectId } ) {
    try {
        const t = await TestSuite.findByIdAndUpdate(testSuiteId, {
            $push: {
                testCaseRef: (testCase.id) ? testCase.id : testCase._id
            }
        })
        
    } catch (err: unknown) {
        throw new LinkingResourcesError(`Couldn't link validation tag to test case with id '${testSuiteId}'`)
    }
}

export async function addValidationTagToTestCase(testCaseId: string, validationTag: { id?: Types.ObjectId, _id?: Types.ObjectId } ) {
    try {
        await testCaseModel.findByIdAndUpdate(testCaseId, {
            $push: {
                validationTagRefs: (validationTag.id) ? validationTag.id : validationTag._id
            }
        })
    } catch (err: unknown) {
        throw new LinkingResourcesError(`Couldn't link validation tag to test case with id '${testCaseId}'`)
    }
}

// TODO: add filteration options
export async function listTestCases() {
    try {
        const testCases = await testCaseModel.find({}, { validationTagRefs: false }).exec()
        return testCases.map(testCase =>_idToid(testCase.toJSON()))
    } catch (err: unknown) {
        throw err
    }
}


