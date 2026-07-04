const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({

    candidateId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Candidate"
    },

    fileName:String,

    filePath:String,

    score:Number,

    uploadedAt:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model("Resume",ResumeSchema);