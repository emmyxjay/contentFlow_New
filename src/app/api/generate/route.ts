import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { type, topic, keywords, tone, length, mode, platform, existingContent } = await request.json()

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
    }

    let prompt = ''

    // Build prompt based on content type and mode
    if (type === 'blog') {
      if (mode === 'outline') {
        prompt = `Create a detailed blog post outline for "${topic}".

Target keywords: ${keywords || 'none specified'}

Create an outline that includes:
1. A compelling headline (with 2-3 alternatives)
2. Introduction hook
3. 5-7 main sections with H2 headings
4. 2-3 subpoints for each section
5. Key takeaways section
6. Suggested call-to-action
7. Meta description (155 characters max)

Format as a structured outline with clear hierarchy.`
      } else if (mode === 'headline') {
        prompt = `Generate 10 compelling headlines for a blog post about "${topic}".

Keywords to consider: ${keywords || 'none'}

Create headlines that:
1. Are 50-70 characters for optimal SEO
2. Include power words that drive clicks
3. Create curiosity or promise value
4. Include numbers where appropriate
5. Vary in style (how-to, list, question, statement)

Output as a numbered list.`
      } else if (mode === 'rewrite') {
        prompt = `Rewrite the following content to improve its quality and adjust the tone to be more ${tone || 'professional'}.

Original content:
${existingContent}

Requirements:
- Maintain the core message and key points
- Improve clarity and readability
- Enhance engagement and flow
- Fix any grammar or spelling issues
- Keep approximately the same length`
      } else {
        // Generate mode
        const lengthGuide = length === 'short' ? '500-800 words' : length === 'long' ? '2000-3000 words' : '1000-1500 words'
        prompt = `Write a ${lengthGuide} blog post about "${topic}".

Requirements:
- Tone: ${tone || 'professional'}
- Target keywords: ${keywords || 'use relevant keywords naturally'}
- Include an engaging introduction that hooks the reader
- Use clear H2 and H3 headings to structure the content
- Include actionable tips and insights
- End with a compelling conclusion and call-to-action
- Use bullet points and numbered lists where appropriate

Output the content in clean HTML format with proper heading tags (h2, h3), paragraphs (p), and lists (ul, ol).`
      }
    } else if (type === 'social') {
      if (platform === 'linkedin') {
        prompt = `Create a professional LinkedIn post about "${topic}".

Requirements:
- Tone: ${tone || 'professional'}
- 150-300 words
- Start with a hook (first line is crucial)
- Use line breaks for readability
- Include a personal insight or story angle
- End with a question to encourage comments
- Add 3-5 relevant hashtags at the end

Format with proper line breaks for LinkedIn's display.`
      } else if (platform === 'instagram') {
        prompt = `Write an engaging Instagram caption about "${topic}".

Requirements:
- Tone: ${tone || 'casual'}
- 150-300 words
- Start with a hook that stops the scroll
- Tell a mini-story or share an insight
- Include a clear call-to-action
- Add 15-20 relevant hashtags (grouped at the end)
- Include emojis strategically`
      } else {
        // Twitter/X
        prompt = `Create 5 engaging tweets about "${topic}".

Requirements:
- Tone: ${tone || 'casual'}
- Maximum 280 characters each
- Include relevant hashtags (2-3 max per tweet)
- Mix of formats: question, statement, tip, hook
- Encourage engagement
- Include emojis where appropriate

Output as a numbered list.`
      }
    } else if (type === 'email') {
      prompt = `Write a newsletter email about "${topic}".

Requirements:
- Tone: ${tone || 'friendly'}
- Subject line (50 characters max) with 2 alternatives
- Preview text (90 characters max)
- Greeting
- Brief intro (2-3 sentences)
- Main content (3-4 paragraphs)
- Clear CTA button text
- Professional sign-off

Format with clear sections.`
    } else if (type === 'caption') {
      prompt = `Create 5 short captions for ${platform || 'social media'} about "${topic}".

Requirements:
- Tone: ${tone || 'casual'}
- Keep each caption concise and punchy
- Include relevant emojis
- Add 2-3 hashtags per caption
- Make them shareable and engaging

Output as a numbered list.`
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert content writer and marketing specialist. Create high-quality, engaging content that drives results.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const content = completion.choices[0]?.message?.content || ''

    return NextResponse.json({ content })
  } catch (error: any) {
    console.error('OpenAI API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate content' },
      { status: 500 }
    )
  }
}
