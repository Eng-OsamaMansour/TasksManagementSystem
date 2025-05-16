const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const projectSchema = new Schema(
  {
    title:       { type: String, required: true },
    description: { type: String, required: true },
    category:    { type: String, required: true },
    startDate:   { type: Date,   required: true },
    endDate:     { type: Date,   required: true },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref:  'User',
        validate: {
          validator: async function (userId) {
            const user = await mongoose.model('User').findById(userId).select('role');
            return user && user.role === 'student';          
          },
          message: 'Assigned user must have role "student".'
        }
      }
    ],
    status: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
