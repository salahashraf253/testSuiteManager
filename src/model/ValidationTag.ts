import mongoose from 'mongoose';
const Schema=mongoose.Schema;
const model=mongoose.model;

const validationTagSchema=new Schema({
    metaData: Schema.Types.Mixed,
    validationPointRefs:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'validationPoint'
    },
    isSuccessful:Boolean,
});

const validationTagModel=model('validationTag',validationTagSchema);
export default validationTagModel;