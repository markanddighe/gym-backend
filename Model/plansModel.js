import mongoose from "mongoose"

const plansSchema = new mongoose.Schema({

   planCategoryId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "plansCategory"
   },

   duration : {
    type : String
   },

   plansImage : {
    type : String
   },

   lock : {
    type : Boolean,
},
  amount:{
    type:Number
  }

},{timestamps : true})


export const Plans = mongoose.model("plans", plansSchema)










































// import mongoose from "mongoose"

// const plansSchema = new mongoose.Schema({

//     bodyBuildingPlans : [{

//         plansImage : {
//             type : String
//         },

//         duration : {
//             type : String
//         },

        // lock : {
        //     type : Boolean,
        // } 
//     }],

//     fatLossPlan : [{

//         plansImage : {
//             type : String
//         },

//         duration : {
//             type : String
//         },

//         lock : {
//             type : Boolean,
//             default  : false
//         }
//     }],

//     specialPlans : [{

//         plansImage : {
//             type : String
//         },

//         duration : {
//             type : String
//         },

//         lock : {
//             type : Boolean,
//             default  : false
//         }

//     }],

//     fitnessPlans : [{

//         plansImage : {
//             type : String
//         },

//         duration : {
//             type : String
//         },

//         lock : {
//             type : Boolean,
//             default  : false
//         }
//     }],

//     powerLiftingPlans : [{

//         plansImage : {
//             type : String
//         },

//         duration : {
//             type : String
//         },

//         lock : {
//             type : Boolean,
//             default  : false
//         }

//     }]

// },{timestamps : true})


// export const Plans = mongoose.model("plans", plansSchema)
 