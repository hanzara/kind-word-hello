import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Star, Zap, TrendingUp, DollarSign, TestTube2, ShoppingCart, Coins } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MarketplaceItem {
  id: string;
  mutation_id: string | null;
  title: string;
  description: string;
  mutation_type: string;
  price_credits: number;
  performance_gain: number | null;
  cost_reduction: number | null;
  benchmark_data: any;
  seller_id: string;
  downloads: number;
  rating: number;
  published_at: string;
  status: string;
}

const Marketplace = () => {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MarketplaceItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [userCredits, setUserCredits] = useState(0);
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  useEffect(() => {
    fetchMarketplaceItems();
    fetchUserCredits();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchQuery, typeFilter, items]);

  const fetchMarketplaceItems = async () => {
    try {
      // @ts-ignore - Table will exist after running marketplace_tables.sql
      const { data, error } = await supabase
        .from('marketplace_items')
        .select('*')
        .eq('status', 'published')
        .order('downloads', { ascending: false });

      if (error) throw error;
      setItems((data as unknown as MarketplaceItem[]) || []);
    } catch (error) {
      console.error('Error fetching marketplace items:', error);
      toast.error("Failed to load marketplace items");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserCredits = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // @ts-ignore - Table will exist after running marketplace_tables.sql
      const { data, error } = await (supabase as any)
        .from('user_credits')
        .select('balance')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setUserCredits((data as unknown as { balance: number })?.balance || 0);
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };

  const filterItems = () => {
    let filtered = items;

    if (typeFilter !== "all") {
      filtered = filtered.filter(item => item.mutation_type === typeFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const handleTestInSandbox = async (item: MarketplaceItem) => {
    setSelectedItem(item);
    setIsSandboxOpen(true);
    setIsTesting(true);
    setTestResults(null);

    try {
      const { data, error } = await supabase.functions.invoke('test-mutation', {
        body: { mutationId: item.mutation_id }
      });

      if (error) throw error;
      setTestResults(data.results);
      toast.success("Sandbox test completed!");
    } catch (error: any) {
      console.error('Sandbox test error:', error);
      toast.error(error.message || "Sandbox test failed");
    } finally {
      setIsTesting(false);
    }
  };

  const handlePurchase = async (item: MarketplaceItem) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to purchase");
        return;
      }

      if (userCredits < item.price_credits) {
        toast.error("Insufficient credits. Please add more credits.");
        return;
      }

      const { data, error } = await supabase.functions.invoke('process-purchase', {
        body: { 
          itemId: item.id,
          buyerId: user.id,
          priceCredits: item.price_credits
        }
      });

      if (error) throw error;

      toast.success(`Successfully purchased ${item.title}!`);
      fetchUserCredits();
      
      // Update downloads count
      // @ts-ignore - Table will exist after running marketplace_tables.sql
      await supabase
        .from('marketplace_items')
        .update({ downloads: item.downloads + 1 })
        .eq('id', item.id);
      
      fetchMarketplaceItems();
    } catch (error: any) {
      console.error('Purchase error:', error);
      toast.error(error.message || "Purchase failed");
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'performance': 'bg-green-500/10 text-green-400 border-green-500/30',
      'security': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      'cost': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      'scalability': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      'refactor': 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    };
    return colors[type] || 'bg-muted';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <ShoppingCart className="h-8 w-8 text-primary" />
                Mutation Marketplace
              </h1>
              <p className="text-muted-foreground mt-1">
                Browse and purchase AI-optimized code mutations
              </p>
            </div>
            <Card className="p-3 border-primary/20">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Your Credits</p>
                  <p className="text-lg font-bold">{userCredits}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search mutations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[200px] bg-secondary border-border">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="cost">Cost</SelectItem>
                <SelectItem value="scalability">Scalability</SelectItem>
                <SelectItem value="refactor">Refactor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading marketplace...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="p-6 bg-card border-border hover:border-primary/50 transition-all group">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <Badge className={getTypeColor(item.mutation_type) + " border"}>
                      {item.mutation_type.toUpperCase()}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{item.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  </div>

                  {/* Metrics */}
                   {(item.performance_gain || item.cost_reduction) && (
                    <div className="grid grid-cols-2 gap-2">
                      {item.performance_gain && (
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-muted-foreground">+{item.performance_gain}%</span>
                        </div>
                      )}
                      {item.cost_reduction && (
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-yellow-500" />
                          <span className="text-muted-foreground">-{item.cost_reduction}%</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Downloads */}
                  <p className="text-xs text-muted-foreground">
                    {item.downloads} downloads
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleTestInSandbox(item)}
                    >
                      <TestTube2 className="w-4 h-4 mr-2" />
                      Test
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => handlePurchase(item)}
                    >
                      <Coins className="w-4 h-4 mr-2" />
                      {item.price_credits} Credits
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <ShoppingCart className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No items found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Sandbox Testing Modal */}
      <Dialog open={isSandboxOpen} onOpenChange={setIsSandboxOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TestTube2 className="h-5 w-5 text-primary" />
              Sandbox Test Results
            </DialogTitle>
            <DialogDescription>
              {selectedItem?.title}
            </DialogDescription>
          </DialogHeader>

          {isTesting ? (
            <div className="py-8 text-center space-y-4">
              <div className="animate-pulse">
                <Zap className="h-12 w-12 text-primary mx-auto" />
              </div>
              <p className="text-muted-foreground">Running sandbox tests...</p>
            </div>
          ) : testResults ? (
            <Tabs defaultValue="metrics" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="metrics" className="space-y-4 pt-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">CPU Usage</span>
                      <span className="text-sm font-medium">{testResults.cpu_usage}%</span>
                    </div>
                    <Progress value={testResults.cpu_usage} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Memory Usage</span>
                      <span className="text-sm font-medium">{testResults.memory_usage} MB</span>
                    </div>
                    <Progress value={testResults.memory_usage / 2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Latency</span>
                      <span className="text-sm font-medium">{testResults.latency_ms} ms</span>
                    </div>
                    <Progress value={testResults.latency_ms / 2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Pass Rate</span>
                      <span className="text-sm font-medium">{testResults.pass_rate}%</span>
                    </div>
                    <Progress value={testResults.pass_rate} className="h-2" />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Test Result</span>
                    <Badge variant={testResults.test_passed ? "default" : "destructive"}>
                      {testResults.test_passed ? "PASSED" : "FAILED"}
                    </Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Cost Impact</h4>
                  <p className="text-sm text-muted-foreground">
                    ${testResults.cost_per_request.toFixed(4)} per request
                  </p>
                </div>

                {testResults.issues && testResults.issues.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Issues Found</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {testResults.issues.map((issue: string, idx: number) => (
                        <li key={idx}>• {issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          ) : null}

          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsSandboxOpen(false)}>
              Close
            </Button>
            {testResults && (
              <Button className="flex-1" onClick={() => selectedItem && handlePurchase(selectedItem)}>
                Purchase ({selectedItem?.price_credits} Credits)
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Marketplace;
