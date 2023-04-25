import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const model = mongoose.model;

const testSuiteSchema = new Schema({
    metaData: Schema.Types.Mixed,
    isSuccessful: Boolean,
    testCaseRef: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'testCase'
    },

    validationTagRefs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'validationTag',
        default: []
    }

});

const TestSuite = model('testSuite', testSuiteSchema);
// export default TestSuite;
module.exports = { TestSuite };
