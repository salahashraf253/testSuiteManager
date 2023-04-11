import mongoose from 'mongoose';
const Schema=mongoose.Schema;
const model=mongoose.model;


const validationPointSchema=new Schema({
    metaData: Schema.Types.Mixed,
    result:{
        type:[
            {
                actualValue:Number,
                expectedValue:Number,
                status:Boolean,
                toleranceData:String
            }
        ]
    },
    body:Schema.Types.Mixed,
});
const validationPointModel=model('validationPoint',validationPointSchema);
export default validationPointModel;