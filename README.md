# ContentFlow

AI-powered content creation and distribution platform. Create, schedule, and distribute content across multiple platforms with an integrated end-to-end workflow.

## Features

### Content Ideation Module
- AI-generated trending ideas, keywords, and questions
- Competitive insights and search intent scoring
- Topic research with search volume estimates

### AI Content Generator
- Generate SEO-optimized blogs, social posts, captions, and emails
- Multiple tone settings (professional, casual, friendly, authoritative, humorous)
- Outline mode, rewrite mode, and headline optimizer
- Direct editing inside the platform

### Media & Visual Assistant
- AI image generation prompts
- Royalty-free stock image integration
- Brand template presets (coming soon)

### Publishing & Scheduling
- Multi-platform support: WordPress, LinkedIn, X (Twitter), Instagram, Facebook, Medium
- Bulk scheduling and auto-publish
- Content calendar view with drag-and-drop

### Performance Analytics
- Track clicks, impressions, engagement, and ranking changes
- Platform-specific performance breakdown
- Top-performing content insights

### Team & Workspace
- Multiple workspaces
- Team collaboration (coming soon)
- Content approval workflows (coming soon)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd contentflow
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment example:
```bash
cp .env.example .env.local
```

4. Configure your environment variables (see Configuration section)

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Configuration

Create a `.env.local` file with the following variables:

```env
# Required for AI content generation
OPENAI_API_KEY=sk-your-openai-api-key

# Optional: For stock images
UNSPLASH_ACCESS_KEY=your-unsplash-access-key
```

## Project Structure

```
contentflow/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── onboarding/
│   │   ├── (dashboard)/       # Dashboard pages
│   │   │   ├── dashboard/
│   │   │   ├── ideas/
│   │   │   ├── create/
│   │   │   ├── content/
│   │   │   ├── media/
│   │   │   ├── calendar/
│   │   │   ├── analytics/
│   │   │   └── settings/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   └── ui/                # Reusable UI components
│   ├── lib/
│   │   ├── db.ts             # In-memory database
│   │   ├── prompts.ts        # AI prompt templates
│   │   └── utils.ts          # Utility functions
│   ├── store/
│   │   ├── auth.ts           # Authentication state
│   │   └── content.ts        # Content state management
│   └── types/
│       └── index.ts          # TypeScript types
├── public/
├── tailwind.config.js
├── next.config.js
└── package.json
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Charts**: Recharts (ready to integrate)

## AI Prompts

The platform includes pre-built AI prompts for:

### Blog Posts
- Full article generation
- Outline creation
- Content rewriting
- Headline optimization

### Social Media
- Twitter/X threads
- LinkedIn posts
- Instagram captions
- Facebook posts

### Email
- Newsletter content
- Promotional emails

See `src/lib/prompts.ts` for all available prompts.

## User Flow

1. **Onboarding**: Sign up → Select niche → Name workspace
2. **Ideation**: Enter topic → Get AI-generated ideas with scores
3. **Creation**: Select idea → Choose content type → Generate with AI → Edit
4. **Scheduling**: Select platforms → Set date/time → Schedule
5. **Analytics**: Track performance → Optimize based on data

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Customization

### Adding New Platforms

1. Add platform to `src/types/index.ts`:
```typescript
export type Platform = 'wordpress' | 'linkedin' | ... | 'newplatform'
```

2. Add platform color in `src/lib/utils.ts`:
```typescript
export const platformColors: Record<string, string> = {
  newplatform: 'bg-your-color',
  // ...
}
```

3. Add integration in Settings page

### Custom AI Prompts

Add new prompts in `src/lib/prompts.ts`:

```typescript
export const CONTENT_PROMPTS = {
  custom: {
    generate: (topic: string, tone: string) => `
      Your custom prompt here...
    `
  }
}
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app is a standard Next.js application and can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- Render
- AWS Amplify
- Docker

## Future Enhancements

- [ ] Real OpenAI API integration
- [ ] Platform OAuth connections
- [ ] Real-time collaboration
- [ ] Content approval workflows
- [ ] A/B testing for headlines
- [ ] SEO analysis and suggestions
- [ ] Competitor content monitoring
- [ ] AI image generation (DALL-E/Midjourney)
- [ ] Content repurposing automation
- [ ] Advanced analytics with custom reports

## License

MIT

## Support

For issues and feature requests, please open a GitHub issue.
