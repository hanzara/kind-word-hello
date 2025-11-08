import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SoftwareHealingSidebar } from "@/components/SoftwareHealingSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Lock, FileCheck, AlertTriangle, CheckCircle2, Download, Key, Globe, TrendingUp, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Security = () => {
  const [trustScore] = useState(94);
  const [tier] = useState("Platinum");

  const complianceStandards = [
    { name: "GDPR", status: "compliant", icon: Globe },
    { name: "HIPAA", status: "compliant", icon: FileCheck },
    { name: "ISO 27001", status: "compliant", icon: Award },
    { name: "SOC 2", status: "in-progress", icon: Lock }
  ];

  const securityFeatures = [
    {
      title: "Cryptographic Code Signing",
      description: "Every AI-generated patch includes signature hash, origin, and reviewer ID",
      icon: Key,
      status: "active"
    },
    {
      title: "Secret Detection",
      description: "Pre-scan checks for exposed API keys, passwords, and tokens",
      icon: AlertTriangle,
      status: "active"
    },
    {
      title: "Audit Trail",
      description: "Complete history of all mutations, approvals, and deployments",
      icon: FileCheck,
      status: "active"
    },
    {
      title: "Data Residency",
      description: "Choose where your data is stored for regional compliance",
      icon: Globe,
      status: "configured"
    }
  ];

  const recentAudits = [
    {
      id: "1",
      timestamp: "2 hours ago",
      action: "Mutation Applied",
      user: "system@tdg.ai",
      trustLevel: 95,
      details: "Performance optimization patch applied to main branch"
    },
    {
      id: "2",
      timestamp: "5 hours ago",
      action: "Security Scan",
      user: "scanner@tdg.ai",
      trustLevel: 100,
      details: "No vulnerabilities detected in latest genome scan"
    },
    {
      id: "3",
      timestamp: "1 day ago",
      action: "Compliance Check",
      user: "compliance@tdg.ai",
      trustLevel: 98,
      details: "GDPR compliance verified for all data operations"
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <SoftwareHealingSidebar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                🛡️ Security & Trust Center
              </h1>
              <p className="text-muted-foreground text-lg">
                Build with Integrity.
              </p>
            </div>

            {/* Trust Score Banner */}
            <Card className="border-primary/50 shadow-lg bg-gradient-to-br from-card to-card/80">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl flex items-center gap-3">
                      <Shield className="h-8 w-8 text-primary" />
                      TDG Trust Score: {trustScore}
                    </CardTitle>
                    <CardDescription className="text-lg mt-2">
                      {tier} Tier - World-Class Security Standards
                    </CardDescription>
                  </div>
                  <Badge className="text-lg px-4 py-2 bg-primary">
                    <Award className="mr-2 h-5 w-5" />
                    {tier}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={trustScore} className="h-3" />
                <p className="text-sm text-muted-foreground mt-3">
                  Based on patch success rate, review confidence, security compliance, and mutation reversibility
                </p>
              </CardContent>
            </Card>

            <Tabs defaultValue="compliance" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="audit">Audit Log</TabsTrigger>
              </TabsList>

              {/* Compliance Tab */}
              <TabsContent value="compliance" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {complianceStandards.map((standard) => (
                    <Card key={standard.name}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <standard.icon className="h-8 w-8 text-primary" />
                          <Badge 
                            variant={standard.status === "compliant" ? "default" : "secondary"}
                          >
                            {standard.status === "compliant" ? (
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            )}
                            {standard.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h3 className="font-semibold text-lg">{standard.name}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Reports</CardTitle>
                    <CardDescription>
                      Generate detailed compliance reports for auditors
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      <Button variant="outline" className="justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        GDPR Compliance Report
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        HIPAA Assessment
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        ISO 27001 Certificate
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Full Security Audit
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data Residency Settings</CardTitle>
                    <CardDescription>
                      Configure where your data is stored
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Primary Region</label>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">United States (US-East)</span>
                        <Badge variant="outline">Active</Badge>
                      </div>
                    </div>
                    <Button variant="outline">Change Region</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Features Tab */}
              <TabsContent value="features" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {securityFeatures.map((feature) => (
                    <Card key={feature.title}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <feature.icon className="h-5 w-5 text-primary mt-1" />
                            <div>
                              <CardTitle className="text-lg">{feature.title}</CardTitle>
                              <CardDescription className="mt-1">
                                {feature.description}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {feature.status}
                          </Badge>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Security Policies</CardTitle>
                    <CardDescription>
                      Configure automated security policies for your organization
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Auto-reject low trust patches</p>
                          <p className="text-sm text-muted-foreground">
                            Reject patches below 80% trust confidence
                          </p>
                        </div>
                        <Badge>Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Require human approval</p>
                          <p className="text-sm text-muted-foreground">
                            All mutations need manual review before deployment
                          </p>
                        </div>
                        <Badge variant="outline">Disabled</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Secret scanning</p>
                          <p className="text-sm text-muted-foreground">
                            Scan all code for exposed credentials
                          </p>
                        </div>
                        <Badge>Enabled</Badge>
                      </div>
                    </div>
                    <Button variant="outline">Configure Policies</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Audit Log Tab */}
              <TabsContent value="audit" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5 text-primary" />
                      Evolution Ledger
                    </CardTitle>
                    <CardDescription>
                      Complete audit trail of all system activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentAudits.map((audit) => (
                        <div 
                          key={audit.id}
                          className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{audit.action}</Badge>
                                <span className="text-xs text-muted-foreground">
                                  {audit.timestamp}
                                </span>
                              </div>
                              <p className="text-sm font-medium">{audit.details}</p>
                              <p className="text-xs text-muted-foreground">
                                by {audit.user}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">Trust: {audit.trustLevel}%</div>
                              <Progress value={audit.trustLevel} className="h-1 w-16 mt-1" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <Download className="mr-2 h-4 w-4" />
                      Export Full Audit Log
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Transparency Dashboard</CardTitle>
                    <CardDescription>
                      Global leaderboard of verified safe projects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Your Global Rank</p>
                          <p className="text-sm text-muted-foreground">Among all TDG users</p>
                        </div>
                        <Badge className="text-lg px-3 py-1">#247</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Verified Safe Mutations</p>
                          <p className="text-sm text-muted-foreground">Total approved patches</p>
                        </div>
                        <span className="text-lg font-bold">12</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4">
                      View Global Leaderboard
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Security;
