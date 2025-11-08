import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PublishToMarketplaceProps {
  mutationId: string;
  mutationType: string;
  description: string;
  onPublished?: () => void;
}

export const PublishToMarketplace = ({ mutationId, mutationType, description, onPublished }: PublishToMarketplaceProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [priceCredits, setPriceCredits] = useState("50");

  const handlePublish = async () => {
    setIsPublishing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('publish-to-marketplace', {
        body: { 
          mutationId,
          priceCredits: parseInt(priceCredits) 
        }
      });

      if (error) throw error;

      toast.success("Successfully published to marketplace!");
      setIsOpen(false);
      onPublished?.();
    } catch (error: any) {
      console.error('Publish error:', error);
      toast.error(error.message || "Failed to publish");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Publish to Marketplace
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Publish to Marketplace
          </DialogTitle>
          <DialogDescription>
            Make your successful mutation available for others to purchase
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Mutation Type</Label>
            <Input value={mutationType} disabled />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Input value={description} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (TDG Credits)</Label>
            <Input
              id="price"
              type="number"
              min="10"
              max="1000"
              value={priceCredits}
              onChange={(e) => setPriceCredits(e.target.value)}
              placeholder="50"
            />
            <p className="text-xs text-muted-foreground">
              Suggested: 10-100 credits. AI will analyze your mutation to suggest optimal pricing.
            </p>
          </div>

          <div className="bg-muted/50 border border-border rounded-lg p-3 space-y-1">
            <p className="text-sm font-medium">AI will generate:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Compelling marketplace title</li>
              <li>• Professional description</li>
              <li>• Performance benchmarks</li>
              <li>• Pricing recommendation</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button 
            className="flex-1" 
            onClick={handlePublish}
            disabled={isPublishing || !priceCredits || parseInt(priceCredits) < 10}
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
