const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    username: {
      type: String,
      required: true
    },
    reactions: [
      {
        type: [Reaction.reactionSchema]
      },
    ],
  },
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
