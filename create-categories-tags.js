// Create sample categories and tags
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

const categories = [
  {
    name: "AI Tools",
    slug: "ai-tools",
    description: "Latest AI software and applications for business"
  },
  {
    name: "Business Automation", 
    slug: "business-automation",
    description: "Automation solutions for business processes"
  },
  {
    name: "Manufacturing",
    slug: "manufacturing", 
    description: "AI applications in manufacturing and industry"
  },
  {
    name: "Data Analytics",
    slug: "data-analytics",
    description: "Business intelligence and data analysis tools"
  }
];

const tags = [
  { name: "AI", slug: "ai" },
  { name: "Automation", slug: "automation" }, 
  { name: "Business", slug: "business" },
  { name: "AI Tools", slug: "ai-tools" },
  { name: "Small Business", slug: "small-business" },
  { name: "Manufacturing", slug: "manufacturing" },
  { name: "Industry 4.0", slug: "industry-4.0" },
  { name: "Machine Learning", slug: "machine-learning" },
  { name: "Data Analytics", slug: "data-analytics" },
  { name: "Digital Transformation", slug: "digital-transformation" }
];

async function createCategoriesAndTags() {
  try {
    console.log('📂 Creating blog categories...\n');
    
    for (const category of categories) {
      const docRef = await addDoc(collection(db, 'blog_categories'), category);
      console.log(`✅ Created category: "${category.name}" (ID: ${docRef.id})`);
    }
    
    console.log('\n🏷️  Creating blog tags...\n');
    
    for (const tag of tags) {
      const docRef = await addDoc(collection(db, 'blog_tags'), tag);
      console.log(`✅ Created tag: "${tag.name}" (ID: ${docRef.id})`);
    }
    
    console.log('\n🎉 All categories and tags created successfully!');
    
  } catch (error) {
    console.error('❌ Error creating categories and tags:', error);
  }
}

createCategoriesAndTags();
