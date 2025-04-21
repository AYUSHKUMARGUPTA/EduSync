const express = require('express');
const Content = require('../models/Content');
const auth = require('../middleware/auth');
const youtubeService = require('../services/youtube');
const aiService = require('../services/ai');

const router = express.Router();

router.post('/recommend', auth, async (req, res) => {
  try {
    const { topicId, query } = req.body;

    // Fetch content from YouTube
    const youtubeResults = await youtubeService.searchContent(query, 30);

    // Analyze content relevance using AI
    const contentWithScores = await Promise.all(
      youtubeResults.map(async (content) => {
        const relevanceScore = await aiService.analyzeContentRelevance(
          query,
          content.title,
          content.description
        );
        return { ...content, relevanceScore };
      })
    );

    // Sort by relevance score
    const recommendations = contentWithScores
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 3);

    // Save recommendations to database
    const savedContent = await Promise.all(
      recommendations.map(async (rec) => {
        const content = new Content({
          topic: topicId,
          title: rec.title,
          source: rec.source,
          sourceId: rec.sourceId,
          creator: rec.creator,
          thumbnail: rec.thumbnail,
          relevanceScore: rec.relevanceScore,
          duration: 30 // Default duration, should be fetched from API
        });
        return content.save();
      })
    );

    res.json(savedContent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recommendations' });
  }
});

router.get('/topic/:topicId', auth, async (req, res) => {
  try {
    const content = await Content.find({
      topic: req.params.topicId
    }).sort('-relevanceScore');

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch content' });
  }
});

router.put('/:id/complete', auth, async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      {
        status: 'completed',
        completedAt: new Date()
      },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark content as completed' });
  }
});

module.exports = router;