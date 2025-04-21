const express = require('express');
const Topic = require('../models/Topic');
const auth = require('../middleware/auth');
const aiService = require('../services/ai');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { title, description, preferredDuration, sources } = req.body;

    const topic = new Topic({
      user: req.user.userId,
      title,
      description,
      preferredDuration,
      sources
    });

    await topic.save();

    // Generate initial content recommendations
    const queries = await aiService.generateContentQueries(title, description);
    
    res.status(201).json({
      topic,
      queries
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create topic' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const topics = await Topic.find({ user: req.user.userId })
      .sort('-createdAt');
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch topics' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const topic = await Topic.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    const learningPath = await aiService.suggestLearningPath(
      topic.title,
      topic.progress
    );

    res.json({
      topic,
      learningPath
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch topic' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, preferredDuration, sources, status } = req.body;

    const topic = await Topic.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId
      },
      {
        title,
        description,
        preferredDuration,
        sources,
        status
      },
      { new: true }
    );

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update topic' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const topic = await Topic.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    res.json({ message: 'Topic deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete topic' });
  }
});

module.exports = router;