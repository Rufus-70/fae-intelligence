'use client'

import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Bot, CheckCircle, AlertTriangle, BookOpen, Download, ExternalLink, Lightbulb, DollarSign, TrendingUp, Award, Target, Zap, MessageSquare, Shield, Code, GitBranch, Database, Settings, Brain, Layers, Search } from 'lucide-react'
import Link from 'next/link'

export default function PerplexityGuidePage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
        <Container>
          <div className="text-center">
            <Search className="h-16 w-16 text-purple-200 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Perplexity for Research: Advanced Information Discovery</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Master Perplexity for in-depth manufacturing research, competitive analysis, and staying current with industry trends and technologies.
            </p>
          </div>
        </Container>
      </section>

      {/* Navigation */}
      <section className="py-4 bg-gray-100">
        <Container>
          <Link href="/resources/programming-training" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Programming Training
          </Link>
        </Container>
      </section>

      {/* Refined Learning Objectives */}
      <section className="py-12 bg-purple-50">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What You Will Learn</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <Target className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Formulate Advanced Search Queries</h3>
                <p className="text-gray-700 text-sm">Conduct targeted and efficient information retrieval for manufacturing research.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <TrendingUp className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Conduct Industry Research & Trend Analysis</h3>
                <p className="text-gray-700 text-sm">Identify key developments, market shifts, and future outlooks in manufacturing.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <Award className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Perform Competitive Intelligence</h3>
                <p className="text-gray-700 text-sm">Identify market opportunities, threats, and strategic positioning of competitors.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <Lightbulb className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Evaluate New Technologies</h3>
                <p className="text-gray-700 text-sm">Research and assess new manufacturing technologies, materials, and processes.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <DollarSign className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Gather Supplier & Vendor Intelligence</h3>
                <p className="text-gray-700 text-sm">Efficiently research potential partners, assessing capabilities and risks.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <Shield className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Assess Source Reliability & Bias</h3>
                <p className="text-gray-700 text-sm">Ensure data integrity for manufacturing decision-making.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
              <Zap className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Integrate Perplexity Insights</h3>
                <p className="text-gray-700 text-sm">Apply research findings into strategic planning and operational improvement.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Overview */}
      <section className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Perplexity for Manufacturing Research?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Perplexity&apos;s ability to synthesize information from diverse sources and provide cited answers makes it an indispensable tool for manufacturing 
              professionals needing rapid, accurate, and comprehensive research for strategic decisions, market analysis, and technology evaluation.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-600">
                    <CheckCircle className="h-6 w-6 mr-2" />
                    Best Use Cases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Industry trend analysis & forecasting</li>
                    <li>• Competitive landscape mapping</li>
                    <li>• New technology assessment & due diligence</li>
                    <li>• Supplier vetting & risk assessment</li>
                    <li>• Market opportunity identification</li>
                    <li>• Regulatory compliance research</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-600">
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    Important Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Requires careful query formulation for precise results</li>
                    <li>• Human verification of critical facts is essential</li>
                    <li>• Ethical implications of AI-driven research (e.g., data privacy, bias in sources)</li>
                    <li>• May not always provide real-time, proprietary market data</li>
                  </ul>
                  <h4 className="font-semibold text-gray-900 mt-4">Ethical Considerations:</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>• Data Privacy: Be cautious with sensitive internal data in queries.</li>
                    <li>• Bias Awareness: Be vigilant for biases in source selection and information synthesis.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Modules */}
      <section className="py-12 bg-gray-50">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Training Modules</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Module 1: Advanced Search & Query Techniques */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Module 1: Advanced Search & Query Techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Learn to formulate precise queries and utilize Perplexity's features for targeted information retrieval in manufacturing contexts.
                </p>
                <h4 className="font-semibold text-gray-900 mt-4">Content:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Mastering Perplexity Query Syntax (Advanced operators, Focus options)</li>
                  <li>Natural Language Query Optimization (Crafting conversational yet precise questions)</li>
                  <li>Understanding Perplexity's Source Integration (How Perplexity synthesizes information, evaluating credibility)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Interactive Elements:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Guided Query Builder (Conceptual: web-based tool for query construction with real-time feedback)</li>
                  <li>Search Result Analysis Challenge (Conceptual: analyze simulated results, identify relevant sources)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Assessment:</h4>
                <p className="text-gray-700 text-sm">Implicit assessment via Guided Query Builder success; formal assessment via Search Result Analysis Challenge.</p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Module
                </Button>
              </CardContent>
            </Card>

            {/* Module 2: Competitive Analysis & Market Research */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Module 2: Competitive Analysis & Market Research</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Conduct comprehensive industry research and competitive intelligence to identify market opportunities and threats.
                </p>
                <h4 className="font-semibold text-gray-900 mt-4">Content:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Industry Research & Trend Analysis (Identifying emerging technologies, market shifts)</li>
                  <li>Competitive Intelligence Deep Dive (Analyzing competitors' portfolios, strategies)</li>
                  <li>Market Opportunity & Threat Identification (Uncovering underserved segments, disruptive technologies)</li>
                  <li>Case Study: Market Trend Identification for "Green Manufacturing Solutions." (Focus on identifying new market opportunities and competitive threats)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Interactive Elements:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Competitive Landscape Mapper (Conceptual: user inputs product/service, tool identifies competitors/market share)</li>
                  <li>Case Study: Market Entry Research (Conceptual: simulated scenario, user gathers market data)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Assessment:</h4>
                <p className="text-gray-700 text-sm">Competitive Landscape Mapper & Market Entry Research (self-assessment against criteria).</p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Module
                </Button>
              </CardContent>
            </Card>

            {/* Module 3: Technology Evaluation & Due Diligence */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Module 3: Technology Evaluation & Due Diligence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Evaluate new technologies and their potential impact on manufacturing operations through thorough research and due diligence.
                </p>
                <h4 className="font-semibold text-gray-900 mt-4">Content:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Researching Emerging Manufacturing Technologies (New materials, automation, AI applications)</li>
                  <li>Due Diligence for Technology Adoption (Researching risks, regulatory compliance)</li>
                  <li>Comparative Technology Analysis (Comparing solutions based on performance, cost)</li>
                  <li>Case Study: Evaluating Robotics Solutions for "Automated Assembly Inc." (Focus on informed technology selection and risk mitigation)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Interactive Elements:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Technology Assessment Framework Builder (Conceptual: user selects technology, tool gathers assessment info)</li>
                  <li>Due Diligence Scenario (Conceptual: simulated scenario, user researches risks/compliance)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Assessment:</h4>
                <p className="text-gray-700 text-sm">Technology Assessment Framework Builder & Due Diligence Scenario (self-assessment against criteria).</p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Module
                </Button>
              </CardContent>
            </Card>

            {/* Module 4: Supplier & Vendor Intelligence */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Module 4: Supplier & Vendor Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Efficiently gather intelligence on suppliers, vendors, and potential partners, assessing their capabilities and risks.
                </p>
                <h4 className="font-semibold text-gray-900 mt-4">Content:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Supplier Vetting & Risk Assessment (Researching financial stability, quality certifications)</li>
                  <li>Vendor Performance & Reputation Analysis (Finding reviews, news articles, industry reports)</li>
                  <li>Identifying Alternative Suppliers (Quickly identify and evaluate alternatives)</li>
                  <li>Case Study: Supply Chain Resilience for "Global Components Ltd." (Focus on proactive risk management and efficient supplier selection)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Interactive Elements:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                  <li>Supplier Risk Assessment Tool (Conceptual: user inputs supplier, tool gathers risk info)</li>
                  <li>Supply Chain Disruption Research Scenario (Conceptual: simulated disruption, user researches alternatives)</li>
                </ul>
                <h4 className="font-semibold text-gray-900 mt-4">Assessment:</h4>
                <p className="text-gray-700 text-sm">Supplier Risk Assessment Tool & Supply Chain Disruption Research Scenario (self-assessment against criteria).</p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Module
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Sample Prompts */}
      <section className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sample Manufacturing Research Prompts for Perplexity</h2>
            
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Industry Trend Analysis Prompt</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2">Prompt:</h4>
                    <p className="text-sm font-mono text-gray-800">
                      &quot;You are a market researcher specializing in the [specific manufacturing sector]. 
                      Identify the top 5 emerging trends in [specific technology or market segment] over the last 2 years. 
                      For each trend, provide: key drivers, potential impact on manufacturing operations, 
                      and leading companies in this space. Cite your sources.&quot;
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Use for:</strong> Gaining insights into evolving industry landscapes.
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Technology Evaluation Prompt</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2">Prompt:</h4>
                    <p className="text-sm font-mono text-gray-800">
                      &quot;You are a manufacturing innovation consultant. 
                      Research and evaluate the feasibility of implementing [specific technology, e.g., collaborative robots] 
                      in a [type of manufacturing, e.g., small-batch assembly] environment. 
                      Include: initial investment, potential ROI, integration challenges, 
                      and case studies of successful implementations. Cite your sources.&quot;
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Use for:</strong> Assessing new technologies for adoption.
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Supplier Vetting Prompt</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2">Prompt:</h4>
                    <p className="text-sm font-mono text-gray-800">
                      &quot;You are a supply chain risk analyst. 
                      Conduct a due diligence report on [Supplier Name]. 
                      Include: financial stability, quality certifications, ethical sourcing practices, 
                      and any recent news or controversies. Assess potential risks to our supply chain. Cite your sources.&quot;
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Use for:</strong> Evaluating and mitigating supply chain risks.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Resources & Tools */}
      <section className="py-12 bg-gray-50">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Additional Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="h-6 w-6 mr-2 text-purple-600" />
                  Research Prompt Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Download ready-to-use prompt templates for common manufacturing research scenarios.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Templates
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ExternalLink className="h-6 w-6 mr-2 text-purple-600" />
                  Perplexity Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Direct links to Perplexity's platform with recommendations for accessing its advanced research capabilities.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open('https://www.perplexity.ai', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Access Perplexity
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-6 w-6 mr-2 text-purple-600" />
                  Research Best Practices Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Comprehensive guide to Perplexity best practices specific to manufacturing research environments.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Implementation Guide */}
      <section className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Implementation Roadmap</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Week 1: Foundation & Advanced Querying</h3>
                  <p className="text-gray-700">Set up Perplexity access, complete Module 1 training, and practice advanced research queries with your team.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Week 2-4: Competitive & Market Analysis</h3>
                  <p className="text-gray-700">Use Perplexity to conduct a preliminary market analysis or competitive intelligence report. Focus on actionable insights. <span className="text-sm text-gray-500">(Expected ROI: Accelerated market trend identification by 70%, enabling proactive strategic adjustments and competitive advantage.)</span></p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Month 2+: Technology & Supplier Intelligence</h3>
                  <p className="text-gray-700">Apply Perplexity to evaluate new technologies and vet potential suppliers. <span className="text-sm text-gray-500">(Expected ROI: Reduced technology evaluation time by 50%, improved supply chain resilience by X%.)</span></p>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mt-8">Case Study: Market Trend Identification for "Green Manufacturing Solutions."</h3>
            <p className="text-gray-700 text-sm mt-2">Before Perplexity, identifying emerging market trends took weeks. After, it takes days, allowing for quicker adaptation to market shifts and identification of new opportunities. <span className="font-bold">ROI: 70% faster market trend identification, leading to proactive strategic adjustments.</span></p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-purple-600 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Master Advanced Research for Your Manufacturing Operations?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get hands-on training and implementation support for Perplexity in your manufacturing environment.
            </p>
            <div className="space-x-4">
              <Button href="/consultation" variant="outline" size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Schedule Technical Consultation
              </Button>
              <Button href="/resources/programming-training" variant="secondary" size="lg" className="bg-purple-700 hover:bg-purple-800">
                Explore More AI Tools
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
