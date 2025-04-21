const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  preferredDuration: {
    type: String,
    enum: ['short', 'medium', 'long'],
    default: 'medium'
  },
  sources: {
    youtube: {
      type: Boolean,
      default: true
    },
    spotify: {
      type: Boolean,
      default: true
    }
  },
  progress: {
    completed: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'paused'],
    default: 'active'
  },
  lastStudied: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Topic', topicSchema);