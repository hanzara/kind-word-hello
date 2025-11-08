import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Cpu, 
  Zap, 
  Github, 
  Cloud, 
  Youtube, 
  TrendingUp,
  Code2,
  Sparkles,
  ArrowRight,
  Workflow,
  Globe,
  Users,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";

const SynergyHub = () => {
  const [activeMode, setActiveMode] = useState<"devnexus" | "tdg">("devnexus");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
        <div className="container mx-auto px-4 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/30 hover:bg-primary/20">
              <Sparkles className="w-3 h-3 mr-1" />
              World's First Unified AI-Developer Ecosystem
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              AI–Human Synergy Hub
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The grand unification between TDG and DevNexus. Where innovation, optimization, 
              and education converge in perfect harmony.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Zap className="w-5 h-5" />
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Youtube className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeMode} onValueChange={(v) => setActiveMode(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-auto p-2">
              <TabsTrigger value="devnexus" className="flex items-center gap-2 py-4">
                <Brain className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">DevNexus AI Mode</div>
                  <div className="text-xs text-muted-foreground">Build, Debug & Teach</div>
                </div>
              </TabsTrigger>
              <TabsTrigger value="tdg" className="flex items-center gap-2 py-4">
                <Cpu className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">TDG Mode</div>
                  <div className="text-xs text-muted-foreground">Evolve & Optimize</div>
                </div>
              </TabsTrigger>
            </TabsList>

            {/* DevNexus AI Mode */}
            <TabsContent value="devnexus" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-primary/20 bg-gradient-to-br from-card to-card/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Brain className="w-8 h-8 text-primary" />
                      DevNexus AI Mode
                    </CardTitle>
                    <CardDescription className="text-base">
                      AI-powered code generation, debugging, and teaching platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Link to="/editor" className="block group">
                        <Card className="h-full hover:border-primary/50 transition-all cursor-pointer">
                          <CardContent className="pt-6">
                            <Code2 className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold mb-2">Natural Language Coding</h3>
                            <p className="text-sm text-muted-foreground">
                              Generate, fix, and enhance code using plain English
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                      
                      <Link to="/debugger" className="block group">
                        <Card className="h-full hover:border-primary/50 transition-all cursor-pointer">
                          <CardContent className="pt-6">
                            <Sparkles className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold mb-2">AI Debugger</h3>
                            <p className="text-sm text-muted-foreground">
                              Intelligent error detection and resolution
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                      
                      <Link to="/learning-library" className="block group">
                        <Card className="h-full hover:border-primary/50 transition-all cursor-pointer">
                          <CardContent className="pt-6">
                            <Award className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold mb-2">Educational Modules</h3>
                            <p className="text-sm text-muted-foreground">
                              Turn any mutation into a learning experience
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* TDG Mode */}
            <TabsContent value="tdg" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-accent/20 bg-gradient-to-br from-card to-card/80">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Cpu className="w-8 h-8 text-accent" />
                      TDG Mode - The Darwin Generator
                    </CardTitle>
                    <CardDescription className="text-base">
                      Evolution-driven optimization and auto-improvement platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Link to="/software-healing/evolution" className="block group">
                        <Card className="h-full hover:border-accent/50 transition-all cursor-pointer">
                          <CardContent className="pt-6">
                            <Workflow className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold mb-2">Evolution Engine</h3>
                            <p className="text-sm text-muted-foreground">
                              Genetic algorithms for code optimization
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                      
                      <Link to="/software-healing/cloud" className="block group">
                        <Card className="h-full hover:border-accent/50 transition-all cursor-pointer">
                          <CardContent className="pt-6">
                            <Cloud className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold mb-2">Evolution Cloud</h3>
                            <p className="text-sm text-muted-foreground">
                              Deploy auto-improving applications
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                      
                      <Link to="/software-healing/livebench" className="block group">
                        <Card className="h-full hover:border-accent/50 transition-all cursor-pointer">
                          <CardContent className="pt-6">
                            <TrendingUp className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold mb-2">Real-Time Metrics</h3>
                            <p className="text-sm text-muted-foreground">
                              Monitor AI-driven performance improvements
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Shared Infrastructure */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Unified Infrastructure
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-primary/30 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">One Account</h3>
                <p className="text-sm text-muted-foreground">
                  Unified identity across both platforms
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/30 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 text-center">
                <Zap className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Shared Credits</h3>
                <p className="text-sm text-muted-foreground">
                  One credit wallet for all operations
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/30 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 text-center">
                <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Shared Intelligence</h3>
                <p className="text-sm text-muted-foreground">
                  Multi-modal reasoning across platforms
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/30 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 text-center">
                <Globe className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Global Knowledge</h3>
                <p className="text-sm text-muted-foreground">
                  Every interaction improves the network
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Cross-Evolution Feature */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Cross-Evolution Loop</h2>
                <p className="text-muted-foreground text-lg">
                  The first-ever closed-loop AI ecosystem
                </p>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-6">
                <Badge variant="outline" className="text-base py-2 px-4">Learn</Badge>
                <ArrowRight className="w-6 h-6 text-muted-foreground" />
                <Badge variant="outline" className="text-base py-2 px-4">Build</Badge>
                <ArrowRight className="w-6 h-6 text-muted-foreground" />
                <Badge variant="outline" className="text-base py-2 px-4">Evolve</Badge>
                <ArrowRight className="w-6 h-6 text-muted-foreground" />
                <Badge variant="outline" className="text-base py-2 px-4">Teach</Badge>
                <ArrowRight className="w-6 h-6 text-muted-foreground" />
                <Badge variant="outline" className="text-base py-2 px-4 bg-primary/10 border-primary">Repeat</Badge>
              </div>
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  Code written in DevNexus evolves in TDG. Optimizations from TDG become learning 
                  modules in DevNexus. A continuously self-improving network of human–AI creativity.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Integrations */}
      <div className="container mx-auto px-4 py-12 mb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            World-Class Integrations
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Github className="w-10 h-10 text-foreground mb-2" />
                <CardTitle>Version Control</CardTitle>
                <CardDescription>
                  GitHub, GitLab, Bitbucket integration for auto PR creation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Cloud className="w-10 h-10 text-accent mb-2" />
                <CardTitle>Cloud Deployment</CardTitle>
                <CardDescription>
                  AWS, Netlify, Vercel for seamless deployment and scaling
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Youtube className="w-10 h-10 text-destructive mb-2" />
                <CardTitle>Education & Marketplace</CardTitle>
                <CardDescription>
                  YouTube API integration and TDG Marketplace for code trading
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Link to="/software-healing/marketplace">
              <Button size="lg" className="gap-2">
                <TrendingUp className="w-5 h-5" />
                Explore TDG Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SynergyHub;
