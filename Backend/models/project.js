const mongoose = require("mongoose");

const schema = mongoose.Schema;
const projectSchema = new schema({
    title:{
        type: String,
        required: true 
    },
    description:{
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    startDate: {
        type: Date, 
        required: true},
    endDate:   {
        type: Date, 
        required: true},
    status:    {
        type: String, 
        required: true}
});

module.exports = mongoose.model('project',projectSchema);   