const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const Thought = require('./Thought');
const thoughtSchema = require('./Thought')


const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    thoughts: [
      {
        type: [Thought._id],
      },
    ],
    friends:[
      {
        type: [this],
      }
    ]
  },
);
userSchema.virtual('friendCount').get(function(){
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
