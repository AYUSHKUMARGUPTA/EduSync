const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class AIService {
  async generateContentQueries(topic, description) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an AI tutor helping to create effective search queries for educational content. Generate specific, targeted search terms that will find high-quality learning materials."
          },
          {
            role: "user",
            content: `Generate 3 specific search queries for learning about "${topic}". Additional context: ${description || 'None provided'}`
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      });

      const queries = completion.choices[0].message.content
        .split('\n')
        .filter(q => q.trim())
        .map(q => q.replace(/^\d+\.\s*/, '').trim());

      return queries;
    } catch (error) {
      console.error('Error generating AI queries:', error);
      throw new Error('Failed to generate content queries');
    }
  }

  async analyzeContentRelevance(topic, contentTitle, description) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an AI content analyzer. Score the relevance of learning content based on the user's learning goals."
          },
          {
            role: "user",
            content: `Score the relevance (0-1) of this content:
              Topic: ${topic}
              Content Title: ${contentTitle}
              Description: ${description}
              Consider factors like: relevance to topic, apparent quality, and learning value.`
          }
        ],
        temperature: 0.3,
        max_tokens: 100
      });

      const score = parseFloat(completion.choices[0].message.content);
      return isNaN(score) ? 0.5 : score;
    } catch (error) {
      console.error('Error analyzing content relevance:', error);
      throw new Error('Failed to analyze content relevance');
    }
  }

  async suggestLearningPath(topic, userProgress) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an AI learning path designer. Create structured learning paths that help users master their chosen topics effectively."
          },
          {
            role: "user",
            content: `Create a learning path for "${topic}". Current progress: ${JSON.stringify(userProgress)}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error generating learning path:', error);
      throw new Error('Failed to generate learning path');
    }
  }
}

module.exports = new AIService();