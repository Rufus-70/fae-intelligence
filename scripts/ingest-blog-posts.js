require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.local') });



const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// Make sure to set your GOOGLE_APPLICATION_CREDENTIALS environment variable
// or provide the service account key directly
// Learn more: https://firebase.google.com/docs/admin/setup
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // or .cert(serviceAccountKey)
    projectId: "faes-web", // Use the faes-web project ID for blog storage
  });
}

const db = admin.firestore();
const postsCollectionRef = db.collection('blog_posts');
const postsDirectory = path.join(process.cwd(), 'docs', '03-SITE-STRUCTURE', 'blogs'); // Adjust path as needed

async function uploadPosts() {
  // Ensure the content/posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.error(`Error: Directory not found: ${postsDirectory}`);
    console.error("Please ensure your Markdown blog posts are located in this directory.");
    return;
  }

  const filenames = fs.readdirSync(postsDirectory);

  for (const filename of filenames) {
    if (filename.endsWith('.md')) {
      const filePath = path.join(postsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data: frontMatter, content } = matter(fileContent);

      const slug = frontMatter.slug || filename.replace(/\.md$/, ''); // Prefer slug from front matter, fallback to filename

      if (!slug) {
        console.warn(`Skipping file ${filename}: No slug found in front matter or derivable from filename.`);
        continue;
      }

      // Construct the post object for Firestore
      const postData = {
        title: frontMatter.title || 'Untitled Post',
        excerpt: frontMatter.excerpt || '',
        author: { name: frontMatter.author || 'Unknown' }, // Match your BlogPost type
        category: frontMatter.category || 'Uncategorized',
        tags: frontMatter.tags || [],
        featuredImage: frontMatter.featuredImage || null,
        publishedAt: frontMatter.date ? admin.firestore.Timestamp.fromDate(new Date(frontMatter.date)) : admin.firestore.Timestamp.now(),
        createdAt: admin.firestore.Timestamp.now(), // Will be updated on subsequent runs
        updatedAt: admin.firestore.Timestamp.now(),
        slug: slug,
        content: content, // The raw Markdown content
        status: frontMatter.status || 'published', // Or 'draft'
        viewCount: frontMatter.viewCount || 0,
        featured: frontMatter.featured || false,
      };

      // Check if post already exists by slug and update, otherwise create new
      const existingPostQuery = await postsCollectionRef.where('slug', '==', slug).limit(1).get();

      if (!existingPostQuery.empty) {
        const docId = existingPostQuery.docs[0].id;
        // Preserve original createdAt if updating
        postData.createdAt = existingPostQuery.docs[0].data().createdAt || postData.createdAt;
        await postsCollectionRef.doc(docId).update(postData);
        console.log(`Updated post: ${slug}`);
      } else {
        await postsCollectionRef.add(postData);
        console.log(`Added new post: ${slug}`);
      }
    }
  }
  console.log('Blog posts upload complete!');
}

uploadPosts().catch(console.error);
