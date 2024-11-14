import { aiService } from '../../aiService';

export class NLPProcessor {
  async analyzeText(text: string) {
    const analysis = await aiService.post('/ai/nlp/analyze', { text });
    return {
      sentiment: analysis.sentiment,
      concepts: analysis.concepts,
      complexity: analysis.complexity,
      readability: analysis.readability,
      keywords: analysis.keywords,
      suggestions: analysis.suggestions
    };
  }

  async generateResponse(context: string, prompt: string) {
    return aiService.post('/ai/nlp/generate', { context, prompt });
  }

  async extractConcepts(text: string) {
    return aiService.post('/ai/nlp/concepts', { text });
  }

  async simplifyText(text: string, level: string) {
    return aiService.post('/ai/nlp/simplify', { text, level });
  }
}