// src/app/resources/training/engineering-alignment/page.tsx

export default function EngineeringAlignmentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Engineering Alignment of Context, Prompt, and Model</h1>
      <p className="text-lg mb-6">Learn how to optimize AI performance through proper alignment techniques.</p>

      <h2 className="text-2xl font-semibold mb-3">Introduction to Alignment</h2>
      <p className="mb-4">Engineering alignment between context, prompts, and AI models is a critical skill for effectively working with AI systems. Proper alignment ensures that the AI understands your intent, has the necessary information, and can respond appropriately within its capabilities.</p>

      <h3 className="text-xl font-medium mb-2">Why Alignment Matters</h3>
      <p className="mb-4">Misaligned inputs often result in irrelevant, incorrect, or incomplete outputs. When context, prompts, and model capabilities are properly aligned, you can achieve dramatically better results with fewer iterations.</p>

      <p className="mb-4">By the end of this module, you will be able to:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Understand the relationship between context, prompts, and model capabilities</li>
        <li>Create properly aligned prompts for various tasks</li>
        <li>Troubleshoot and improve alignment issues</li>
        <li>Select the appropriate model based on task requirements</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Understanding Context</h2>
      <p className="mb-4">Context represents the information available to the AI model during reasoning. It includes explicit information you provide and implicit information the model has learned during training.</p>

      <h3 className="text-xl font-medium mb-2">Types of Context</h3>
      <h4 className="text-lg font-medium mb-2">Explicit Context</h4>
      <p className="mb-4">Information directly provided to the model, including:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Your immediate prompt</li>
        <li>Previous messages in the conversation</li>
        <li>Documents or data you've shared</li>
        <li>System prompts or instructions</li>
      </ul>

      <h4 className="text-lg font-medium mb-2">Implicit Context</h4>
      <p className="mb-4">Information the model has from training, including:</p>
      <ul className="list-disc list-inside mb-4">
        <li>General world knowledge</li>
        <li>Language patterns and semantics</li>
        <li>Domain-specific information</li>
        <li>Reasoning capabilities</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Key Context Principle</h3>
      <p className="mb-4">The AI can only work with what it knows. If critical information is missing from both explicit and implicit context, the model cannot provide accurate responses.</p>

      <h3 className="text-xl font-medium mb-2">Context Management Techniques</h3>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Progressive Disclosure:</strong> Introduce complex information incrementally rather than overwhelming the model at once.</li>
        <li><strong>Context Refreshing:</strong> Periodically summarize and restate key points in longer conversations to keep important information in the model's working memory.</li>
        <li><strong>Context Pruning:</strong> Remove irrelevant information that might distract the model from the task at hand.</li>
        <li><strong>Context Enrichment:</strong> Provide additional helpful details that inform the model's understanding of the problem space.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Prompt Engineering Fundamentals</h2>
      <p className="mb-4">Prompt engineering is the practice of crafting inputs to AI systems to achieve desired outputs. Effective prompts bridge the gap between human intent and model capabilities.</p>

      <h3 className="text-xl font-medium mb-2">Prompt Components</h3>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Task Instruction:</strong> What you want the model to do</li>
        <li><strong>Context Information:</strong> Relevant background information</li>
        <li><strong>Examples:</strong> Demonstrations of expected input/output</li>
        <li><strong>Format Specification:</strong> How the output should be structured</li>
        <li><strong>Parameters:</strong> Specific constraints or requirements</li>
        <li><strong>Persona:</strong> Role the AI should adopt</li>
        <li><strong>Constraints:</strong> Limitations or boundaries</li>
        <li><strong>Evaluation Criteria:</strong> Standards for checking quality</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Prompt Patterns</h3>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Pattern</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">When to Use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">Persona-based</td>
              <td className="py-2 px-4 border-b">Assign a specific role or identity to the AI</td>
              <td className="py-2 px-4 border-b">For specialized domain knowledge or perspective</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Step-by-step</td>
              <td className="py-2 px-4 border-b">Request explicit reasoning steps</td>
              <td className="py-2 px-4 border-b">For complex problem-solving or verification</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Few-shot learning</td>
              <td className="py-2 px-4 border-b">Provide examples of desired inputs/outputs</td>
              <td className="py-2 px-4 border-b">For establishing patterns or formats</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Chain-of-Thought</td>
              <td className="py-2 px-4 border-b">Guide through reasoning process</td>
              <td className="py-2 px-4 border-b">For logical deduction or analysis</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 className="text-lg font-medium mb-2">Basic Prompt:</h4>
      <p className="mb-4">Write a product description for a water bottle.</p>

      <h4 className="text-lg font-medium mb-2">Aligned Prompt:</h4>
      <p className="mb-4">Act as a marketing copywriter for outdoor products. Write a compelling product description for our new insulated hiking water bottle. Target audience: outdoor enthusiasts aged 25-40. Key features: double-wall vacuum insulation, 24-hour cold retention, lightweight titanium construction, leak-proof lid, and carabiner attachment. Tone should be adventurous and premium. Include a catchy headline and 3-4 paragraphs totaling ~150 words. Format with headline in bold and features as bullet points.</p>
            
      <h3 className="text-xl font-medium mb-2">Common Prompt Pitfalls</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Vague or ambiguous instructions</li>
        <li>Contradictory requirements</li>
        <li>Information overload</li>
        <li>Missing critical context</li>
        <li>Unrealistic expectations of model capabilities</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Model Capabilities and Limitations</h2>
      <p className="mb-4">Different AI models have varying capabilities, limitations, and optimal use cases. Understanding these characteristics is essential for proper alignment.</p>

      <h3 className="text-xl font-medium mb-2">Key Model Dimensions</h3>
      <h4 className="text-lg font-medium mb-2">Capabilities</h4>
      <ul className="list-disc list-inside mb-4">
        <li>Language understanding and generation</li>
        <li>Reasoning and problem-solving</li>
        <li>Domain-specific knowledge</li>
        <li>Multi-modal processing (text, images, etc.)</li>
        <li>Context window size</li>
      </ul>

      <h4 className="text-lg font-medium mb-2">Limitations</h4>
      <ul className="list-disc list-inside mb-4">
        <li>Knowledge cutoff dates</li>
        <li>Factual accuracy constraints</li>
        <li>Reasoning depth limitations</li>
        <li>Tendency for hallucination</li>
        <li>Tool use capabilities</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Popular Model Comparison</h3>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Model</th>
              <th className="py-2 px-4 border-b">Strengths</th>
              <th className="py-2 px-4 border-b">Limitations</th>
              <th className="py-2 px-4 border-b">Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">GPT-4</td>
              <td className="py-2 px-4 border-b">Advanced reasoning, broad knowledge, multimodal</td>
              <td className="py-2 px-4 border-b">Cost, occasional hallucination</td>
              <td className="py-2 px-4 border-b">Complex tasks, creative content</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Claude</td>
              <td className="py-2 px-4 border-b">Long context window, nuanced understanding</td>
              <td className="py-2 px-4 border-b">Less technical knowledge in some areas</td>
              <td className="py-2 px-4 border-b">Document analysis, conversational tasks</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">GPT-3.5</td>
              <td className="py-2 px-4 border-b">Speed, cost-effective, good general knowledge</td>
              <td className="py-2 px-4 border-b">Less sophisticated reasoning than newer models</td>
              <td className="py-2 px-4 border-b">Routine tasks, content generation</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Gemini</td>
              <td className="py-2 px-4 border-b">Strong multimodal capabilities, technical knowledge</td>
              <td className="py-2 px-4 border-b">Newer with evolving capabilities</td>
              <td className="py-2 px-4 border-b">Technical content, multimodal analysis</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-medium mb-2">Model Selection Principle</h3>
      <p className="mb-4">Match the model to the task complexity and requirements. Using more complex models doesn't always yield better results—consider efficiency, cost, and specific capabilities needed.</p>

      <h2 className="text-2xl font-semibold mb-3">Alignment Strategies</h2>
      <p className="mb-4">Effective alignment requires deliberately connecting context, prompts, and model capabilities to achieve optimal results.</p>

      <h3 className="text-xl font-medium mb-2">The Alignment Framework</h3>
      <ol className="list-decimal list-inside mb-4">
        <li><strong>Task Analysis:</strong> Define precise objectives, identify required knowledge, determine complexity level, establish success criteria.</li>
        <li><strong>Context Engineering:</strong> Gather essential information, structure information logically, prioritize key details, remove noise and distractions.</li>
        <li><strong>Model Selection:</strong> Match model to task requirements, consider context window needs, evaluate reasoning complexity, assess specialized knowledge needs.</li>
        <li><strong>Prompt Crafting:</strong> Apply appropriate prompt pattern, structure clear instructions, include examples if helpful, specify output format.</li>
        <li><strong>Execution:</strong> Run the prompt, monitor model behavior, observe initial results, note any misalignments.</li>
        <li><strong>Iterative Refinement:</strong> Analyze output quality, identify alignment issues, adjust context/prompt/model, test and repeat as needed.</li>
      </ol>

      <h3 className="text-xl font-medium mb-2">Alignment Tip</h3>
      <p className="mb-4">Start with a minimal viable prompt and context, then iterate by adding specificity and structure. This approach helps identify which elements are most critical for alignment.</p>

      <h3 className="text-xl font-medium mb-2">Common Alignment Issues and Solutions</h3>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Issue</th>
              <th className="py-2 px-4 border-b">Signs</th>
              <th className="py-2 px-4 border-b">Solution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">Insufficient Context</td>
              <td className="py-2 px-4 border-b">Model asks clarifying questions or makes incorrect assumptions</td>
              <td className="py-2 px-4 border-b">Add relevant background information and constraints</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Vague Instructions</td>
              <td className="py-2 px-4 border-b">Inconsistent or unfocused responses</td>
              <td className="py-2 px-4 border-b">Provide specific task descriptions and output requirements</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Model Capability Mismatch</td>
              <td className="py-2 px-4 border-b">Responses show reasoning errors or knowledge gaps</td>
              <td className="py-2 px-4 border-b">Switch to more capable model or simplify task requirements</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Information Overload</td>
              <td className="py-2 px-4 border-b">Model ignores important details or gets distracted</td>
              <td className="py-2 px-4 border-b">Prioritize information and structure it clearly</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold mb-3">Case Studies</h2>
      <p className="mb-4">Let's examine practical examples of alignment in action, with both successful and unsuccessful attempts.</p>

      <h3 className="text-xl font-medium mb-2">Case Study 1: Technical Documentation Creation</h3>
      <h4 className="text-lg font-medium mb-2">Initial Prompt (Misaligned):</h4>
      <p className="mb-4">Write documentation for my API.</p>

      <h4 className="text-lg font-medium mb-2">Issues:</h4>
      <ul className="list-disc list-inside mb-4">
        <li>No information about the API's purpose, endpoints, or functionality</li>
        <li>No specified format or comprehensive requirements</li>
        <li>Model lacks specific knowledge about your unique API</li>
      </ul>

      <h4 className="text-lg font-medium mb-2">Improved Prompt (Aligned):</h4>
      <p className="mb-4">Create comprehensive documentation for my weather forecast API. The API has the following endpoints:</p>
      <ol className="list-decimal list-inside mb-4">
        <li>GET /forecast/{city} - Returns 5-day weather forecast for specified city</li>
        <li>GET /current/{city} - Returns current weather conditions for specified city</li>
        <li>GET /historical/{city}/{date} - Returns historical weather data for specified city and date</li>
      </ol>
      <p className="mb-4">Each endpoint requires API key authentication via header: "X-API-Key". Response format is JSON.</p>
      <p className="mb-4">Please organize the documentation with these sections:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Overview of API functionality</li>
        <li>Authentication details</li>
        <li>Endpoint reference (parameters, responses, examples)</li>
        <li>Error codes and handling</li>
        <li>Rate limiting information (100 requests/hour)</li>
      </ul>
      <p className="mb-4">Format with markdown headings, code blocks for examples, and tables for parameters.</p>

      <h4 className="text-lg font-medium mb-2">Alignment Improvements:</h4>
      <ul className="list-disc list-inside mb-4">
        <li>Provided specific context about the API functionality</li>
        <li>Outlined clear structure for the documentation</li>
        <li>Specified format requirements</li>
        <li>Included technical details needed for accuracy</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Case Study 2: Market Analysis</h3>
      <h4 className="text-lg font-medium mb-2">Initial Prompt (Misaligned):</h4>
      <p className="mb-4">Analyze the electric vehicle market and give me insights.</p>

      <h4 className="text-lg font-medium mb-2">Issues:</h4>
      <ul className="list-disc list-inside mb-4">
        <li>Too broad and vague in scope</li>
        <li>No specific timeframe or geographical focus</li>
        <li>Unclear what kinds of insights are needed</li>
        <li>No structure for the output</li>
      </ul>

      <h4 className="text-lg font-medium mb-2">Improved Prompt (Aligned):</h4>
      <p className="mb-4">Act as a market analyst specializing in the automotive industry. Create a structured analysis of the European electric vehicle (EV) market over the past 2 years (2022-2023), focusing on:</p>
      <ol className="list-decimal list-inside mb-4">
        <li>Top 5 best-selling EV models and their market share</li>
        <li>Key trends in consumer preferences (range, charging speed, price points)</li>
        <li>Regulatory changes affecting the market (subsidies, infrastructure requirements)</li>
        <li>Competitive landscape comparing traditional automakers vs. pure EV manufacturers</li>
        <li>Predictions for market evolution in 2024-2025</li>
      </ol>
      <p className="mb-4">Format the analysis with clear headings, include data visualizations you would recommend, and note any important caveats about the data. The analysis will be presented to potential investors in an EV charging network, so emphasize infrastructure implications.</p>

      <h4 className="text-lg font-medium mb-2">Alignment Improvements:</h4>
      <ul className="list-disc list-inside mb-4">
        <li>Defined specific scope, timeframe, and geography</li>
        <li>Provided clear structure for the analysis</li>
        <li>Explained the purpose of the analysis (for investors)</li>
        <li>Assigned a specific persona to the model</li>
        <li>Requested specific types of content and format</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Practical Exercises</h2>
      <p className="mb-4">Apply your understanding of alignment principles with these hands-on exercises.</p>

      <h3 className="text-xl font-medium mb-2">Exercise 1: Prompt Improvement</h3>
      <p className="mb-4">Review the following misaligned prompt and identify issues:</p>
      <p className="mb-4">"Write content for my website."</p>
      <p className="mb-4">Now, rewrite this prompt following alignment principles, adding appropriate context, specificity, and structure.</p>
      <p className="mb-4">Your improved prompt here...</p>

      <h3 className="text-xl font-medium mb-2">Exercise 2: Alignment Troubleshooting</h3>
      <p className="mb-4">For each scenario below, identify the alignment issue and recommend a solution:</p>

      <h4 className="text-lg font-medium mb-2">Scenario 1:</h4>
      <p className="mb-4">You ask a model to "analyze the latest financial report" but receive a response saying "I don't have specific information about your financial report. Could you provide more details?"</p>
      <p className="mb-4">Identify the issue and solution...</p>

      <h4 className="text-lg font-medium mb-2">Scenario 2:</h4>
      <p className="mb-4">You ask a model to "create a complex mathematical model for predicting stock prices" but get a simplified explanation of general stock price factors instead.</p>
      <p className="mb-4">Identify the issue and solution...</p>

      <h4 className="text-lg font-medium mb-2">Scenario 3:</h4>
      <p className="mb-4">You ask for "ideas for my project" and get a scattered response covering multiple unrelated project types.</p>
      <p className="mb-4">Identify the issue and solution...</p>

      <h2 className="text-2xl font-semibold mb-3">Summary and Key Takeaways</h2>
      <h3 className="text-xl font-medium mb-2">When to Choose Claude</h3>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Document Analysis:</strong> When you need to process, analyze, or extract information from multiple documents</li>
        <li><strong>Complex Reasoning:</strong> For projects requiring nuanced understanding and multi-step reasoning</li>
        <li><strong>Large Context Needs:</strong> When you need to reference a large amount of information throughout a conversation</li>
        <li><strong>Transparency:</strong> When understanding the model's thought process is important for your project</li>
        <li><strong>Safety-Critical Content:</strong> For projects where accuracy and avoiding hallucinations is paramount</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">When to Choose ChatGPT</h3>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Current Information:</strong> When you need up-to-date information through web browsing</li>
        <li><strong>Creative Content:</strong> For projects requiring creative writing or content generation</li>
        <li><strong>Visual Content:</strong> When you need to generate or analyze images as part of your project</li>
        <li><strong>Data Analysis:</strong> For projects involving data processing through code interpreter</li>
        <li><strong>Tool Integration:</strong> When you need to leverage ChatGPT's plugin ecosystem</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Best Practices for Any Model</h3>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Be Specific:</strong> Provide clear, detailed instructions about what you want</li>
        <li><strong>Provide Context:</strong> Give relevant background information to help the model understand your needs</li>
        <li><strong>Break Down Complex Projects:</strong> Divide large projects into manageable components</li>
        <li><strong>Iterate:</strong> Use feedback loops to refine outputs until they meet your needs</li>
        <li><strong>Verify Information:</strong> Always fact-check critical information, especially numerical data or specific claims</li>
        <li><strong>Combine Strengths:</strong> For complex projects, consider using both models for different aspects of the work</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Next Steps</h2>
      <h3 className="text-xl font-medium mb-2">Next Module:</h3>
      <p className="mb-4">Understanding Perplexity Spaces and Gemini Gems</p>
      <p className="mb-4">Learn about the functionalities of Perplexity Spaces and Gemini Gems and how they can enhance your AI interactions.</p>

      <h3 className="text-xl font-medium mb-2">Return To:</h3>
      <p className="mb-4">Course Homepage</p>
      <p className="mb-4">View all available modules and continue your learning journey.</p>

      <h3 className="text-xl font-medium mb-2">AI Training Hub</h3>
      <p className="mb-4">Advanced AI Tools and Concepts</p>
      <p className="mb-4">Homepage | Back to Top</p>
      <p className="text-sm text-gray-500">© 2023 AI Training Hub. All rights reserved.</p>
    </div>
  );
}
