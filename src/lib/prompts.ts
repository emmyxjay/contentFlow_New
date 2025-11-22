// AI Content Generation Prompts
// These prompts are designed for use with OpenAI's GPT models or similar LLMs

export const CONTENT_PROMPTS = {
  // Blog Post Generation
  blog: {
    generate: (topic: string, keywords: string[], tone: string, length: string) => `
You are an expert SEO content writer. Generate a ${length} blog post about "${topic}".

Requirements:
- Tone: ${tone}
- Target keywords to include naturally: ${keywords.join(', ')}
- Include an engaging introduction that hooks the reader
- Use clear H2 and H3 headings to structure the content
- Include actionable tips and insights
- End with a compelling conclusion and call-to-action
- Optimize for SEO with proper keyword density (1-2%)
- Use bullet points and numbered lists where appropriate
- Include statistics or data points when relevant

Length guide:
- Short: 500-800 words
- Medium: 1000-1500 words
- Long: 2000-3000 words

Output the content in clean HTML format with proper heading tags.
`,

    outline: (topic: string, keywords: string[]) => `
You are a content strategist. Create a detailed blog post outline for "${topic}".

Target keywords: ${keywords.join(', ')}

Create an outline that includes:
1. A compelling headline (with 2-3 alternatives)
2. Introduction hook
3. 5-7 main sections with H2 headings
4. 2-3 subpoints for each section
5. Key takeaways section
6. Suggested call-to-action
7. Meta description (155 characters max)

Format as a structured outline with clear hierarchy.
`,

    rewrite: (content: string, tone: string) => `
You are an expert content editor. Rewrite the following content to improve its quality and adjust the tone to be more ${tone}.

Original content:
${content}

Requirements:
- Maintain the core message and key points
- Improve clarity and readability
- Enhance engagement and flow
- Fix any grammar or spelling issues
- Optimize sentence structure
- Keep approximately the same length

Output the improved content in the same format as the original.
`,

    headline: (topic: string, keywords: string[]) => `
You are a headline optimization expert. Generate 10 compelling headlines for a blog post about "${topic}".

Keywords to consider: ${keywords.join(', ')}

Create headlines that:
1. Are 50-70 characters for optimal SEO
2. Include power words that drive clicks
3. Create curiosity or promise value
4. Include numbers where appropriate
5. Vary in style (how-to, list, question, statement)

Output as a numbered list with brief notes on why each works.
`
  },

  // Social Media Posts
  social: {
    twitter: (topic: string, tone: string) => `
You are a social media expert. Create 5 engaging tweets about "${topic}".

Requirements:
- Tone: ${tone}
- Maximum 280 characters each
- Include relevant hashtags (2-3 max)
- Mix of formats: question, statement, tip, hook
- Encourage engagement (likes, retweets, replies)
- Include emojis where appropriate

Output as a numbered list.
`,

    linkedin: (topic: string, tone: string) => `
You are a LinkedIn content specialist. Create a professional LinkedIn post about "${topic}".

Requirements:
- Tone: ${tone}
- 150-300 words
- Start with a hook (first line is crucial)
- Use line breaks for readability
- Include a personal insight or story
- End with a question to encourage comments
- Add 3-5 relevant hashtags at the end

Format with proper line breaks for LinkedIn's display.
`,

    instagram: (topic: string, tone: string) => `
You are an Instagram content creator. Write an engaging Instagram caption about "${topic}".

Requirements:
- Tone: ${tone}
- 150-300 words
- Start with a hook that stops the scroll
- Tell a mini-story or share an insight
- Include a clear call-to-action
- Add 15-20 relevant hashtags (grouped at the end)
- Include emoji strategically

Output the caption ready to copy-paste.
`,

    facebook: (topic: string, tone: string) => `
You are a Facebook marketing expert. Create an engaging Facebook post about "${topic}".

Requirements:
- Tone: ${tone}
- 100-200 words
- Start with attention-grabbing first line
- Make it conversational and shareable
- Include a question to boost engagement
- Add a call-to-action
- Suggest an image description if relevant

Output the post text.
`
  },

  // Email Content
  email: {
    newsletter: (topic: string, tone: string) => `
You are an email marketing specialist. Write a newsletter email about "${topic}".

Requirements:
- Tone: ${tone}
- Subject line (50 characters max) with 2 alternatives
- Preview text (90 characters max)
- Greeting
- Brief intro (2-3 sentences)
- Main content (3-4 paragraphs)
- Clear CTA button text
- Sign-off

Format with clear sections for easy implementation.
`,

    promotional: (topic: string, tone: string) => `
You are a conversion copywriter. Write a promotional email about "${topic}".

Requirements:
- Tone: ${tone}
- Subject line with urgency (3 alternatives)
- Preview text that creates curiosity
- Opening hook
- Problem statement
- Solution presentation
- Benefits (bullet points)
- Social proof placeholder
- Urgency element
- Clear CTA
- P.S. line

Format for high conversion rates.
`
  },

  // Caption/Short Content
  caption: {
    generate: (topic: string, platform: string, tone: string) => `
You are a social media copywriter. Create 5 captions for ${platform} about "${topic}".

Requirements:
- Tone: ${tone}
- Appropriate length for ${platform}
- Engaging first line
- Include emoji where natural
- Relevant hashtags
- Call-to-action

Output as numbered list with platform-optimized formatting.
`
  },

  // Idea Generation
  ideation: {
    topics: (niche: string) => `
You are a content strategist specializing in ${niche}. Generate 10 trending content ideas.

For each idea, provide:
1. Title (headline-ready)
2. Brief description (1-2 sentences)
3. Target keywords (3-4)
4. Estimated search volume (low/medium/high)
5. Competition level (low/medium/high)
6. Search intent (informational/commercial/transactional)
7. Content score (0-100 based on opportunity)

Focus on topics that:
- Are currently trending or evergreen
- Have good search potential
- Match the niche audience
- Have manageable competition
- Offer unique angles

Output as a structured list.
`,

    headlines: (topic: string) => `
Generate 10 headline variations for: "${topic}"

Include:
- 3 "How-to" headlines
- 3 "List" headlines (numbers)
- 2 "Question" headlines
- 2 "Statement" headlines

Each headline should be:
- 50-70 characters
- SEO-optimized
- Click-worthy

Output with brief explanation of why each works.
`,

    keywords: (topic: string) => `
You are an SEO expert. Generate a comprehensive keyword list for "${topic}".

Include:
- 5 primary keywords (high volume)
- 10 long-tail keywords
- 5 question-based keywords
- 5 related topics
- LSI keywords

For each, estimate:
- Search volume (monthly)
- Competition (low/medium/high)
- Search intent

Output as organized categories.
`
  }
}

// Helper function to get the appropriate prompt
export function getPrompt(
  type: 'blog' | 'social' | 'email' | 'caption',
  mode: 'generate' | 'outline' | 'rewrite' | 'headline',
  params: {
    topic: string
    keywords?: string[]
    tone?: string
    length?: string
    platform?: string
    content?: string
  }
): string {
  const { topic, keywords = [], tone = 'professional', length = 'medium', platform = 'twitter', content = '' } = params

  switch (type) {
    case 'blog':
      if (mode === 'generate') return CONTENT_PROMPTS.blog.generate(topic, keywords, tone, length)
      if (mode === 'outline') return CONTENT_PROMPTS.blog.outline(topic, keywords)
      if (mode === 'rewrite') return CONTENT_PROMPTS.blog.rewrite(content, tone)
      if (mode === 'headline') return CONTENT_PROMPTS.blog.headline(topic, keywords)
      break

    case 'social':
      const socialPrompts = CONTENT_PROMPTS.social as Record<string, (topic: string, tone: string) => string>
      if (socialPrompts[platform]) {
        return socialPrompts[platform](topic, tone)
      }
      return CONTENT_PROMPTS.social.twitter(topic, tone)

    case 'email':
      if (mode === 'generate') return CONTENT_PROMPTS.email.newsletter(topic, tone)
      return CONTENT_PROMPTS.email.promotional(topic, tone)

    case 'caption':
      return CONTENT_PROMPTS.caption.generate(topic, platform, tone)
  }

  return CONTENT_PROMPTS.blog.generate(topic, keywords, tone, length)
}

// Content generation mock (simulates AI response)
export async function generateContent(prompt: string): Promise<string> {
  // In production, this would call OpenAI API
  // For now, return mock content based on prompt type
  await new Promise(resolve => setTimeout(resolve, 2000))

  if (prompt.includes('blog post')) {
    return `<h2>Introduction</h2>
<p>In today's fast-paced digital landscape, staying ahead requires more than just keeping up with trends—it demands a strategic approach to content creation and distribution.</p>

<h2>Understanding the Fundamentals</h2>
<p>Before diving into advanced strategies, it's essential to grasp the core principles that drive successful content marketing. These fundamentals form the foundation upon which all effective campaigns are built.</p>

<h3>Key Principle 1: Know Your Audience</h3>
<p>Understanding your target audience is crucial for creating content that resonates. Research their pain points, preferences, and behaviors to craft messages that truly connect.</p>

<h3>Key Principle 2: Consistency is Key</h3>
<p>Regular publishing schedules help build audience expectations and improve search engine rankings. Aim for quality and consistency in equal measure.</p>

<h2>Advanced Strategies for Growth</h2>
<p>Once you've mastered the basics, these advanced techniques can help accelerate your content marketing results:</p>

<ul>
<li>Leverage data analytics to inform content decisions</li>
<li>Implement A/B testing for headlines and CTAs</li>
<li>Build strategic partnerships for content distribution</li>
<li>Repurpose content across multiple platforms</li>
</ul>

<h2>Conclusion</h2>
<p>Success in content marketing requires a blend of creativity, strategy, and persistence. By applying these principles and continuously learning from your results, you'll be well-positioned to achieve your goals.</p>

<p><strong>Ready to take your content to the next level? Start implementing these strategies today!</strong></p>`
  }

  if (prompt.includes('tweet')) {
    return `1. 🚀 Just discovered a game-changer for productivity! Here's what I learned... #Productivity #GrowthMindset

2. The secret to success isn't working harder—it's working smarter. Here's how 👇 #Success #Tips

3. ❓ What's the one tool you can't live without? Drop it below! #Question #Community

4. 📊 Data doesn't lie: These 3 strategies increased our output by 40%. Thread 🧵 #DataDriven

5. Monday motivation: Every expert was once a beginner. Keep pushing! 💪 #MondayMotivation`
  }

  if (prompt.includes('LinkedIn')) {
    return `I used to think working 80-hour weeks was the path to success.

Then I burned out. Hard.

Here's what I learned after rebuilding from scratch:

→ Productivity isn't about hours, it's about energy
→ Strategic breaks boost creativity by 40%
→ Saying "no" is often the most productive thing you can do

The game-changer? Understanding that rest is a strategy, not a reward.

Now I achieve more in 40 focused hours than I ever did in 80 scattered ones.

What's your biggest productivity lesson? Share below 👇

#Productivity #Leadership #WorkLifeBalance #Growth`
  }

  return `Generated content based on your specifications. This is a placeholder for the actual AI-generated content that would be produced by the LLM API integration.`
}
