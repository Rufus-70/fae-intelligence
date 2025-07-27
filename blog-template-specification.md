# Blog Content Template Specification

Use this exact JSON structure when generating blog content for the Fae Intelligence blog system:

## Required JSON Structure

```json
{
  "title": "Your Blog Post Title Here",
  "excerpt": "Brief summary under 160 characters for SEO and previews",
  "content": "Full markdown content of your blog post with proper formatting",
  "category": "category-slug",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "status": "draft",
  "featured": false,
  "seo": {
    "metaTitle": "SEO title under 60 characters",
    "metaDescription": "SEO description under 160 characters",
    "focusKeyword": "main keyword phrase"
  }
}
```

## Field Specifications

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | string | Blog post title (50-60 chars ideal) | "5 AI Tools Every Small Manufacturer Needs" |
| `excerpt` | string | Summary under 160 chars for SEO | "Discover cost-effective AI solutions..." |
| `content` | string | Full markdown content | "# Title\n\n## Section\n\nContent..." |
| `category` | string | Single category slug (lowercase, dashes) | "ai-tools" |
| `tags` | array | Array of tag strings (lowercase, dashes) | ["ai-automation", "manufacturing"] |
| `status` | string | "draft" or "published" | "draft" |
| `featured` | boolean | Featured post flag | false |

### SEO Object (Required)

| Field | Type | Description | Limit |
|-------|------|-------------|-------|
| `metaTitle` | string | SEO title for search engines | 60 chars |
| `metaDescription` | string | SEO description for search results | 160 chars |
| `focusKeyword` | string | Primary keyword for SEO | 1-4 words |

## Available Categories

Use one of these category slugs:

- `ai-tools` - AI software and applications
- `automation` - Process automation and workflows  
- `training` - Workforce development and education
- `maintenance` - Equipment and system maintenance
- `quality-control` - Quality assurance processes
- `industry-trends` - Market analysis and trends
- `case-studies` - Real-world success stories
- `process-optimization` - Operational improvements

## Common Tags

Use relevant tags from this list (or create new ones following the pattern):

- `artificial-intelligence`
- `machine-learning` 
- `manufacturing`
- `small-business`
- `automation`
- `productivity`
- `cost-reduction`
- `digital-transformation`
- `predictive-maintenance`
- `quality-control`
- `workforce-development`
- `process-optimization`
- `data-analytics`
- `iot-sensors`
- `change-management`

## Content Formatting (Markdown)

### Structure Elements
```markdown
# Main Title (H1)
## Section Heading (H2)  
### Subsection (H3)

**Bold text** for emphasis
*Italic text* for emphasis
`code snippets` for technical terms

* Bullet point lists
1. Numbered lists

[Link text](https://url.com)
```

### Special Callout Boxes
```markdown
**Tip:** Use this format for helpful tips (creates green callout box)

**Note:** Use this format for important information (creates blue callout box)

**Warning:** Use this format for cautions (creates yellow callout box)
```

### Code Blocks
```markdown
```python
# Code example with syntax highlighting
def example_function():
    return "Professional code display"
```
```

## Content Guidelines

### Title Best Practices
- 50-60 characters ideal
- Include main keyword naturally
- Make it compelling and actionable
- Examples:
  - "How to Implement AI in Manufacturing: Complete Guide"
  - "5 Free Tools That Transform Small Business Operations"

### Excerpt Guidelines
- Under 160 characters
- Summarize main value proposition
- Include primary keyword
- End with benefit statement

### Content Structure
1. **Introduction** (2-3 paragraphs)
   - Hook with relatable problem
   - Preview the solution
   - Outline what reader will learn

2. **Main Content** (3-5 sections)
   - Use H2 headings for main sections
   - Include practical examples
   - Add actionable insights
   - Use callout boxes for key points

3. **Conclusion** (1-2 paragraphs)
   - Summarize key takeaways
   - Include clear call-to-action

### SEO Optimization
- Include focus keyword in title, H2 headings, and naturally throughout content
- Use variations of the keyword
- Write for humans first, SEO second
- Include related keywords and phrases

## Example Template

```json
{
  "title": "How Small Manufacturers Can Cut Costs by 30% with AI Automation",
  "excerpt": "Discover proven AI automation strategies that reduce operational costs by 30% without major infrastructure changes. Practical implementation guide included.",
  "content": "# How Small Manufacturers Can Cut Costs by 30% with AI Automation\n\nSmall manufacturers face mounting pressure to reduce costs while maintaining quality. Rising labor costs, supply chain disruptions, and increased competition demand innovative solutions.\n\n## The Hidden Cost Drains in Manufacturing\n\nMost manufacturers don't realize how much money they're losing to:\n\n* **Manual quality inspections** that miss 15-20% of defects\n* **Reactive maintenance** causing 40% more downtime\n* **Inefficient scheduling** wasting 25% of production capacity\n\n**Tip:** Start by measuring your current baseline metrics before implementing any AI solutions.\n\n## Three AI Solutions That Deliver Immediate ROI\n\n### 1. Computer Vision for Quality Control\n\nReplace manual inspections with AI-powered visual systems:\n\n* **Cost**: $15,000-50,000 initial investment\n* **Savings**: $100,000+ annually in reduced rework\n* **Implementation**: 30-60 days\n\n### 2. Predictive Maintenance Systems\n\nPredict equipment failures before they happen:\n\n```python\n# Simple vibration monitoring example\nimport numpy as np\nfrom sklearn.ensemble import IsolationForest\n\n# Detect anomalies in equipment vibration\nmodel = IsolationForest(contamination=0.1)\nanomalies = model.fit_predict(vibration_data)\n```\n\n### 3. Production Optimization\n\nOptimize scheduling and resource allocation:\n\n* **Benefit**: 15-25% increase in throughput\n* **Timeline**: 90 days to full implementation\n* **ROI**: 200-400% in first year\n\n## Implementation Roadmap\n\n**Month 1-2: Assessment and Planning**\n- Baseline measurement\n- Technology selection\n- Team training\n\n**Month 3-4: Pilot Implementation**\n- Single line deployment\n- Performance monitoring\n- Process refinement\n\n**Month 5-6: Scale and Optimize**\n- Full facility rollout\n- Advanced analytics\n- Continuous improvement\n\n**Warning:** Don't try to implement everything at once. Start with your biggest pain point and expand gradually.\n\n## Measuring Success\n\nTrack these key metrics:\n\n* Overall Equipment Effectiveness (OEE)\n* Defect rates and quality scores\n* Maintenance costs and downtime\n* Energy consumption\n* Labor productivity\n\n## Getting Started Today\n\nThe manufacturing landscape is evolving rapidly. Companies that embrace AI early gain significant competitive advantages.\n\n**Ready to transform your operations?** Contact Fae Intelligence for a free assessment and implementation roadmap tailored to your specific needs.",
  "category": "ai-tools",
  "tags": ["ai-automation", "manufacturing", "cost-reduction", "small-business", "process-optimization"],
  "status": "draft",
  "featured": false,
  "seo": {
    "metaTitle": "AI Automation for Manufacturing: Cut Costs 30% | Fae Intelligence",
    "metaDescription": "Learn how small manufacturers use AI automation to reduce costs by 30%. Proven strategies, implementation guide, and ROI calculations included.",
    "focusKeyword": "AI automation manufacturing"
  }
}
```

## Validation Checklist

Before submitting, verify:

- [ ] All required fields present
- [ ] Title under 60 characters
- [ ] Excerpt under 160 characters  
- [ ] Category slug matches available options
- [ ] Tags use lowercase with dashes
- [ ] SEO fields within character limits
- [ ] Content uses proper markdown formatting
- [ ] Focus keyword appears naturally throughout
- [ ] JSON is valid (no trailing commas, proper quotes)

## Common Mistakes to Avoid

1. **Invalid JSON** - Missing quotes, trailing commas
2. **Wrong category** - Using categories that don't exist
3. **Bad tag format** - Using spaces instead of dashes
4. **Too long** - Exceeding character limits for SEO fields
5. **Missing callouts** - Not using **Tip:**, **Note:**, **Warning:** formats
6. **No focus keyword** - Not including the focus keyword naturally in content

Use this template specification in your prompts to ensure generated content imports perfectly into the blog system!
