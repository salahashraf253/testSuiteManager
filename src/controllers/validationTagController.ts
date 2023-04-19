import express from 'express';
import {  } from '../services/validationTagService'
import { ValidationTagInsertion } from '../interfaces/validationTagInterfaces'
import { NotFoundError } from '../shared/errors'

export async function createValidationTagForTestCase(req: express.Request, res: express.Response) {

    const testSuiteId = req.params.testSuiteId;
    const testCaseId = req.params.testCaseId;

    // Check if test suite exists
    // Check if test case exists
    // Check if testCaseId belongs to testSuiteId

    try {

    }

    
    



    // const testCaseInfo: TestCaseInsertion = req.body
    // try {
    //     const testCase = await insertTestCase(testSuiteId, testCaseInfo)
    //     res.status(201).send(testCase)
    // } catch (err: unknown) {
    //     res.status(400).send({ error: 'Error while creating test case.' })
    // }
}