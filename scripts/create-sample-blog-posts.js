const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCNKHt-4F_QNUpIBby5SayvvsGnRPEushM',
  authDomain: 'faeintelligence.firebaseapp.com',
  projectId: 'faeintelligence',
  storageBucket: 'faeintelligence.firebasestorage.app',
  messagingSenderId: '441512448454',
  appId: '1:441512448454:web:b8352b260aab853c5722c7',
  measurementId: 'G-NHV8PSEDE7'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample blog posts data
const samplePosts = [
  {
    title: 'Getting Started with AI in Manufacturing',
    slug: 'getting-started-ai-manufacturing',
    excerpt: 'Learn the fundamentals of implementing AI solutions in manufacturing environments with practical examples and real-world case studies.',
    content: `# Getting Started with AI in Manufacturing

## Introduction

Artificial Intelligence is transforming manufacturing operations across the globe. This guide will walk you through the essential steps to begin your AI journey.

## Why AI in Manufacturing?

- **Predictive Maintenance**: Reduce downtime by 20-30%
- **Quality Control**: Improve defect detection by 90%
- **Process Optimization**: Increase efficiency by 15-25%
- **Cost Reduction**: Lower operational costs by 10-20%

## Getting Started Steps

### 1. Assess Your Current State
- Document existing processes
- Identify pain points
- Evaluate data availability
- Assess team readiness

### 2. Choose Your First AI Project
- Start with a well-defined, small-scope project
- Focus on high-impact, low-risk areas
- Ensure measurable outcomes

### 3. Build Your Team
- Identify AI champions within your organization
- Provide training and upskilling opportunities
- Consider external expertise for complex implementations

### 4. Implement and Iterate
- Start small and scale gradually
- Monitor results and adjust strategies
- Document lessons learned

## Common Pitfalls to Avoid

- **Scope Creep**: Keep initial projects focused and manageable
- **Data Quality Issues**: Ensure clean, reliable data before starting
- **Lack of Change Management**: Prepare your team for new processes
- **Unrealistic Expectations**: AI is a journey, not a destination

## Next Steps

Ready to begin? Start by identifying one process in your operation that could benefit from AI enhancement. Remember, the goal is continuous improvement, not overnight transformation.

Start small, learn fast, and scale gradually.`,
    status: 'published',
    featured: true,
    author: { 
      id: 'richard-snyder', 
      name: 'Richard Snyder', 
      email: 'richard@faeintelligence.com' 
    },
    category: 'AI Fundamentals',
    tags: ['AI', 'Manufacturing', 'Getting Started', 'Digital Transformation'],
    seo: { 
      metaTitle: 'Getting Started with AI in Manufacturing - Fae Intelligence', 
      metaDescription: 'Learn the fundamentals of implementing AI solutions in manufacturing environments with practical examples and real-world case studies.',
      focusKeyword: 'AI manufacturing getting started' 
    },
    publishedAt: Timestamp.fromDate(new Date('2025-06-15')),
    createdAt: Timestamp.fromDate(new Date('2025-06-10')),
    updatedAt: Timestamp.fromDate(new Date('2025-06-15')),
    viewCount: 0
  },
  {
    title: 'Predictive Maintenance with Low-Cost AI Tools',
    slug: 'predictive-maintenance-low-cost-ai',
    excerpt: 'Discover how to implement predictive maintenance using accessible AI tools without breaking the budget.',
    content: `# Predictive Maintenance with Low-Cost AI Tools

## Introduction

Predictive maintenance is no longer the exclusive domain of large enterprises with massive budgets. Today, small and medium-sized manufacturers can implement AI-powered predictive maintenance using affordable, accessible tools.

## What is Predictive Maintenance?

Predictive maintenance uses data analysis and AI algorithms to predict when equipment will fail, allowing maintenance to be performed just in time. This approach:

- **Reduces Unplanned Downtime**: By 20-40%
- **Lowers Maintenance Costs**: By 10-20%
- **Extends Equipment Life**: By 15-25%
- **Improves Safety**: By preventing catastrophic failures

## Low-Cost AI Tools for Predictive Maintenance

### 1. Vibration Analysis
- **Cost**: $500 - $2,000 for basic sensors
- **Implementation**: 2-4 weeks
- **ROI**: 3-6 months

### 2. Temperature Monitoring
- **Cost**: $200 - $800 per sensor
- **Implementation**: 1-2 weeks
- **ROI**: 2-4 months

### 3. Sound Analysis
- **Cost**: $300 - $1,500 per microphone
- **Implementation**: 2-3 weeks
- **ROI**: 4-6 months

## Implementation Strategy

### Phase 1: Pilot Program
1. Select 2-3 critical pieces of equipment
2. Install basic sensors
3. Collect 30 days of baseline data
4. Train simple AI models

### Phase 2: Scale Up
1. Expand to more equipment
2. Integrate with existing systems
3. Train maintenance teams
4. Establish alert protocols

### Phase 3: Optimization
1. Refine AI models
2. Add more sophisticated sensors
3. Integrate with CMMS systems
4. Implement automated responses

## ROI Calculation

**Initial Investment**: $5,000 - $15,000
**Annual Savings**: $20,000 - $50,000
**Payback Period**: 3-9 months
**5-Year ROI**: 300-500%

## Getting Started

1. **Assess Your Equipment**: Identify critical assets
2. **Choose Your Tools**: Select appropriate sensors
3. **Plan Your Implementation**: Create a phased approach
4. **Train Your Team**: Ensure proper adoption
5. **Monitor and Adjust**: Continuously improve

## Conclusion

Predictive maintenance with AI is within reach for manufacturers of all sizes. Start small, prove the concept, and scale up based on results. The investment will pay for itself quickly while providing long-term competitive advantages.`,
    status: 'published',
    featured: true,
    author: { 
      id: 'richard-snyder', 
      name: 'Richard Snyder', 
      email: 'richard@faeintelligence.com' 
    },
    category: 'Predictive Maintenance',
    tags: ['Predictive Maintenance', 'AI Tools', 'Cost-Effective', 'Equipment Maintenance'],
    seo: { 
      metaTitle: 'Predictive Maintenance with Low-Cost AI Tools - Fae Intelligence', 
      metaDescription: 'Discover how to implement predictive maintenance using accessible AI tools without breaking the budget.',
      focusKeyword: 'predictive maintenance AI tools low cost' 
    },
    publishedAt: Timestamp.fromDate(new Date('2025-06-12')),
    createdAt: Timestamp.fromDate(new Date('2025-06-08')),
    updatedAt: Timestamp.fromDate(new Date('2025-06-12')),
    viewCount: 0
  },
  {
    title: 'Quality Control Automation: A Step-by-Step Guide',
    slug: 'quality-control-automation-guide',
    excerpt: 'Transform your quality control processes with automated inspection systems using computer vision and machine learning.',
    content: `# Quality Control Automation: A Step-by-Step Guide

## Introduction

Quality control automation using AI and computer vision is revolutionizing manufacturing quality assurance. This comprehensive guide will walk you through implementing automated quality control systems step by step.

## Benefits of Automated Quality Control

- **Consistency**: 99.9% accuracy vs. 95% human accuracy
- **Speed**: 10-50x faster than manual inspection
- **Cost Reduction**: 30-50% lower quality control costs
- **24/7 Operation**: Continuous monitoring without breaks
- **Data Insights**: Detailed analytics for process improvement

## Step 1: Assess Your Current Quality Control

### Current State Analysis
- Document existing quality control processes
- Identify bottlenecks and pain points
- Map out quality control workflows
- Assess current defect rates and costs

### Gap Analysis
- Compare current vs. desired quality levels
- Identify automation opportunities
- Assess technology requirements
- Evaluate ROI potential

## Step 2: Choose Your Automation Approach

### Computer Vision Inspection
- **Best for**: Visual defects, dimensional measurements
- **Cost**: $10,000 - $50,000
- **Implementation**: 4-8 weeks
- **ROI**: 6-12 months

### Machine Learning Classification
- **Best for**: Complex defect patterns, learning from examples
- **Cost**: $15,000 - $75,000
- **Implementation**: 8-16 weeks
- **ROI**: 8-18 months

### Hybrid Systems
- **Best for**: Complex quality control requirements
- **Cost**: $25,000 - $100,000
- **Implementation**: 12-24 weeks
- **ROI**: 12-24 months

## Step 3: Design Your System

### Hardware Requirements
- **Cameras**: High-resolution industrial cameras
- **Lighting**: Consistent, controlled lighting
- **Computing**: GPU-enabled processing units
- **Integration**: PLC or SCADA system connectivity

### Software Components
- **Image Processing**: OpenCV or commercial solutions
- **AI Models**: TensorFlow, PyTorch, or cloud APIs
- **Database**: Time-series data storage
- **Dashboard**: Real-time monitoring interface

## Step 4: Implementation

### Phase 1: Proof of Concept
1. Set up basic camera and lighting
2. Collect sample images
3. Train initial AI models
4. Validate accuracy

### Phase 2: Pilot Program
1. Install on one production line
2. Train operators and quality teams
3. Collect performance data
4. Refine models and processes

### Phase 3: Full Deployment
1. Scale across all production lines
2. Integrate with ERP/MES systems
3. Establish maintenance protocols
4. Continuous improvement processes

## Step 5: Training and Change Management

### Operator Training
- Basic system operation
- Troubleshooting procedures
- Maintenance requirements
- Emergency procedures

### Quality Team Training
- System configuration
- Model training and updates
- Performance monitoring
- Continuous improvement

## ROI Calculation

**Initial Investment**: $25,000 - $100,000
**Annual Savings**: $50,000 - $200,000
**Payback Period**: 6-18 months
**5-Year ROI**: 400-800%

## Common Challenges and Solutions

### Challenge: Lighting Variations
**Solution**: Controlled lighting environments, adaptive algorithms

### Challenge: Model Accuracy
**Solution**: Continuous training, data augmentation, ensemble methods

### Challenge: System Integration
**Solution**: Standard protocols, middleware solutions, professional services

### Challenge: Change Resistance
**Solution**: Comprehensive training, clear benefits communication, gradual rollout

## Success Metrics

- **Defect Detection Rate**: Target 99%+
- **False Positive Rate**: Target <1%
- **Processing Speed**: Target 10x human speed
- **Cost per Inspection**: Target 50% reduction

## Next Steps

1. **Start Small**: Begin with a pilot program
2. **Measure Everything**: Establish baseline metrics
3. **Iterate Quickly**: Learn and improve continuously
4. **Scale Gradually**: Expand based on proven results

## Conclusion

Quality control automation is a game-changer for manufacturing competitiveness. The investment is significant but the returns are substantial and long-lasting. Start your journey today and transform your quality control processes for the digital age.`,
    status: 'published',
    featured: true,
    author: { 
      id: 'richard-snyder', 
      name: 'Richard Snyder', 
      email: 'richard@faeintelligence.com' 
    },
    category: 'Quality Control',
    tags: ['Quality Control', 'Automation', 'Computer Vision', 'AI Inspection'],
    seo: { 
      metaTitle: 'Quality Control Automation: A Step-by-Step Guide - Fae Intelligence', 
      metaDescription: 'Transform your quality control processes with automated inspection systems using computer vision and machine learning.',
      focusKeyword: 'quality control automation computer vision AI' 
    },
    publishedAt: Timestamp.fromDate(new Date('2025-06-10')),
    createdAt: Timestamp.fromDate(new Date('2025-06-05')),
    updatedAt: Timestamp.fromDate(new Date('2025-06-10')),
    viewCount: 0
  }
];

// Function to add posts to Firestore
async function createSamplePosts() {
  try {
    console.log('🚀 Starting to create sample blog posts...');
    
    for (const post of samplePosts) {
      console.log(`📝 Creating post: ${post.title}`);
      
      const docRef = await addDoc(collection(db, 'blog_posts'), post);
      console.log(`✅ Post created with ID: ${docRef.id}`);
    }
    
    console.log('🎉 All sample blog posts created successfully!');
    console.log(`📊 Total posts created: ${samplePosts.length}`);
    
  } catch (error) {
    console.error('❌ Error creating sample posts:', error);
  }
}

// Run the script
createSamplePosts();
