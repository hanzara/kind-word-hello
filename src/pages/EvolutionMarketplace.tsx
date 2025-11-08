import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SoftwareHealingSidebar } from "@/components/SoftwareHealingSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Store, TrendingUp, Star, Shield, DollarSign, 
  Search, Filter, Code2, Zap, Lock, Award,
  Download, CheckCircle2, Trophy, Coins, Wallet
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  optimization_type: string;
  efficiency_gain: string;
  trust_score: number;
  price: number;
  downloads: number;
  rating: number;
  tags: string[];
  verified: boolean;
  created_at: string;
}

export default function EvolutionMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedOptimization, setSelectedOptimization] = useState("all");
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>([]);
  const [userCredits, setUserCredits] = useState(250);

  // Mock marketplace data
  const mockItems: MarketplaceItem[] = [
    {
      id: "1",
      title: "AsyncDB: Query Optimizer v2.0",
      description: "Advanced database query optimization using AI-driven indexing strategies. Reduces query time by up to 38% with intelligent caching.",
      author: "Harun Nzai Randu",
      authorAvatar: "/placeholder.svg",
      optimization_type: "performance",
      efficiency_gain: "+38%",
      trust_score: 98,
      price: 40,
      downloads: 1247,
      rating: 4.9,
      tags: ["Python", "Database", "Performance"],
      verified: true,
      created_at: "2025-11-08"
    },
    {
      id: "2",
      title: "QuantumSort: Ultra-Fast Array Processing",
      description: "Revolutionary sorting algorithm leveraging quantum-inspired optimization. Perfect for large-scale data processing.",
      author: "DevNexus AI",
      authorAvatar: "/placeholder.svg",
      optimization_type: "performance",
      efficiency_gain: "+72%",
      trust_score: 100,
      price: 100,
      downloads: 856,
      rating: 5.0,
      tags: ["JavaScript", "Algorithms", "Performance"],
      verified: true,
      created_at: "2025-11-07"
    },
    {
      id: "3",
      title: "AutoCacheX: Smart Caching Layer",
      description: "Intelligent caching system that learns from usage patterns to optimize cache hits and reduce memory overhead.",
      author: "AishaTech",
      authorAvatar: "/placeholder.svg",
      optimization_type: "cost",
      efficiency_gain: "+19%",
      trust_score: 90,
      price: 0,
      downloads: 2341,
      rating: 4.7,
      tags: ["Node.js", "Caching", "Cost"],
      verified: true,
      created_at: "2025-11-06"
    },
    {
      id: "4",
      title: "SecureGuard Pro: API Security Patch",
      description: "Comprehensive security enhancement for REST APIs with automatic threat detection and prevention.",
      author: "CyberShield Labs",
      authorAvatar: "/placeholder.svg",
      optimization_type: "security",
      efficiency_gain: "+85%",
      trust_score: 95,
      price: 75,
      downloads: 623,
      rating: 4.8,
      tags: ["Security", "API", "TypeScript"],
      verified: true,
      created_at: "2025-11-05"
    }
  ];

  useEffect(() => {
    setMarketplaceItems(mockItems);
  }, []);

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLanguage = selectedLanguage === "all" || 
                           item.tags.some(tag => tag.toLowerCase() === selectedLanguage.toLowerCase());
    
    const matchesOptimization = selectedOptimization === "all" || 
                               item.optimization_type === selectedOptimization;
    
    return matchesSearch && matchesLanguage && matchesOptimization;
  });

  const handlePurchase = (item: MarketplaceItem) => {
    if (item.price === 0) {
      toast.success(`${item.title} added to your collection!`);
    } else if (userCredits >= item.price) {
      setUserCredits(prev => prev - item.price);
      toast.success(`Successfully purchased ${item.title}!`);
    } else {
      toast.error("Insufficient TDG Credits. Please top up your wallet.");
    }
  };

  const topOptimizers = [
    { rank: 1, name: "Harun Nzai Randu", contribution: 2847, trustScore: 98, avatar: "/placeholder.svg" },
    { rank: 2, name: "DevNexus AI", contribution: 2356, trustScore: 100, avatar: "/placeholder.svg" },
    { rank: 3, name: "AishaTech", contribution: 2134, trustScore: 90, avatar: "/placeholder.svg" },
    { rank: 4, name: "CyberShield Labs", contribution: 1876, trustScore: 95, avatar: "/placeholder.svg" }
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
                  <Store className="h-10 w-10 text-primary" />
                  Evolution Marketplace
                </h1>
                <p className="text-muted-foreground">
                  Trade AI-evolved code optimizations globally
                </p>
              </div>
              
              {/* Wallet Display */}
              <Card className="p-4 border-primary/20">
                <div className="flex items-center gap-3">
                  <Wallet className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">TDG Credits</p>
                    <p className="text-2xl font-bold text-primary">{userCredits}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => toast.info("Top up coming soon!")}>
                    Top Up
                  </Button>
                </div>
              </Card>
            </div>

            <Tabs defaultValue="discover" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="discover">🧬 Discover</TabsTrigger>
                <TabsTrigger value="sell">💰 Sell</TabsTrigger>
                <TabsTrigger value="recommended">🧠 Recommended</TabsTrigger>
                <TabsTrigger value="leaderboard">📈 Leaderboard</TabsTrigger>
                <TabsTrigger value="wallet">💼 Wallet</TabsTrigger>
              </TabsList>

              {/* Discover Tab */}
              <TabsContent value="discover" className="space-y-4">
                {/* Search and Filters */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          placeholder="Search mutations, languages, or optimization types..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger className="w-full md:w-[180px]">
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Languages</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="typescript">TypeScript</SelectItem>
                          <SelectItem value="node.js">Node.js</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={selectedOptimization} onValueChange={setSelectedOptimization}>
                        <SelectTrigger className="w-full md:w-[200px]">
                          <SelectValue placeholder="Optimization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="performance">Performance</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="cost">Cost</SelectItem>
                          <SelectItem value="maintainability">Maintainability</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Trending Mutations */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    Trending Mutations
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {filteredItems.map((item) => (
                      <Card key={item.id} className="hover:border-primary/50 transition-all">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="flex items-center gap-2">
                                {item.title}
                                {item.verified && (
                                  <CheckCircle2 className="h-5 w-5 text-primary" />
                                )}
                              </CardTitle>
                              <div className="flex items-center gap-2 mt-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={item.authorAvatar} />
                                  <AvatarFallback>{item.author[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-muted-foreground">{item.author}</span>
                              </div>
                            </div>
                            <Badge variant="secondary" className="text-lg font-bold">
                              {item.efficiency_gain}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-4 text-center py-3 border-t border-border">
                            <div>
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <Shield className="h-4 w-4 text-primary" />
                                <span className="text-sm font-bold">{item.trust_score}%</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Trust Score</p>
                            </div>
                            <div>
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <Download className="h-4 w-4 text-primary" />
                                <span className="text-sm font-bold">{item.downloads}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Downloads</p>
                            </div>
                            <div>
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm font-bold">{item.rating}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Rating</p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2">
                              <Coins className="h-5 w-5 text-primary" />
                              <span className="text-lg font-bold">
                                {item.price === 0 ? "Free" : `${item.price} TDG`}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => toast.info("Sandbox testing coming soon!")}
                              >
                                Test in Sandbox
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handlePurchase(item)}
                              >
                                {item.price === 0 ? "Get Free" : "Purchase"}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Sell Tab */}
              <TabsContent value="sell" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-6 w-6 text-primary" />
                      Publish Your Genome
                    </CardTitle>
                    <CardDescription>
                      Share your AI-evolved optimizations with the global community
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-6 text-center space-y-4">
                      <Code2 className="h-16 w-16 mx-auto text-primary" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Ready to Monetize Your Optimizations?</h3>
                        <p className="text-muted-foreground mb-4">
                          After your software evolves successfully in Evolution Cloud, you'll be able to publish it here.
                        </p>
                        <Button onClick={() => toast.info("Complete evolution cycle first")}>
                          View Evolution Cloud
                        </Button>
                      </div>
                    </div>

                    {/* Publishing Process */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">Publishing Process:</h4>
                      <div className="space-y-2">
                        {[
                          "Complete successful evolution in Evolution Cloud",
                          "TDG auto-generates listing with benchmarks",
                          "Set your price in TDG Credits or Fiat",
                          "AI compliance & trust scan",
                          "Go live globally"
                        ].map((step, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-sm">
                            <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold">
                              {idx + 1}
                            </div>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Recommended Tab */}
              <TabsContent value="recommended" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-6 w-6 text-primary" />
                      AI-Curated Recommendations
                    </CardTitle>
                    <CardDescription>
                      Personalized suggestions based on your evolution history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                        <p className="text-sm">
                          <span className="font-semibold">💡 AI Insight:</span> Your app can gain 29% efficiency if you apply 
                          <span className="font-semibold text-primary"> AsyncDB: Query Optimizer v2.0</span> (40 TDG Credits)
                        </p>
                        <Button size="sm" className="mt-3">View Details</Button>
                      </div>
                      
                      <p className="text-muted-foreground text-center py-8">
                        More personalized recommendations will appear as you use Evolution Cloud
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Leaderboard Tab */}
              <TabsContent value="leaderboard" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-6 w-6 text-primary" />
                      Top Optimizers
                    </CardTitle>
                    <CardDescription>
                      Global leaderboard ranked by performance contribution
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-96">
                      <div className="space-y-3">
                        {topOptimizers.map((optimizer) => (
                          <div
                            key={optimizer.rank}
                            className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all"
                          >
                            <div className="text-2xl font-bold text-primary w-8">
                              #{optimizer.rank}
                            </div>
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={optimizer.avatar} />
                              <AvatarFallback>{optimizer.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-semibold">{optimizer.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {optimizer.contribution.toLocaleString()} contribution points
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                <Shield className="h-4 w-4 text-primary" />
                                <span className="font-semibold">{optimizer.trustScore}%</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Trust Score</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wallet Tab */}
              <TabsContent value="wallet" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Wallet className="h-6 w-6 text-primary" />
                        TDG Credits Balance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center space-y-4">
                        <div className="text-5xl font-bold text-primary">{userCredits}</div>
                        <p className="text-muted-foreground">TDG Credits</p>
                        <Button className="w-full" onClick={() => toast.info("Top up coming soon!")}>
                          Top Up Credits
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Transaction History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-48">
                        <div className="space-y-2 text-sm">
                          <p className="text-muted-foreground text-center py-8">
                            No transactions yet
                          </p>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Token Economy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">Earn Credits:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Publishing verified genomes</li>
                          <li>• Community reviews & validation</li>
                          <li>• Educational content creation</li>
                          <li>• Referral bonuses</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Use Credits:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Purchase marketplace optimizations</li>
                          <li>• Pay for mutation cycles</li>
                          <li>• Exchange for fiat currency</li>
                          <li>• Get Pro/Enterprise discounts</li>
                        </ul>
                      </div>
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
