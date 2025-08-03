'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Database, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  BarChart3,
  Clock,
  Activity,
  Search,
  Code
} from 'lucide-react';

interface HealthStatus {
  connected: boolean;
  database?: any;
  contentAssets: number;
  recentExtractions: any[];
  error?: string;
}

interface ExtractionMetadata {
  platform: string;
  lastExtraction?: string;
  totalFiles?: number;
  extractedComponents?: number;
  processedFiles?: number;
  errors?: number;
}

export default function KnowledgeHealthDashboard() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [extractionStats, setExtractionStats] = useState<{[key: string]: ExtractionMetadata}>({});
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  useEffect(() => {
    loadHealthData();
    
    // Set up periodic health checks
    const interval = setInterval(loadHealthData, 30000); // Every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadHealthData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadHealthStatus(),
        loadExtractionStats()
      ]);
      setLastUpdate(new Date());
    } catch (error) {
      showMessage('error', 'Failed to load health data');
    } finally {
      setLoading(false);
    }
  };

  const loadHealthStatus = async () => {
    try {
      const response = await fetch('/api/knowledge-health?action=status');
      const data = await response.json();
      setHealthStatus(data);
    } catch (error) {
      console.error('Failed to load health status:', error);
    }
  };

  const loadExtractionStats = async () => {
    try {
      const response = await fetch('/api/knowledge-health?action=content-stats');
      const data = await response.json();
      setExtractionStats(data.extractionMetadata || {});
    } catch (error) {
      console.error('Failed to load extraction stats:', error);
    }
  };

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/knowledge-health?action=test-connection');
      const data = await response.json();
      
      if (data.connected) {
        showMessage('success', 'Database connection successful');
      } else {
        showMessage('error', 'Database connection failed');
      }
      
      await loadHealthStatus();
    } catch (error) {
      showMessage('error', 'Connection test failed');
    } finally {
      setLoading(false);
    }
  };

  const triggerReactExtraction = async () => {
    try {
      const response = await fetch('/api/react-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'extract' })
      });
      
      const data = await response.json();
      showMessage('success', 'React content extraction started');
      
      // Refresh stats after a delay
      setTimeout(() => {
        loadExtractionStats();
      }, 3000);
      
    } catch (error) {
      showMessage('error', 'Failed to start React extraction');
    }
  };

  const showMessage = (type: 'success' | 'error' | 'info', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const getStatusIcon = (connected: boolean) => {
    return connected ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <XCircle className="h-4 w-4 text-red-500" />;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Knowledge Integration Health</h2>
          <p className="text-muted-foreground">
            Monitor Neo4j connectivity and content extraction status
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            onClick={loadHealthData}
            disabled={loading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          {lastUpdate && (
            <span className="text-sm text-muted-foreground">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      {/* Messages */}
      {message && (
        <Alert className={message.type === 'error' ? 'border-red-200' : message.type === 'success' ? 'border-green-200' : 'border-blue-200'}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="extractions">Extractions</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Database Status Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Database Status</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  {healthStatus && getStatusIcon(healthStatus.connected)}
                  <div className="text-2xl font-bold">
                    {healthStatus?.connected ? 'Connected' : 'Disconnected'}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Assets Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Content Assets</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {healthStatus?.contentAssets || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total indexed items
                </p>
              </CardContent>
            </Card>

            {/* React Components Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">React Components</CardTitle>
                <Code className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {extractionStats.react?.extractedComponents || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Components extracted
                </p>
              </CardContent>
            </Card>

            {/* Last Activity Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-bold">
                  {extractionStats.react?.lastExtraction ? 
                    formatDate(extractionStats.react.lastExtraction) : 'No activity'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Most recent extraction
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Extractions */}
          {healthStatus?.recentExtractions && healthStatus.recentExtractions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Extraction Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {healthStatus.recentExtractions.map((extraction, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{extraction.platform}</Badge>
                        <span className="text-sm">
                          {formatDate(extraction.lastExtraction)}
                        </span>
                      </div>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Database Tab */}
        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Neo4j Database Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Connection Status</p>
                    <div className="flex items-center space-x-2">
                      {healthStatus && getStatusIcon(healthStatus.connected)}
                      <span>{healthStatus?.connected ? 'Connected' : 'Disconnected'}</span>
                    </div>
                  </div>
                  
                  {healthStatus?.database && (
                    <>
                      <div>
                        <p className="font-medium">Database Version</p>
                        <p className="text-sm text-muted-foreground">
                          {healthStatus.database.version}
                        </p>
                      </div>
                      
                      <div>
                        <p className="font-medium">Edition</p>
                        <p className="text-sm text-muted-foreground">
                          {healthStatus.database.edition}
                        </p>
                      </div>
                    </>
                  )}
                  
                  <div>
                    <p className="font-medium">Content Assets</p>
                    <p className="text-sm text-muted-foreground">
                      {healthStatus?.contentAssets || 0} total items
                    </p>
                  </div>
                </div>

                <Button onClick={testConnection} disabled={loading}>
                  <Database className="mr-2 h-4 w-4" />
                  Test Connection
                </Button>

                {healthStatus?.error && (
                  <Alert className="border-red-200">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{healthStatus.error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Extractions Tab */}
        <TabsContent value="extractions">
          <div className="space-y-4">
            {/* React Extraction */}
            <Card>
              <CardHeader>
                <CardTitle>React Component Extraction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium">Last Run</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(extractionStats.react?.lastExtraction)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Files Processed</p>
                      <p className="text-sm text-muted-foreground">
                        {extractionStats.react?.processedFiles || 0} / {extractionStats.react?.totalFiles || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Components Extracted</p>
                      <p className="text-sm text-muted-foreground">
                        {extractionStats.react?.extractedComponents || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Errors</p>
                      <p className="text-sm text-muted-foreground">
                        {extractionStats.react?.errors || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Firebase Extraction */}
            <Card>
              <CardHeader>
                <CardTitle>Firebase Content Extraction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium">Last Run</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(extractionStats.firebase?.lastExtraction)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <Badge variant={extractionStats.firebase?.lastExtraction ? "default" : "secondary"}>
                        {extractionStats.firebase?.lastExtraction ? "Configured" : "Not Run"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Actions Tab */}
        <TabsContent value="actions">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Manual Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <h4 className="font-medium">Extract React Components</h4>
                      <p className="text-sm text-muted-foreground">
                        Scan and extract content from React/TSX files in the src directory
                      </p>
                    </div>
                    <Button onClick={triggerReactExtraction}>
                      <Code className="mr-2 h-4 w-4" />
                      Extract
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <h4 className="font-medium">Test Database Connection</h4>
                      <p className="text-sm text-muted-foreground">
                        Verify Neo4j connectivity and permissions
                      </p>
                    </div>
                    <Button onClick={testConnection} variant="outline">
                      <Database className="mr-2 h-4 w-4" />
                      Test
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <h4 className="font-medium">Refresh Health Status</h4>
                      <p className="text-sm text-muted-foreground">
                        Update all health metrics and statistics
                      </p>
                    </div>
                    <Button onClick={loadHealthData} variant="outline" disabled={loading}>
                      <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}