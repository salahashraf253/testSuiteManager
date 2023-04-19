import mongoose, { Types } from 'mongoose';
const Schema = mongoose.Schema;
const model = mongoose.model;

const testCaseSchema = new Schema<TestCaseBase>({
    metaData: {
        type: Schema.Types.Mixed,
        default: {}
    },
    isSuccessful: {
        type: Schema.Types.Boolean,
        default: true
    },
    parent: {
        testSuite: {
            id: {
                type:mongoose.Schema.Types.ObjectId,
                ref:'testSuite'
            }
        }
    },
    validationTagRefs: {
        type:[mongoose.Schema.Types.ObjectId],
        ref:'validationTag'
    },
});

const testCaseModel = model<TestCaseBase>('testCase',testCaseSchema);
export default testCaseModel;



interface TestCaseBase {
    metaData: object,
    isSuccessful: boolean,
    validationTagRefs: Types.ObjectId[],
    parent: {
        testSuite: {
            id: Types.ObjectId
        }
    }
}