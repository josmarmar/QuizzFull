const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    description: String,
    alternatives: [

        {
            text: {
                type: String,
                required: true
            }, 
            isCorrect: {
                type: Boolean,
                required: true,
                default: false               
            }

        }

    ]

})


module.export = mongoose.model("Question", questionSchema);
//                  nombredelModelo^^    , 