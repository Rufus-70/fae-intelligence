// Create sample blog posts for testing
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDUIVyQam00tPEH0AcLFlaDcT9XSoxr-h0",
  authDomain: "faes-web.firebaseapp.com",
  projectId: "faes-web",
  storageBucket: "faes-web.firebasestorage.app",
  messagingSenderId: "837345805064",
  appId: "1:837345805064:web:0e4a42b4ada04d72dee2bd",
  measurementId: "G-R4LHD76YKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample blog posts
const samplePosts = [
  {
    title: "Getting Started with AI Automation",
    slug: "getting-started-ai-automation",
    excerpt: "Learn the fundamentals of implementing AI automation in your business processes.",
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
    category: "ai-tools",
    tags: ["ai", "automation", "business"],
    status: "published",
    featured: true,
    viewCount: 245,
    author: {
      name: "Fae Intelligence Team",
      email: "team@faeintelligence.com"
    },
    seo: {
      metaTitle: "Getting Started with AI Automation | Fae Intelligence",
      metaDescription: "Learn the fundamentals of implementing AI automation in your business processes with our comprehensive guide.",
      focusKeyword: "AI automation"
    }
  },
  {
    title: "5 AI Tools Every Small Business Needs",
    slug: "5-ai-tools-small-business-needs", 
    excerpt: "Discover cost-effective AI solutions that can transform your small business operations.",
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
    category: "business-automation",
    tags: ["ai-tools", "small-business", "automation"],
    status: "published",
    featured: false,
    viewCount: 189,
    author: {
      name: "Fae Intelligence Team", 
      email: "team@faeintelligence.com"
    },
    seo: {
      metaTitle: "5 AI Tools Every Small Business Needs | Fae Intelligence",
      metaDescription: "Discover cost-effective AI solutions that can transform your small business operations and help you compete.",
      focusKeyword: "AI tools small business"
    }
  },
  {
    title: "The Future of Manufacturing with AI",
    slug: "future-manufacturing-ai",
    excerpt: "Explore how artificial intelligence is revolutionizing manufacturing processes and supply chain management.",
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
    category: "manufacturing",
    tags: ["ai", "manufacturing", "industry-4.0", "automation"],
    status: "published", 
    featured: true,
    viewCount: 312,
    author: {
      name: "Fae Intelligence Team",
      email: "team@faeintelligence.com"
    },
    seo: {
      metaTitle: "The Future of Manufacturing with AI | Fae Intelligence",
      metaDescription: "Explore how artificial intelligence is revolutionizing manufacturing processes and supply chain management.",
      focusKeyword: "AI manufacturing"
    }
  }
];

async function createSamplePosts() {
  try {
    console.log('📝 Creating sample blog posts...\n');
    
    for (let i = 0; i < samplePosts.length; i++) {
      const post = samplePosts[i];
      
      const postData = {
        ...post,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'blog_posts'), postData);
      console.log(`✅ Created post: "${post.title}" (ID: ${docRef.id})`);
    }
    
    console.log('\n🎉 All sample posts created successfully!');
    console.log('🚀 Your HTML blog is now ready to display real content.');
    
  } catch (error) {
    console.error('❌ Error creating sample posts:', error);
  }
}

createSamplePosts();
