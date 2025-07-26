// src/app/resources/programming-training/firebase-training/page.tsx

export default function FirebaseTrainingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Firebase & Database Integration: Scalable Solutions for Manufacturing</h1>
      <p className="text-lg mb-6">This module focuses on mastering Firebase and Firestore, Google&apos;s powerful backend-as-a-service platforms, for building scalable and real-time manufacturing applications. You will learn how to leverage Firestore for flexible NoSQL data storage, Firebase Authentication for secure user management, and Firebase Functions for serverless backend logic, enabling efficient data synchronization and robust application development.</p>

      <h2 className="text-2xl font-semibold mb-3">Key Learning Outcomes:</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Understand the core components of Firebase and how they integrate to form a complete backend solution.</li>
        <li>Design and implement data models in Firestore for manufacturing data, such as production metrics, inventory levels, and sensor readings.</li>
        <li>Integrate Firebase Authentication for secure user sign-up and login in manufacturing applications.</li>
        <li>Develop serverless functions with Firebase Functions to automate tasks, process data, and integrate with external systems.</li>
        <li>Implement real-time data synchronization for dashboards, monitoring systems, and collaborative tools.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Module Sections:</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium mb-2">1. Introduction to Firebase & Firestore</h3>
          <p>Explore the architecture of Firebase and the NoSQL document model of Firestore, ideal for flexible and scalable manufacturing data storage.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium mb-2">2. Data Modeling & Management in Firestore</h3>
          <p>Learn to design efficient data structures for production lines, asset tracking, quality control, and supply chain management within Firestore.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium mb-2">3. Firebase Authentication for Secure Access</h3>
          <p>Implement secure user authentication systems for internal manufacturing applications and external partner portals.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium mb-2">4. Serverless Logic with Firebase Functions</h3>
          <p>Develop cloud functions to automate data processing, trigger alerts based on sensor data, and integrate with other cloud services.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium mb-2">5. Real-time Data & Application Development</h3>
          <p>Build real-time dashboards for production monitoring, collaborative tools for maintenance teams, and dynamic inventory systems.</p>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4" role="alert">
        <p className="font-bold">Next Steps:</p>
        <p>Dive into each section to build robust, scalable manufacturing applications with Firebase. Practical examples and case studies will be added soon.</p>
      </div>
    </div>
  );
}