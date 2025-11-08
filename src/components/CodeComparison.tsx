import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CodeComparisonProps {
  codeBefore: string;
  codeAfter: string;
  language: string;
  explanation?: string;
  metrics?: {
    timeComplexityBefore?: string;
    timeComplexityAfter?: string;
    spaceComplexityBefore?: string;
    spaceComplexityAfter?: string;
    performanceGain?: string;
  };
}

export function CodeComparison({
  codeBefore,
  codeAfter,
  language,
  explanation,
  metrics
}: CodeComparisonProps) {
  const highlightChanges = (code: string) => {
    // Simple highlighting - in production would use a proper diff library
    return code;
  };

  const getComplexityColor = (complexity: string) => {
    if (complexity.includes('O(1)')) return 'text-green-500';
    if (complexity.includes('O(n)')) return 'text-blue-500';
    if (complexity.includes('O(n²)') || complexity.includes('O(n^2)')) return 'text-orange-500';
    if (complexity.includes('O(2^n)')) return 'text-red-500';
    return 'text-muted-foreground';
  };

  const getImprovementIcon = () => {
    if (!metrics?.performanceGain) return null;
    const gain = parseInt(metrics.performanceGain);
    if (gain > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (gain < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      {/* Explanation Banner */}
      {explanation && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            What Changed
          </h3>
          <p className="text-sm text-muted-foreground">{explanation}</p>
        </Card>
      )}

      {/* Metrics Comparison */}
      {metrics && (
        <div className="grid md:grid-cols-3 gap-4">
          {metrics.timeComplexityBefore && metrics.timeComplexityAfter && (
            <Card className="p-4">
              <h4 className="text-sm font-medium mb-2">Time Complexity</h4>
              <div className="flex items-center gap-2">
                <span className={`font-mono text-sm ${getComplexityColor(metrics.timeComplexityBefore)}`}>
                  {metrics.timeComplexityBefore}
                </span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                <span className={`font-mono text-sm font-bold ${getComplexityColor(metrics.timeComplexityAfter)}`}>
                  {metrics.timeComplexityAfter}
                </span>
              </div>
            </Card>
          )}

          {metrics.spaceComplexityBefore && metrics.spaceComplexityAfter && (
            <Card className="p-4">
              <h4 className="text-sm font-medium mb-2">Space Complexity</h4>
              <div className="flex items-center gap-2">
                <span className={`font-mono text-sm ${getComplexityColor(metrics.spaceComplexityBefore)}`}>
                  {metrics.spaceComplexityBefore}
                </span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                <span className={`font-mono text-sm font-bold ${getComplexityColor(metrics.spaceComplexityAfter)}`}>
                  {metrics.spaceComplexityAfter}
                </span>
              </div>
            </Card>
          )}

          {metrics.performanceGain && (
            <Card className="p-4">
              <h4 className="text-sm font-medium mb-2">Performance Impact</h4>
              <div className="flex items-center gap-2">
                {getImprovementIcon()}
                <span className="text-2xl font-bold">{metrics.performanceGain}</span>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Code Comparison Tabs */}
      <Tabs defaultValue="split" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="split">Split View</TabsTrigger>
          <TabsTrigger value="before">Before</TabsTrigger>
          <TabsTrigger value="after">After</TabsTrigger>
        </TabsList>

        <TabsContent value="split" className="space-y-0">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="overflow-hidden">
              <div className="bg-red-500/10 px-4 py-2 border-b border-red-500/20">
                <Badge variant="outline" className="border-red-500 text-red-500">
                  Before
                </Badge>
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code className={`language-${language}`}>
                  {highlightChanges(codeBefore)}
                </code>
              </pre>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-green-500/10 px-4 py-2 border-b border-green-500/20">
                <Badge variant="outline" className="border-green-500 text-green-500">
                  After
                </Badge>
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code className={`language-${language}`}>
                  {highlightChanges(codeAfter)}
                </code>
              </pre>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="before">
          <Card className="overflow-hidden">
            <div className="bg-muted px-4 py-2 border-b">
              <Badge variant="outline">Original Code</Badge>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className={`language-${language}`}>{codeBefore}</code>
            </pre>
          </Card>
        </TabsContent>

        <TabsContent value="after">
          <Card className="overflow-hidden">
            <div className="bg-primary/10 px-4 py-2 border-b border-primary/20">
              <Badge>Optimized Code</Badge>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className={`language-${language}`}>{codeAfter}</code>
            </pre>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
