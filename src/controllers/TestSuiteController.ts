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
        const page: number = parseInt(request.query.page as string, 10) || 1;
        const limit: number = parseInt(request.query.limit as string, 10) || 10;
        let queryObject: {[key: string]: any} = {
            "isSuccessful": request.query.isSuccessful || "",
            'metaData.name': request.query.name || "",
            "metaData.executablePath": request.query.executablePath || "",
            "metaData.author": request.query.author || ""
        };
        for (let key in queryObject) {
            if (!queryObject[key]) {
                delete queryObject[key];
            }
        }
        const testSuites = await TestSuite.find(queryObject)
        .skip((page - 1) * limit)
        .limit(limit);

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

export async function updateTestSuiteById(request: express.Request, response: express.Response) {
    const id = request.params.id;
    const filter= {"_id": id};
    const update = request.body;
    TestSuite.updateOne(filter, {$set:update}).then(() => {
        return response.status(200).json({ message: "TestSuite updated" });
    }).catch((err: any) => {
        return response.status(400).json({ message: err.message });
    });
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