// Demo data for HTML blog when Firebase data is not available
const demoData = {
  posts: [
    {
      id: 'demo-1',
      title: 'Getting Started with AI Automation',
      slug: 'getting-started-ai-automation',
      excerpt: 'Learn the fundamentals of implementing AI automation in your business processes.',
      content: `# Getting Started with AI Automation

AI automation is transforming how businesses operate. In this comprehensive guide, we'll explore the fundamentals of implementing AI automation in your business processes.

## What is AI Automation?

AI automation combines artificial intelligence with process automation to create systems that can learn, adapt, and make decisions with minimal human intervention.

### Key Benefits:
- Increased efficiency
- Reduced errors
- Cost savings
- 24/7 operation
- Scalability

## Getting Started

1. **Assess Your Current Processes**
2. **Identify Automation Opportunities** 
3. **Choose the Right Tools**
4. **Start Small and Scale**

Contact Fae Intelligence to learn how we can help you implement AI automation in your business.`,
      category: 'ai-tools',
      tags: ['ai', 'automation', 'business'],
      status: 'published',
      featured: true,
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-01-15'),
      viewCount: 245,
      author: {
        name: 'Fae Intelligence Team',
        avatar: '/assets/images/fae-logo.png'
      },
      featuredImage: null
    },
    {
      id: 'demo-2',
      title: '5 AI Tools Every Small Business Needs',
      slug: '5-ai-tools-small-business-needs',
      excerpt: 'Discover cost-effective AI solutions that can transform your small business operations.',
      content: `# 5 AI Tools Every Small Business Needs

Small businesses can leverage AI tools to compete with larger organizations. Here are 5 essential AI tools that can transform your operations.

## 1. Customer Service Chatbots

Automate customer support with intelligent chatbots that can handle common inquiries 24/7.

## 2. Content Generation Tools

Create marketing content, blog posts, and social media updates with AI-powered writing assistants.

## 3. Data Analytics Platforms

Gain insights from your business data with AI-driven analytics tools.

## 4. Email Marketing Automation

Personalize email campaigns and optimize send times with AI.

## 5. Inventory Management Systems

Predict demand and optimize stock levels with AI-powered forecasting.

Ready to implement these tools? Contact Fae Intelligence for personalized recommendations.`,
      category: 'business-automation',
      tags: ['ai-tools', 'small-business', 'automation'],
      status: 'published',
      featured: false,
      createdAt: new Date('2025-01-10'),
      updatedAt: new Date('2025-01-10'),
      viewCount: 189,
      author: {
        name: 'Fae Intelligence Team',
        avatar: '/assets/images/fae-logo.png'
      },
      featuredImage: null
    },
    {
      id: 'demo-3',
      title: 'The Future of Manufacturing with AI',
      slug: 'future-manufacturing-ai',
      excerpt: 'Explore how artificial intelligence is revolutionizing manufacturing processes and supply chain management.',
      content: `# The Future of Manufacturing with AI

The manufacturing industry is undergoing a revolutionary transformation powered by artificial intelligence. From predictive maintenance to quality control, AI is reshaping how we produce goods.

## Smart Manufacturing Technologies

### Predictive Maintenance
AI algorithms can predict equipment failures before they occur, reducing downtime and maintenance costs.

### Quality Control
Computer vision and machine learning ensure consistent product quality through automated inspection systems.

### Supply Chain Optimization
AI optimizes inventory levels, predicts demand, and streamlines logistics operations.

## Benefits for Manufacturers

- **Reduced Operational Costs**: Up to 30% reduction in maintenance costs
- **Improved Quality**: 99.9% accuracy in defect detection
- **Increased Efficiency**: 25% improvement in production throughput
- **Enhanced Safety**: Proactive identification of safety hazards

## Getting Started

Implementing AI in manufacturing doesn't have to be overwhelming. Start with pilot projects and gradually scale your AI initiatives.

Partner with Fae Intelligence to develop a customized AI strategy for your manufacturing operations.`,
      category: 'manufacturing',
      tags: ['ai', 'manufacturing', 'industry-4.0', 'automation'],
      status: 'published',
      featured: true,
      createdAt: new Date('2025-01-05'),
      updatedAt: new Date('2025-01-05'),
      viewCount: 312,
      author: {
        name: 'Fae Intelligence Team',
        avatar: '/assets/images/fae-logo.png'
      },
      featuredImage: null
    }
  ],
  categories: [
    {
      id: 'ai-tools',
      name: 'AI Tools',
      slug: 'ai-tools',
      description: 'Latest AI software and applications for business'
    },
    {
      id: 'business-automation',
      name: 'Business Automation',
      slug: 'business-automation',
      description: 'Automation solutions for business processes'
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      slug: 'manufacturing',
      description: 'AI applications in manufacturing and industry'
    }
  ],
  tags: [
    { id: 'ai', name: 'AI', slug: 'ai' },
    { id: 'automation', name: 'Automation', slug: 'automation' },
    { id: 'business', name: 'Business', slug: 'business' },
    { id: 'ai-tools', name: 'AI Tools', slug: 'ai-tools' },
    { id: 'small-business', name: 'Small Business', slug: 'small-business' },
    { id: 'manufacturing', name: 'Manufacturing', slug: 'manufacturing' },
    { id: 'industry-4.0', name: 'Industry 4.0', slug: 'industry-4.0' }
  ]
};

// Make demo data available globally
window.demoData = demoData;
