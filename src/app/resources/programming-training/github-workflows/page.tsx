// src/app/resources/programming-training/github-workflows/page.tsx

export default function GitHubWorkflowsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Version Control & Collaboration: Advanced GitHub Workflows</h1>
      <p className="text-lg mb-6">This module delves into advanced GitHub workflows, collaboration strategies, and DevOps automation tailored for manufacturing development teams. You will learn how to effectively manage code, collaborate seamlessly on projects, and implement continuous integration/continuous delivery (CI/CD) pipelines to streamline software development and deployment processes.</p>

      <h2 className="text-2xl font-semibold mb-3">Key Learning Outcomes:</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Master advanced Git commands and branching strategies for complex projects.</li>
        <li>Implement effective pull request workflows and code review processes for team collaboration.</li>
        <li>Automate testing, building, and deployment using GitHub Actions for CI/CD.</li>
        <li>Manage project dependencies and integrate security best practices into your workflows.</li>
        <li>Understand and apply DevOps principles to improve efficiency and reliability in manufacturing software development.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Module Sections:</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium mb-2">1. Advanced Git & Branching Strategies</h3>
          <p>Explore Git rebase, cherry-pick, and advanced branching models like Gitflow and GitHub Flow for robust code management.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium mb-2">2. Collaborative Development with Pull Requests</h3>
          <p>Learn best practices for creating, reviewing, and merging pull requests, fostering efficient team collaboration and code quality.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium mb-2">3. Automating CI/CD with GitHub Actions</h3>
          <p>Design and implement automated workflows for continuous integration (CI) and continuous delivery (CD) using GitHub Actions, from testing to deployment.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium mb-2">4. Dependency Management & Security</h3>
          <p>Manage project dependencies effectively and integrate security scanning tools into your CI/CD pipelines to identify and mitigate vulnerabilities.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium mb-2">5. DevOps Principles in Manufacturing Software</h3>
          <p>Apply DevOps methodologies to optimize the entire software development lifecycle, from planning and development to testing and operations, in a manufacturing context.</p>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4" role="alert">
        <p className="font-bold">Next Steps:</p>
        <p>Dive into each section to master version control and collaboration for your manufacturing development teams. Practical examples and case studies will be added soon.</p>
      </div>
    </div>
  );
}