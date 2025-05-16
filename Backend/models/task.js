const mongoose = require("mongoose");

const schema = mongoose.Schema;
const taskSchema = new schema({
    name:{
        type: String, 
        required:true
    },
    description:{
        type: String,
         required:true
    },
    status:{
        type: String, 
        required:true,
        enum: ['In Progress','Completed','Canceled','Pending']
    },
    dueDate:{
        type: String, 
        required:true
    },
});

module.exports = mongoose.model('task',taskSchema);