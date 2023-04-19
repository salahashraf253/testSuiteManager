import mongoose, { Types } from 'mongoose';
const Schema = mongoose.Schema;
const model = mongoose.model;


// const validationTagSchema = new Schema<ValidationTagBase>({
//     metaData: {
//         type: Schema.Types.Mixed,
//         default: {},
//         required: true
//     },
//     isSuccessful: {
//         type: Schema.Types.Boolean,
//         default: true,
//         required: true
//     },
//     parent: {
//         type: Map,
//         of: new Schema({
//             testCase: {
//                 type: Map,
//                 of: new Schema({
//                     id: {
//                         type: mongoose.Schema.Types.ObjectId,
//                         ref: 'testCase'
//                     }
//                 })
//             },
//             testSuite: {
//                 type: Map,
//                 of: new Schema({
//                     id: {
//                         type: mongoose.Schema.Types.ObjectId,
//                         ref: 'testSuite'
//                     }
//                 })
//             }
//         }),
//         required: true
//     },
//     validationPointRefs: {
//         type: [mongoose.Schema.Types.ObjectId],
//         ref: 'validationPoint',
//         default: []
//     },
// });


const validationTagSchema = new Schema<ValidationTagBase>({
    metaData: {
        type: Schema.Types.Mixed,
        default: {},
        required: true
    },
    isSuccessful: {
        type: Schema.Types.Boolean,
        default: true,
        required: true
    },
    parent: {
        testCase: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'testCase'
            }
        },
        testSuite: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'testSuite'
            }
        }
    },
    validationPointRefs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'validationPoint',
        default: []
    },
});

interface ValidationTagBase {
    metaData: object,
    isSuccessful: boolean,
    parent: {
        testCase: {
            id: Types.ObjectId
        },
        testSuite: {
            id: Types.ObjectId
        }
    }
    validationPointRefs: Types.ObjectId[],
}

const validationTagModel = model<ValidationTagBase>('validationTag', validationTagSchema);
export default validationTagModel;