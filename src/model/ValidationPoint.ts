import mongoose from 'mongoose';
const Schema=mongoose.Schema;
const model=mongoose.model;


const validationPointSchema=new Schema({
    metaData: Schema.Types.Mixed,
    type: Schema.Types.String,
    body:Schema.Types.Mixed,
});
const validationPointModel=model('validationPoint',validationPointSchema);
export default validationPointModel;