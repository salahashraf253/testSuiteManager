import { Types } from "mongoose";
import validationTagModel from "../model/ValidationTag";
import validationPointModel from "../model/ValidationPoint";
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
        const testCase = await testCaseModel.findById(testCaseId, { validationTagRefs: false, __v: false }).exec();
        if (!testCase) {
            throw new NotFoundError(`Test Case with id '${testCaseId}' was not found!`);
        }

        // Check if test suite exists
        const testSuite = await TestSuite.findById(testSuiteId, { testCaseRefs: false, validationTagRefs: false, __v: false }).exec();
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

export async function insertValidationTagForTestSuite(testSuiteId: string, validationTagInfo: ValidationTagInsertion) {
    let validationTagId: Types.ObjectId | undefined = undefined;

    try {
        // Check if test suite exists
        const testSuite = await TestSuite.findById(testSuiteId, { testCaseRefs: false, validationTagRefs: false, __v: false }).exec();
        if (!testSuite) {
            throw new NotFoundError(`Test Suite with id '${testSuiteId}' was not found!`);
        }

        // Prepare validation tag and insert it to the DB
        validationTagInfo.parent = {
            testSuite: {
                id: new Types.ObjectId(testSuiteId)
            }
        };
        const validationTag = await validationTagModel.create(validationTagInfo);
        console.log(validationTag);
        validationTagId = validationTag._id;

        // Add validation tag id to test suite in the database
        await addValidationTagToTestSuite(testSuiteId, { id: validationTagId });
        return _idToid(validationTag.toJSON())

    } catch (err: unknown) {
        console.log(err);
        if (validationTagId) {
            await validationTagModel.findByIdAndDelete(validationTagId);
        }
        throw err;
    }
}

export async function addValidationTagToTestSuite(testSuiteId: string, validationTag: { id?: Types.ObjectId, _id?: Types.ObjectId }) {
    try {
        const t = await TestSuite.findByIdAndUpdate(testSuiteId, {
            $push: {
                validationTagRefs: (validationTag.id) ? validationTag.id : validationTag._id
            }
        })

    } catch (err: unknown) {
        throw new LinkingResourcesError(`Couldn't link validation tag to test test suite with id '${testSuiteId}'`)
    }
}

export async function getValidationTag(validationTagId: string) {
    // Check if validation tag exists
    const validationTag = await validationTagModel.findById(validationTagId, { __v: false }).exec();
    if (!validationTag) {
        throw new NotFoundError(`Validation tag with id '${validationTagId}' was not found!`);
    }

    // Get all validation points documents from given references and add them to the returned object
    const validationPoints = await validationPointModel.find({ _id: { $in: validationTag.validationPointRefs } }, { __v: false });
    if (!validationPoints) {
        throw new NotFoundError(`Validation point was not found!`);
    }

    // Remove validationPointRefs from the returned object
    let validationTagObj: any = validationTag.toJSON();
    validationTagObj.validationPointRefs = undefined;

    return _idToid({ ...validationTagObj, validationPoints });
}

export async function getValidationTags() {
    // Get all validation tags, with validationPointRefs substituted with their actual documents
    const validationTags = await validationTagModel.find({}, { __v: false }).populate('validationPointRefs', { __v: false });

    if (!validationTags) {
        throw new NotFoundError(`Error listing all validation tags!`);
    }

    // Map validationTags to their embedded form
    return validationTags.map((validationTag) => {
        const validationPoints = validationTag.validationPointRefs;

        // Remove validationPointRefs from the returned object
        let validationTagObj: any = validationTag.toJSON();
        validationTagObj.validationPointRefs = undefined;

        return _idToid({ ...validationTagObj, validationPoints });
    });
}

export async function getValidationTagsForTestCase() {
    // Get all validation tags, with validationPointRefs substituted with their actual documents
    const validationTags = await validationTagModel
        .find({ 'parent.testCase': { $exists: true } }, { __v: false })
        .populate('validationPointRefs', { __v: false });

    if (!validationTags) {
        throw new NotFoundError(`Error listing all validation tags!`);
    }

    // Map validationTags to their embedded form
    return validationTags.map((validationTag) => {
        const validationPoints = validationTag.validationPointRefs;

        // Remove validationPointRefs from the returned object
        let validationTagObj: any = validationTag.toJSON();
        validationTagObj.validationPointRefs = undefined;

        return _idToid({ ...validationTagObj, validationPoints });
    });
}

// TODO: Implement this function
export async function getValidationTagsForTestSuite() { }
