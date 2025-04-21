const searchYoutube = require('youtube-api-v3-search');

class YouTubeService {
  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY;
  }

  async searchContent(query, maxDuration) {
    try {
      const options = {
        q: query,
        part: 'snippet',
        type: 'video',
        maxResults: 5,
        videoDuration: this._getDurationParameter(maxDuration)
      };

      const results = await searchYoutube(this.apiKey, options);

      return results.items.map(item => ({
        title: item.snippet.title,
        creator: item.snippet.channelTitle,
        sourceId: item.id.videoId,
        thumbnail: item.snippet.thumbnails.medium.url,
        source: 'youtube'
      }));
    } catch (error) {
      console.error('YouTube API error:', error);
      throw new Error('Failed to fetch YouTube content');
    }
  }

  _getDurationParameter(maxDuration) {
    if (maxDuration <= 15) return 'short'; // < 4 minutes
    if (maxDuration <= 30) return 'medium'; // 4-20 minutes
    return 'long'; // > 20 minutes
  }
}

module.exports = new YouTubeService();