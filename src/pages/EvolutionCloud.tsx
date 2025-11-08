import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SoftwareHealingSidebar } from "@/components/SoftwareHealingSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Cloud, Activity, TrendingUp, Shield, DollarSign, 
  GitBranch, Clock, CheckCircle2, XCircle, Pause, 
  Play, RotateCcw, ChevronRight, Server, Database,
  Cpu, Zap, Lock, AlertCircle
} from "lucide-react";
import { toast } from "sonner";

export default function EvolutionCloud() {
  const [evolutionMode, setEvolutionMode] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  // Mock real-time metrics (will connect to real DB after setup)
  const [metrics, setMetrics] = useState({
    performanceGain: 23,
    securityStability: 98,
    costOptimization: 15,
    mutationSuccess: 87,
    cpuUsage: 45,
    memoryUsage: 62,
    responseTime: 28,
    errorRate: 2
  });

  // Simulate real-time updates
  useEffect(() => {
    if (evolutionMode) {
      const interval = setInterval(() => {
        setMetrics(prev => ({
          performanceGain: Math.min(100, prev.performanceGain + Math.random() * 2),
          securityStability: Math.max(90, Math.min(100, prev.securityStability + (Math.random() - 0.5))),
          costOptimization: Math.min(100, prev.costOptimization + Math.random() * 1.5),
          mutationSuccess: Math.max(80, Math.min(95, prev.mutationSuccess + (Math.random() - 0.5) * 2)),
          cpuUsage: Math.max(20, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 10)),
          memoryUsage: Math.max(30, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 8)),
          responseTime: Math.max(10, Math.min(100, prev.responseTime + (Math.random() - 0.5) * 5)),
          errorRate: Math.max(0, Math.min(10, prev.errorRate + (Math.random() - 0.5) * 0.5))
        }));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [evolutionMode]);

  const handleEvolutionToggle = (enabled: boolean) => {
    setEvolutionMode(enabled);
    toast.success(enabled ? "Evolution Mode Activated 🧬" : "Evolution Mode Paused");
  };

  const handleDeploy = (platform: string) => {
    setIsDeploying(true);
    toast.success(`Deploying to ${platform}...`);
    setTimeout(() => {
      setIsDeploying(false);
      toast.success(`Successfully deployed to ${platform}!`);
    }, 2000);
  };

  // Mock evolution ledger data
  const ledgerEntries = [
    {
      id: "m#2025-115",
      mutation_id: "m#2025-115",
      created_at: "2025-11-08T12:32:44Z",
      type: "performance",
      description: "Optimized database queries",
      gain: "+23%",
      status: "success",
      signature: "AI_NODE_8x"
    },
    {
      id: "m#2025-114",
      mutation_id: "m#2025-114",
      created_at: "2025-11-08T11:15:20Z",
      type: "security",
      description: "Updated dependency vulnerabilities",
      gain: "+5% security",
      status: "success",
      signature: "AI_NODE_7x"
    },
    {
      id: "m#2025-113",
      mutation_id: "m#2025-113",
      created_at: "2025-11-08T09:48:12Z",
      type: "cost",
      description: "Optimized API caching strategy",
      gain: "-15% cost",
      status: "success",
      signature: "AI_NODE_6x"
    },
    {
      id: "m#2025-112",
      mutation_id: "m#2025-112",
      created_at: "2025-11-08T08:22:05Z",
      type: "performance",
      description: "Improved async operation handling",
      gain: "+12%",
      status: "rolled_back",
      signature: "AI_NODE_5x"
    }
  ];

  const deploymentHistory = [
    {
      id: "1",
      platform: "Netlify",
      version: "v2.3.1",
      created_at: "2025-11-08T10:32:44Z",
      status: "success"
    },
    {
      id: "2",
      platform: "Vercel",
      version: "v2.3.0",
      created_at: "2025-11-08T07:15:20Z",
      status: "success"
    },
    {
      id: "3",
      platform: "Netlify",
      version: "v2.2.9",
      created_at: "2025-11-07T12:32:44Z",
      status: "success"
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SoftwareHealingSidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
                  <Cloud className="h-10 w-10 text-primary" />
                  Evolution Cloud
                </h1>
                <p className="text-muted-foreground">
                  Autonomous self-evolution with immutable history tracking
                </p>
              </div>
              
              {/* Evolution Mode Toggle */}
              <Card className="p-4 border-primary/20">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-medium">Evolution Mode</p>
                    <p className="text-xs text-muted-foreground">
                      {evolutionMode ? "Active" : "Paused"}
                    </p>
                  </div>
                  <Switch
                    checked={evolutionMode}
                    onCheckedChange={handleEvolutionToggle}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </Card>
            </div>

            <Tabs defaultValue="live" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="live">🔄 Live Evolution</TabsTrigger>
                <TabsTrigger value="insights">📊 Performance Insights</TabsTrigger>
                <TabsTrigger value="ledger">📜 Evolution Ledger</TabsTrigger>
                <TabsTrigger value="deployments">☁️ Deployments</TabsTrigger>
              </TabsList>

              {/* Live Evolution Tab */}
              <TabsContent value="live" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard
                    icon={<TrendingUp className="h-5 w-5" />}
                    title="Performance Gain"
                    value={`${metrics.performanceGain.toFixed(1)}%`}
                    trend="+5.2%"
                    color="text-green-500"
                  />
                  <MetricCard
                    icon={<Shield className="h-5 w-5" />}
                    title="Security Stability"
                    value={`${metrics.securityStability.toFixed(1)}%`}
                    trend="+2.1%"
                    color="text-blue-500"
                  />
                  <MetricCard
                    icon={<DollarSign className="h-5 w-5" />}
                    title="Cost Optimization"
                    value={`${metrics.costOptimization.toFixed(1)}%`}
                    trend="+3.8%"
                    color="text-yellow-500"
                  />
                  <MetricCard
                    icon={<GitBranch className="h-5 w-5" />}
                    title="Mutation Success"
                    value={`${metrics.mutationSuccess.toFixed(1)}%`}
                    trend="+1.2%"
                    color="text-purple-500"
                  />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Live Monitoring
                    </CardTitle>
                    <CardDescription>
                      Real-time application health and evolution activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <MonitoringRow
                      icon={<Cpu className="h-4 w-4" />}
                      label="CPU Usage"
                      value={metrics.cpuUsage}
                      status="healthy"
                    />
                    <MonitoringRow
                      icon={<Database className="h-4 w-4" />}
                      label="Memory"
                      value={metrics.memoryUsage}
                      status="healthy"
                    />
                    <MonitoringRow
                      icon={<Zap className="h-4 w-4" />}
                      label="Response Time"
                      value={metrics.responseTime}
                      status="optimal"
                    />
                    <MonitoringRow
                      icon={<AlertCircle className="h-4 w-4" />}
                      label="Error Rate"
                      value={metrics.errorRate}
                      status="healthy"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Performance Insights Tab */}
              <TabsContent value="insights" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Trends</CardTitle>
                      <CardDescription>Last 30 days evolution progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-muted-foreground">
                        <div className="text-center space-y-2">
                          <TrendingUp className="h-12 w-12 mx-auto text-primary" />
                          <p>Performance graph visualization</p>
                          <p className="text-sm">23% improvement this month</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Cost Analysis</CardTitle>
                      <CardDescription>Resource optimization savings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Compute</span>
                            <span className="text-sm font-medium">-$45/mo</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Storage</span>
                            <span className="text-sm font-medium">-$12/mo</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Network</span>
                            <span className="text-sm font-medium">-$8/mo</span>
                          </div>
                          <Progress value={25} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Mutation Success Rate</CardTitle>
                    <CardDescription>AI-driven optimization performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-3xl font-bold text-green-500">127</p>
                        <p className="text-sm text-muted-foreground">Successful</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-yellow-500">18</p>
                        <p className="text-sm text-muted-foreground">Rolled Back</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-blue-500">9</p>
                        <p className="text-sm text-muted-foreground">In Testing</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Evolution Ledger Tab */}
              <TabsContent value="ledger" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Immutable Evolution Ledger
                    </CardTitle>
                    <CardDescription>
                      Tamper-proof record of all self-improvements and deployments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-96">
                      <div className="space-y-3">
                        {ledgerEntries.map((entry) => (
                          <LedgerEntry key={entry.id} entry={entry} />
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Deployments Tab */}
              <TabsContent value="deployments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Deploy Evolution Improvements</CardTitle>
                    <CardDescription>
                      Push optimizations to your production environments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DeploymentCard
                        name="Netlify"
                        icon={<Server className="h-8 w-8" />}
                        status="connected"
                        lastDeploy="2 hours ago"
                        onDeploy={() => handleDeploy("Netlify")}
                        isDeploying={isDeploying}
                      />
                      <DeploymentCard
                        name="Vercel"
                        icon={<Cloud className="h-8 w-8" />}
                        status="connected"
                        lastDeploy="5 hours ago"
                        onDeploy={() => handleDeploy("Vercel")}
                        isDeploying={isDeploying}
                      />
                      <DeploymentCard
                        name="AWS"
                        icon={<Server className="h-8 w-8" />}
                        status="not_connected"
                        lastDeploy="Never"
                        onDeploy={() => toast.info("Connect your AWS account first")}
                        isDeploying={false}
                      />
                      <DeploymentCard
                        name="Custom Server"
                        icon={<Database className="h-8 w-8" />}
                        status="not_connected"
                        lastDeploy="Never"
                        onDeploy={() => toast.info("Configure custom server first")}
                        isDeploying={false}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Deployment History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <DeploymentHistoryItem
                        platform="Netlify"
                        version="v2.3.1"
                        timestamp="2 hours ago"
                        status="success"
                      />
                      <DeploymentHistoryItem
                        platform="Vercel"
                        version="v2.3.0"
                        timestamp="5 hours ago"
                        status="success"
                      />
                      <DeploymentHistoryItem
                        platform="Netlify"
                        version="v2.2.9"
                        timestamp="1 day ago"
                        status="success"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

const MetricCard = ({ icon, title, value, trend, color }: any) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center justify-between mb-2">
        <span className={color}>{icon}</span>
        <Badge variant="secondary" className="text-xs">
          {trend}
        </Badge>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{title}</p>
    </CardContent>
  </Card>
);

const MonitoringRow = ({ icon, label, value, status }: any) => {
  const statusColors = {
    healthy: "text-green-500",
    optimal: "text-blue-500",
    warning: "text-yellow-500"
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={statusColors[status as keyof typeof statusColors]}>{icon}</span>
          <span className="text-sm">{label}</span>
        </div>
        <span className="text-sm font-medium">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
};

const LedgerEntry = ({ entry }: any) => {
  const typeIcons = {
    performance: <TrendingUp className="h-4 w-4 text-green-500" />,
    security: <Shield className="h-4 w-4 text-blue-500" />,
    cost: <DollarSign className="h-4 w-4 text-yellow-500" />
  };

  const statusIcons = {
    success: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    rolled_back: <RotateCcw className="h-4 w-4 text-yellow-500" />
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
      {typeIcons[entry.type as keyof typeof typeIcons]}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="font-medium text-sm">{entry.description}</p>
          {statusIcons[entry.status as keyof typeof statusIcons]}
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {new Date(entry.created_at).toLocaleString()}
          </span>
          <span className="font-medium text-primary">{entry.gain}</span>
          <span className="flex items-center gap-1">
            <Lock className="h-3 w-3" />
            {entry.signature}
          </span>
        </div>
        <Badge variant="outline" className="mt-2 text-xs">
          {entry.mutation_id}
        </Badge>
      </div>
    </div>
  );
};

const DeploymentCard = ({ name, icon, status, lastDeploy, onDeploy, isDeploying }: any) => {
  const isConnected = status === "connected";

  return (
    <Card className={`transition-all ${isConnected ? "border-primary/20" : ""}`}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={isConnected ? "text-primary" : "text-muted-foreground"}>
              {icon}
            </div>
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-xs text-muted-foreground">Last: {lastDeploy}</p>
            </div>
          </div>
          <Badge variant={isConnected ? "default" : "secondary"}>
            {isConnected ? "Connected" : "Not Connected"}
          </Badge>
        </div>
        <Button
          onClick={onDeploy}
          disabled={!isConnected || isDeploying}
          className="w-full"
          variant={isConnected ? "default" : "outline"}
        >
          {isDeploying ? "Deploying..." : "Deploy Now"}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

const DeploymentHistoryItem = ({ platform, version, timestamp, status }: any) => (
  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
    <div className="flex items-center gap-3">
      <Server className="h-4 w-4 text-muted-foreground" />
      <div>
        <p className="font-medium text-sm">{platform}</p>
        <p className="text-xs text-muted-foreground">{version} • {timestamp}</p>
      </div>
    </div>
    <Badge variant={status === "success" ? "default" : "destructive"}>
      {status === "success" ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
      {status}
    </Badge>
  </div>
);