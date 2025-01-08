const mongoose = require("mongoose");

const FormsSchema = new mongoose.Schema({
    form_name: {
        type: String,
        required: [true, "Please provide the form name!"],
        unique: false,
    },

    form_data: {
        type:  JSON,
        required: [true, "Please provide some components in forms!"],
        unique: false,
    }},

    {timestamps: true},

)

module.exports = mongoose.model.Forms || mongoose.model("Forms", FormsSchema);