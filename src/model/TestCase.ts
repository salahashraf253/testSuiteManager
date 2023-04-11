import mongoose from 'mongoose';
const Schema=mongoose.Schema;
const model=mongoose.model;

const testCaseSchema=new Schema({
    metaData: Schema.Types.Mixed,
    isSuccessful:Boolean,
    parentInfo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'testSuite'
    },
    validationTagRefs:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'validationTag'
    },
});

const testCaseModel=model('testCase',testCaseSchema);
export default testCaseModel;

