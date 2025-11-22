import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json()

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
    }

    const prompt = `You are a content strategist. Generate 4 unique content ideas for the topic: "${topic}"

For each idea, provide a JSON object with these exact fields:
- title: A compelling, specific headline (50-70 characters)
- description: Brief description of the content angle (1-2 sentences)
- keywords: Array of 4 relevant keywords
- searchVolume: Estimated monthly searches (number between 1000-20000)
- competition: One of "low", "medium", or "high"
- searchIntent: One of "informational", "commercial", "transactional", or "navigational"
- score: Content opportunity score from 60-95
- source: One of "trending", "keyword", "question", or "competitor"

Return ONLY a valid JSON array with 4 idea objects. No other text or explanation.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a JSON-only response bot. Return only valid JSON arrays, no markdown or explanation.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 1500,
    })

    const content = completion.choices[0]?.message?.content || '[]'

    // Parse the JSON response
    let ideas
    try {
      // Clean up the response in case it has markdown code blocks
      const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      ideas = JSON.parse(cleanedContent)
    } catch {
      console.error('Failed to parse AI response:', content)
      return NextResponse.json({ error: 'Failed to parse ideas' }, { status: 500 })
    }

    return NextResponse.json({ ideas })
  } catch (error: any) {
    console.error('OpenAI API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate ideas' },
      { status: 500 }
    )
  }
}
