// src/app/resources/programming-training/api-development/page.tsx

export default function ApiDevelopmentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">API Development & Integration: Connecting Manufacturing Systems</h1>
      <p className="text-lg mb-6">This module focuses on the essential skills of building and integrating Application Programming Interfaces (APIs) to connect disparate manufacturing systems, databases, and AI services. You will learn how to create robust and scalable APIs using Python and TypeScript, enabling seamless data flow and automation across your operations.</p>

      <h2 className="text-2xl font-semibold mb-3">Key Learning Outcomes:</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Understand API fundamentals, RESTful principles, and common API architectures.</li>
        <li>Design and develop secure and efficient APIs using Python (e.g., FastAPI, Flask) and TypeScript (e.g., Node.js with Express).</li>
        <li>Integrate third-party APIs to enhance existing manufacturing software and hardware.</li>
        <li>Implement data validation, error handling, and authentication mechanisms for APIs.</li>
        <li>Learn best practices for API documentation, versioning, and deployment in a manufacturing context.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Module Sections:</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium mb-2">1. API Fundamentals & Design Principles</h3>
          <p>Explore the core concepts of APIs, including request/response cycles, HTTP methods, and designing intuitive API endpoints for manufacturing data.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium mb-2">2. Building APIs with Python (FastAPI/Flask)</h3>
          <p>Hands-on development of APIs using popular Python frameworks, focusing on data collection from sensors, machine control, and production line monitoring.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium mb-2">3. Building APIs with TypeScript (Node.js/Express)</h3>
          <p>Develop APIs for web-based manufacturing dashboards, real-time inventory tracking, and integrating with cloud-based AI services.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium mb-2">4. API Integration & Data Exchange</h3>
          <p>Learn strategies for connecting your APIs with existing ERP systems, SCADA systems, and other operational technologies, ensuring secure and efficient data exchange.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium mb-2">5. Security, Testing & Deployment</h3>
          <p>Implement API security best practices, conduct thorough testing, and deploy your APIs to production environments, with a focus on reliability and scalability in manufacturing.</p>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4" role="alert">
        <p className="font-bold">Next Steps:</p>
        <p>Begin exploring the sections to build your API development and integration skills. Practical examples and case studies relevant to manufacturing will be added soon.</p>
      </div>
    </div>
  );
}