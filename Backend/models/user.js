const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique:  true,
      trim:    true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      required: true,
      enum: ['admin', 'student']          
    },
    universityID: {
      type: String,
      required: function () {         
        return this.role === 'student';
      }
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  if (this.role === 'admin') {
    this.universityID = undefined;       
  }
  next();
});

module.exports = mongoose.model('User', userSchema);