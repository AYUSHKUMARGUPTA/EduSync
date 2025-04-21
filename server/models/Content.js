const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  source: {
    type: String,
    enum: ['youtube', 'spotify'],
    required: true
  },
  sourceId: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // Duration in minutes
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  relevanceScore: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  status: {
    type: String,
    enum: ['pending', 'scheduled', 'completed'],
    default: 'pending'
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Content', contentSchema);