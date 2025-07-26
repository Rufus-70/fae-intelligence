'use client'

import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Shield, Database, CheckCircle, AlertTriangle, BookOpen, Download, ExternalLink, Terminal, Settings, Clock, Users, Wrench } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function MCPDockerGuidePage() {
  const [activeTab, setActiveTab] = useState('request')
  const [selectedEnvironment, setSelectedEnvironment] = useState('')
  const [selectedIssue, setSelectedIssue] = useState('')

  const securityChecklists = {
    development: [
      '□ Enable Docker Desktop security features',
      '□ Use non-root users in containers',
      '□ Implement basic input validation',
      '□ Enable container resource limits',
      '□ Use .dockerignore files'
    ],
    staging: [
      '□ All development security measures',
      '□ Implement JWT authentication',
      '□ Enable container scanning',
      '□ Configure network isolation',
      '□ Set up monitoring and alerting',
      '□ Review and audit container configurations'
    ],
    production: [
      '□ All staging security measures',
      '□ Enable SELinux/AppArmor security profiles',
      '□ Implement comprehensive logging',
      '□ Set up automated security scanning',
      '□ Configure secrets management',
      '□ Enable container image signing',
      '□ Set up incident response procedures',
      '□ Conduct regular security audits'
    ]
  }

  const troubleshootingSolutions = {
    'mcp-timeout': {
      title: 'MCP Request Timeout',
      steps: [
        '1. Check network connectivity between MCP client and server',
        '2. Increase timeout values in configuration',
        '3. Monitor server resource usage (CPU, memory)',
        '4. Check for Docker container startup delays',
        '5. Implement connection pooling if not already present',
        '6. Review server logs for bottlenecks'
      ]
    },
    'docker-permission': {
      title: 'Docker Permission Denied',
      steps: [
        '1. Add user to docker group: sudo usermod -aG docker $USER',
        '2. Restart Docker Desktop service',
        '3. Check file/directory permissions on mounted volumes',
        '4. Verify Docker daemon is running',
        '5. Try running with sudo (temporary fix)',
        '6. Check Docker Desktop settings and privileges'
      ]
    },
    'container-crash': {
      title: 'Container Keeps Crashing',
      steps: [
        '1. Check container logs: docker logs [container_id]',
        '2. Verify image compatibility with host system',
        '3. Check resource limits (memory, CPU)',
        '4. Validate environment variables and configuration',
        '5. Test with interactive mode: docker run -it [image]',
        '6. Review health check configuration'
      ]
    }
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
        <Container>
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-16 w-16 text-indigo-200 mr-4" />
              <Database className="h-16 w-16 text-purple-200" />
            </div>
            <h1 className="text-4xl font-bold mb-4">MCP & Docker Desktop Training</h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-6">
              Master the Model Context Protocol (MCP) and Docker Desktop for secure, efficient system access and container management in manufacturing environments.
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                <Clock className="h-4 w-4 mr-1" /> 2-3 Hours
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
                <Users className="h-4 w-4 mr-1" /> Intermediate Level
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center">
                <Wrench className="h-4 w-4 mr-1" /> Hands-on Practice
              </span>
            </div>
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

      {/* Overview */}
      <section className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
            <p className="text-lg text-gray-700 mb-8">
              This comprehensive training covers the Model Context Protocol (MCP) and Docker Desktop integration for manufacturing applications. 
              Learn to create secure, isolated environments for AI system access and container management.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-indigo-600">
                    <Shield className="h-6 w-6 mr-2" />
                    MCP Fundamentals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Protocol architecture and message types</li>
                    <li>• Secure system access patterns</li>
                    <li>• Authentication and authorization</li>
                    <li>• Request/response handling</li>
                    <li>• Error handling and debugging</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-600">
                    <Database className="h-6 w-6 mr-2" />
                    Docker Desktop Mastery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Container lifecycle management</li>
                    <li>• Image building and deployment</li>
                    <li>• Volume and network management</li>
                    <li>• Security best practices</li>
                    <li>• Multi-container orchestration</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Terminal className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Prerequisites</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Basic command line knowledge</li>
                    <li>Understanding of APIs</li>
                    <li>Basic networking concepts</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Settings className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">System Requirements</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Windows 10/11, macOS, or Linux</li>
                    <li>8GB RAM recommended</li>
                    <li>10GB free disk space</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Download className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Required Software</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Docker Desktop (latest version)</li>
                    <li>VS Code (recommended)</li>
                    <li>Git for version control</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* MCP Message Structure Interactive */}
      <section className="py-12 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Interactive: MCP Message Structure</h2>
            <p className="text-center mb-6">Click the tabs below to explore different MCP message types:</p>
            
            <div className="flex justify-center space-x-2 mb-6">
              {['request', 'response', 'error'].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "primary" : "outline"}
                  onClick={() => setActiveTab(tab)}
                  className="capitalize"
                >
                  {tab}
                </Button>
              ))}
            </div>

            <Card>
              <CardContent className="p-6">
                {activeTab === 'request' && (
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "type": "request",
  "id": "req-001",
  "method": "system.execute",
  "params": {
    "command": "docker ps",
    "timeout": 30
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                  </pre>
                )}
                
                {activeTab === 'response' && (
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "type": "response",
  "id": "req-001",
  "result": {
    "output": "CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS",
    "exitCode": 0,
    "duration": 2.3
  },
  "timestamp": "2024-01-15T10:30:02Z"
}`}
                  </pre>
                )}
                
                {activeTab === 'error' && (
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "type": "error",
  "id": "req-001",
  "error": {
    "code": "PERMISSION_DENIED",
    "message": "Insufficient privileges to execute command",
    "details": {
      "required_permission": "docker.execute",
      "current_user": "standard_user"
    }
  },
  "timestamp": "2024-01-15T10:30:01Z"
}`}
                  </pre>
                )}
              </CardContent>
            </Card>

            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="font-semibold text-yellow-800">Security Considerations</span>
              </div>
              <p className="text-yellow-700 mt-2">
                Always validate and sanitize MCP requests before execution. Implement proper authentication and authorization mechanisms to prevent unauthorized system access.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Training Modules */}
      <section className="py-12">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Training Modules</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">1. MCP Fundamentals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 text-sm">
                  Learn protocol architecture, message types, and core concepts for secure system communication.
                </p>
                <div className="text-xs text-gray-600 mb-4">
                  <strong>Topics:</strong> Protocol basics, authentication, message handling
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">2. Docker Desktop Basics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 text-sm">
                  Master container management, image building, and Docker Desktop GUI features.
                </p>
                <div className="text-xs text-gray-600 mb-4">
                  <strong>Topics:</strong> Installation, commands, GUI features, networking
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">3. System Access Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 text-sm">
                  Implement secure integration patterns between MCP and Docker for manufacturing applications.
                </p>
                <div className="text-xs text-gray-600 mb-4">
                  <strong>Topics:</strong> Integration patterns, orchestration, monitoring
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">4. Security Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 text-sm">
                  Implement comprehensive security measures for production manufacturing environments.
                </p>
                <div className="text-xs text-gray-600 mb-4">
                  <strong>Topics:</strong> Container security, access control, monitoring
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Security Checklist Generator */}
      <section className="py-12 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Security Checklist Generator</h2>
            <p className="text-center mb-6">Select your deployment environment to generate a customized security checklist:</p>
            
            <div className="mb-6">
              <select 
                value={selectedEnvironment}
                onChange={(e) => setSelectedEnvironment(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select Environment...</option>
                <option value="development">Development Environment</option>
                <option value="staging">Staging Environment</option>
                <option value="production">Production Environment</option>
              </select>
            </div>

            {selectedEnvironment && (
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{selectedEnvironment} Security Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(securityChecklists as any)[selectedEnvironment].map((item: string, index: number) => (
                      <li key={index} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </Container>
      </section>

      {/* Hands-on Exercises */}
      <section className="py-12">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Hands-on Exercises</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Exercise 1: Basic MCP-Docker Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Create a simple MCP server that can execute Python scripts in isolated Docker containers for manufacturing data processing.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold mb-2">Key Components:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Flask-based MCP server</li>
                    <li>• Docker container execution</li>
                    <li>• Input validation and security</li>
                    <li>• Error handling and timeouts</li>
                  </ul>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Exercise Details
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Exercise 2: Secure File Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Build a secure file processing system for manufacturing data with proper isolation and security controls.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold mb-2">Key Components:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Docker Compose configuration</li>
                    <li>• Secure volume mounting</li>
                    <li>• File validation and processing</li>
                    <li>• Resource limits and monitoring</li>
                  </ul>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Exercise Details
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Troubleshooting Tool */}
      <section className="py-12 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Interactive Troubleshooting Tool</h2>
            <p className="text-center mb-6">Select your issue type to get specific troubleshooting steps:</p>
            
            <div className="mb-6">
              <select 
                value={selectedIssue}
                onChange={(e) => setSelectedIssue(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select an issue type...</option>
                <option value="mcp-timeout">MCP Request Timeout</option>
                <option value="docker-permission">Docker Permission Denied</option>
                <option value="container-crash">Container Keeps Crashing</option>
              </select>
            </div>

            {selectedIssue && (troubleshootingSolutions as any)[selectedIssue] && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">{(troubleshootingSolutions as any)[selectedIssue].title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {(troubleshootingSolutions as any)[selectedIssue].steps.map((step: string, index: number) => (
                      <li key={index} className="text-sm">{step}</li>
                    ))}
                  </ol>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> If the issue persists after trying these steps, 
                      consider checking the official documentation or community forums for your specific error message.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </Container>
      </section>

      {/* Resources */}
      <section className="py-12">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Additional Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="h-6 w-6 mr-2 text-indigo-600" />
                  Code Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Download starter templates for MCP servers, Docker configurations, and security setups.
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
                  <ExternalLink className="h-6 w-6 mr-2 text-indigo-600" />
                  Official Documentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Links to MCP specification, Docker Desktop docs, and best practices guides.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open('https://docs.docker.com', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Documentation
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-6 w-6 mr-2 text-indigo-600" />
                  Advanced Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Explore Kubernetes integration, service mesh implementation, and advanced security patterns.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Explore Advanced
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Implement Secure Container Systems?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get hands-on training and implementation support for MCP and Docker Desktop in your manufacturing environment.
            </p>
            <div className="space-x-4">
              <Button href="/consultation" variant="outline" size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                Schedule Technical Consultation
              </Button>
              <Button href="/resources/programming-training" variant="secondary" size="lg" className="bg-indigo-700 hover:bg-indigo-800">
                Explore More Training
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
