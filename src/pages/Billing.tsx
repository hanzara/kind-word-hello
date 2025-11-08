import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SoftwareHealingSidebar } from "@/components/SoftwareHealingSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, TrendingUp, Zap, Shield, Crown, Users, DollarSign, Download, Activity } from "lucide-react";

const Billing = () => {
  const [currentPlan] = useState("Free");
  const [creditsUsed] = useState(80);
  const [totalCredits] = useState(100);

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "1 repository",
        "1 genome scan per month",
        "Manual optimization suggestions",
        "Community support",
        "Basic analytics"
      ],
      badge: null,
      cta: "Current Plan",
      disabled: currentPlan === "Free"
    },
    {
      name: "Starter",
      price: "$19",
      period: "per month",
      features: [
        "3 repositories",
        "Weekly AI reports",
        "3 mutation tests per week",
        "Email support",
        "Advanced analytics",
        "API access"
      ],
      badge: "Most Popular",
      cta: "Upgrade to Starter",
      disabled: false
    },
    {
      name: "Pro",
      price: "$99",
      period: "per month",
      features: [
        "Unlimited repositories",
        "Unlimited genome scans",
        "AI-generated patches",
        "CI/CD integrations",
        "Priority support",
        "Custom AI models",
        "Team collaboration"
      ],
      badge: null,
      cta: "Upgrade to Pro",
      disabled: false
    },
    {
      name: "Enterprise",
      price: "$1000+",
      period: "per month",
      features: [
        "Private TDG instance",
        "Custom SLA",
        "Compliance toolkit (GDPR, HIPAA)",
        "Dedicated account manager",
        "White-label option",
        "On-premise deployment",
        "24/7 premium support"
      ],
      badge: "Premium",
      cta: "Contact Sales",
      disabled: false
    }
  ];

  const usageStats = [
    { label: "Genome Scans", used: 1, total: 1, icon: Activity },
    { label: "Mutation Tests", used: 0, total: 0, icon: Zap },
    { label: "AI Reports", used: 0, total: 1, icon: TrendingUp },
    { label: "Repositories", used: 1, total: 1, icon: Users }
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
                💳 Billing & Monetization
              </h1>
              <p className="text-muted-foreground text-lg">
                Scale. Earn. Empower.
              </p>
            </div>

            <Tabs defaultValue="plans" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="plans">Plans</TabsTrigger>
                <TabsTrigger value="usage">Usage</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>

              {/* Plans Tab */}
              <TabsContent value="plans" className="space-y-6">
                {/* Current Plan Status */}
                <Card className="border-primary/50 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Crown className="h-5 w-5 text-primary" />
                          Current Plan: {currentPlan}
                        </CardTitle>
                        <CardDescription>
                          You've used {creditsUsed}% of your free mutation credits
                        </CardDescription>
                      </div>
                      <Button>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Upgrade Plan
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Progress value={creditsUsed} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-2">
                      {totalCredits - (creditsUsed / 100 * totalCredits)} credits remaining
                    </p>
                  </CardContent>
                </Card>

                {/* Pricing Plans */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {pricingPlans.map((plan) => (
                    <Card 
                      key={plan.name} 
                      className={`relative ${
                        plan.badge ? 'border-primary shadow-lg' : ''
                      }`}
                    >
                      {plan.badge && (
                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                          {plan.badge}
                        </Badge>
                      )}
                      <CardHeader>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <div className="space-y-1">
                          <div className="text-3xl font-bold">{plan.price}</div>
                          <div className="text-sm text-muted-foreground">{plan.period}</div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="space-y-2">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button 
                          className="w-full" 
                          variant={plan.disabled ? "outline" : "default"}
                          disabled={plan.disabled}
                        >
                          {plan.cta}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Revenue Multipliers */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      Revenue Multipliers
                    </CardTitle>
                    <CardDescription>
                      Additional ways to maximize value
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Zap className="h-4 w-4 text-accent" />
                        Compute Credits
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Top up credits for mutation tests: $5 = 500 cycles
                      </p>
                      <Button size="sm" variant="outline">
                        Buy Credits
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-accent" />
                        Marketplace Commissions
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Sell genomes and patches. TDG takes 10-20% commission.
                      </p>
                      <Button size="sm" variant="outline">
                        Explore Marketplace
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Usage Tab */}
              <TabsContent value="usage" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {usageStats.map((stat) => (
                    <Card key={stat.label}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <stat.icon className="h-4 w-4 text-primary" />
                          {stat.label}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {stat.used} / {stat.total}
                        </div>
                        <Progress 
                          value={stat.total > 0 ? (stat.used / stat.total) * 100 : 0} 
                          className="h-1 mt-2" 
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Usage Forecast</CardTitle>
                    <CardDescription>
                      AI predicts you'll exhaust credits in approximately 30 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Current usage rate</span>
                        <Badge variant="outline">Low</Badge>
                      </div>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download Usage Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Billing Tab */}
              <TabsContent value="billing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      No payment method on file
                    </p>
                    <Button>Add Payment Method</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>
                      Your past invoices and transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No billing history available
                    </p>
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

export default Billing;
