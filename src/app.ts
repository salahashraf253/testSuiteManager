import express from 'express'
import buildDatabase from './DataBaseConnection'
require('dotenv').config();
import validationTagModel from './model/ValidationTag';
import mongoose from 'mongoose';
import testCaseModel from './model/TestCase';

import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

const { ObjectID, default: BSON } = require("bson");
export function createApp() {
  buildDatabase();

    const app = express();


    buildDatabase();

  app.use(express.json());

    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
            title: 'Hello World',
            version: '1.0.0',
            },
        },
        apis: ['./src/components/**/*.openapi.yaml'],
    };

    const openapiSpecification = swaggerJsdoc(options);

    app.use('/api', swaggerUi.serve, swaggerUi.setup(openapiSpecification))




    return app
}
