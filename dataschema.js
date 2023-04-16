/// metaData key is a generic key-value pair supplied by them 


// bson 16mb limit

// mongo Id 12 byte

// TS -> 1 - 1000 TC
// TC -> 1 - 400 VTs
// VT -> 1 - 2000 VP



// Test Suite Collection Schema
{
    id: String,
    isSuccessful: Boolean,
    test_cases_ref: String[],
    
    metaData: Object // Ex: { author: ahmed, xxx: yyy }

    validation_tag_ref: String[]
}

// Test Case Collection Schema
{
    id: String,
    isSuccessful: Boolean,
    parent: {
        testSuite: {
            id: String
        }
    }

    validation_tag_ref: String[]

    metaData: Object // Ex: { author: ahmed, xxx: yyy }
}

// Validation Tag Collection Schema

{
    id: String,
    isSuccessful: Boolean,
    parent: {
        // optional
        test_case: {
            id: String,
        },
        test_suite: {
            id: String,
        },
    }
    validation_point_ref: String[],
        
    metaData: Object // Ex: { author: ahmed, xxx: yyy }
}

// Validation Point Collection Schema
{
    id: String
    type: String, "DUT"
    parent: {
        test_case: {
            id: String,
        },

        test_suite: {
            id: String,
        },

        validation_tag: {
            id: String,
        }
    } 

    body: Object    // An object that is not bound to a certain depth where each depth (or level) contain arbitrary named keys 
                    // except 'metaData' is reserved for having a object value about the metaData of this depth (or level) 
                    // the deepest object must include a result key which has a value similar to what is specified below    
                    // result should be 
                    // result: {
                    //      expected: Number
                    //      tolerance: Number
                    //      actual: Number
                    //      status: Boolean
                    // }
                    // 
                    // Example: body: { 
                    //    instance: {
                    //        metaData: {
                    //             xyz: 'something about the instance'
                    //        },
                    //        rx: {
                    //            metaData: {},
                    //            result: {
                    //                 expected: 1,
                    //                 tolerance: 0,
                    //                 actual: 1,
                    //                 status: True
                    //            }
                    //        },
                    //        tx: {
                    //            metaData: {},
                    //            result: {
                    //                 ...
                    //            }
                    //        },
                    //        xyz: {
                    //             metaData: {},
                    //             zzz: {
                    //                   metaData: {},
                    //                   result: {
                    //                       ...
                    //                   }
                    //             }
                    //         }
                    //     }
                    // }
    metaData: Object // Ex: { author: ahmed, xxx: yyy }
}