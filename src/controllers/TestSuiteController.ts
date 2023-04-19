import express from 'express';
const TestSuite = require('../model/TestSuite').TestSuite;


export async function getTestSuiteById(request: express.Request, response: express.Response) {
    const id = request.params.id;
    try {
        const filter= {"_id": id};
        const testSuiteToSend = await TestSuite.findOne(filter);
        return response.json(testSuiteToSend);
    } catch (err: any) {
        return response.status(500).json({ message: err.message });
    }
}

export async function getAllTestSuites(request: express.Request, response: express.Response) {
    try {
        const testSuites = await TestSuite.find();
        return response.json(testSuites);
    } catch (err: any) {
        response.status(500).json({ message: err.message });
    }
}

export async function addTestSuite(request: express.Request, response: express.Response) {
    try {
        const testSuite = await new TestSuite(request.body);
        // console.log("testSuite",testSuite);

        const newTestSuite = await testSuite.save();
        return response.status(201).json(newTestSuite);
    } catch (err: any) {
        return response.status(400).json({ message: err.message });
    }   
}

export async function deleteTestSuiteById(request: express.Request, response: express.Response) {
    //TODO: delete all validation tags & test cases  associated with this test suite
    const id = request.params.id;
    try {
        const filter= {"_id": id};
        await TestSuite.deleteOne(filter);
        return response.status(200).json({ message: "TestSuite deleted" });
    } catch (err: any) {
        return response.status(500).json({ message: err.message });
    }
}