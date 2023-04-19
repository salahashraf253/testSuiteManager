import express from 'express';
import { insertValidationTagForTestCase } from '../services/validationTagService'
import { ValidationTagInsertion } from '../interfaces/validationTagInterfaces'
import { LinkingResourcesError, NotFoundError } from '../shared/errors'

export async function createValidationTagForTestCase(req: express.Request, res: express.Response) {
    
    const testSuiteId = req.params.testSuiteId;
    const testCaseId = req.params.testCaseId;

    const validationTagInfo: ValidationTagInsertion = req.body; 

    try {
        const validationTag = await insertValidationTagForTestCase(testSuiteId, testCaseId, validationTagInfo);
        res.status(201).send(validationTag);
    } catch (err: unknown) {
        if (err instanceof NotFoundError || err instanceof LinkingResourcesError)
            res.status(err.status).send({ message: err.message });
        else
            res.status(500).send({ message: 'Server Error' });
    }
}
