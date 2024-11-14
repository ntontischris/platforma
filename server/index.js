import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Generic AI response endpoint
app.post('/api/ai/generate', async (req, res) => {
  try {
    const { prompt, systemPrompt } = req.body;
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    res.json({ response: response.choices[0]?.message?.content });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: 'Failed to generate AI response' });
  }
});

// Structured response endpoint
app.post('/api/ai/structured', async (req, res) => {
  try {
    const { prompt, systemPrompt, schema } = req.body;
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `${systemPrompt}\nProvide response in valid JSON format following this schema:\n${JSON.stringify(schema, null, 2)}`
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const content = response.choices[0]?.message?.content || '';
    const parsedContent = JSON.parse(content);
    
    res.json({ response: parsedContent });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: 'Failed to generate structured AI response' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});