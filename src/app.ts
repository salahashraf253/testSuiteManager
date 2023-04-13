import express from "express";
import buildDatabase from "./DataBaseConnection";
require("dotenv").config();
import validationTagModel from "./model/ValidationTag";
import mongoose from "mongoose";
import testCaseModel from "./model/TestCase";
const { ObjectID, default: BSON } = require("bson");
export function createApp() {
  buildDatabase();

  const app = express();

  app.use(express.json());

  const validationTagExample: any = {
    metaData: {
      name: "validationTag1",
      description: "This is a validationTag",
      testSuiteRef: "testSuite1",
    },
    isSuccessful: true,
  };

  const testCase: any = {
    metaData: {
      name: "testCase1",
      description: "This is a testCase",
    },
    isSuccessful: false,
    validationTagRefs: [
      new mongoose.Types.ObjectId("64349e56cea28645feb83ffb"),
    ],
  };
  app.get("/validationTags", async (req, res) => {
    const ret: any = await validationTagModel.create(validationTagExample);
    return res.status(200).send(ret);
  });
  app.post("/testCase", async (req, res) => {
    const ret: any = await testCaseModel.create(testCase);
    return res.status(200).send(ret);
  });
  app.put("/testCase", async (req, res) => {
    // let testCase =new testCaseModel(testCaseModel.findById("6434a1a5e7905fe655a5b0b1"));
    // testCase.isSuccessful=true;
    // const ret:any=await testCase.save();
    // return res.status(200).send(ret);
    const _id="6434a1a5e7905fe655a5b0b1";

    const ret = await testCaseModel.updateOne(
      { _id },
      {
        $set: {
          metaData: {
            name2: "hazem",
          },
        },
      }
    );
    return res.status(200).send(ret);
  });

  return app;
}
