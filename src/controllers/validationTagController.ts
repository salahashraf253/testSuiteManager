import express from 'express';
import { 
    insertValidationTagForTestCase,
    insertValidationTagForTestSuite,
    getValidationTag,
    getValidationTags,
    getValidationTagsForTestCase,
    getValidationTagsForTestSuite
} from '../services/validationTagService'
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

export async function createValidationTagForTestSuite(req: express.Request, res: express.Response) {
        
    const testSuiteId = req.params.testSuiteId;

    const validationTagInfo: ValidationTagInsertion = req.body;

    try {
        const validationTag = await insertValidationTagForTestSuite(testSuiteId, validationTagInfo);
        res.status(201).send(validationTag);
    } catch (err: unknown) {
        if (err instanceof NotFoundError || err instanceof LinkingResourcesError)
            res.status(err.status).send({ message: err.message });
        else
            res.status(500).send({ message: 'Server Error' });
    }
}

export async function fetchValidationTag(req: express.Request, res: express.Response) {
    const validationTagId = req.params.validationTagId;
    
    try {
        const validationTag = await getValidationTag(validationTagId);
        res.status(200).send(validationTag);
    } catch (err: unknown) {
        if (err instanceof NotFoundError || err instanceof LinkingResourcesError) {
            res.status(err.status).send({ message: err.message });
        } else {
            res.status(500).send({ message: 'Server Error' });
        }
    }
  
}

export async function fetchValidationTags(req: express.Request, res: express.Response) {
    try {
        //TODO: query params and filters should be passed to the service
        const validationTags = await getValidationTags();
        res.status(200).send(validationTags);
    } catch (err: unknown) {
        if (err instanceof NotFoundError || err instanceof LinkingResourcesError) {
            res.status(err.status).send({ message: err.message });
        } else {
            res.status(500).send({ message: 'Server Error' });
        }
    }

}

// TODO: Implemnet this function
export async function fetchValidationTagsForTestCase(req: express.Request, res: express.Response) {
    // getValidationTagsForTestCase()
    res.status(501).send({ message: 'Not Implemented' });
}

// TODO: Implemnet this function
export async function fetchValidationTagsForTestSuite(req: express.Request, res: express.Response) {
    // getValidationTagsForTestSuite()
    res.status(501).send({ message: 'Not Implemented' });
}