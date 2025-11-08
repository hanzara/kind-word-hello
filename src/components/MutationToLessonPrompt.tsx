import { useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { GraduationCap, Sparkles, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface MutationToLessonPromptProps {
  mutationId: string;
  mutationType: string;
  codeOriginal: string;
  codeMutated: string;
  language: string;
  explanation: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MutationToLessonPrompt({
  mutationId,
  mutationType,
  codeOriginal,
  codeMutated,
  language,
  explanation,
  open,
  onOpenChange,
}: MutationToLessonPromptProps) {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleConvertToLesson = async () => {
    setIsGenerating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to create lessons');
        return;
      }

      // Call the generate-lesson edge function
      const { data: lessonData, error: lessonError } = await supabase.functions.invoke('generate-lesson', {
        body: {
          code: codeMutated,
          language: language,
          explanation: explanation
        }
      });

      if (lessonError) throw lessonError;

      // Create the lesson in the database
      const { data: lesson, error: insertError } = await supabase
        .from('lessons')
        .insert({
          user_id: user.id,
          mutation_id: mutationId,
          title: lessonData.lesson.title,
          summary: lessonData.lesson.summary,
          code_snippet: codeMutated,
          code_before: codeOriginal,
          code_after: codeMutated,
          language: language,
          concepts: lessonData.lesson.concepts,
          youtube_videos: await fetchYouTubeVideos(lessonData.lesson.youtube_search_queries || []),
          quiz_data: lessonData.lesson.quiz,
          difficulty_level: lessonData.lesson.difficulty_level,
          duration_minutes: lessonData.lesson.duration_minutes,
          xp_points: lessonData.lesson.xp_points,
          learning_objectives: lessonData.lesson.learning_objectives,
          key_takeaways: lessonData.lesson.key_takeaways,
          next_topics: lessonData.lesson.next_topics,
          is_public: false
        })
        .select()
        .single();

      if (insertError) throw insertError;

      toast.success('🎓 Lesson created successfully!');
      onOpenChange(false);
      
      // Navigate to the lesson
      navigate(`/lesson/${lesson.id}`);
    } catch (error: any) {
      console.error('Error creating lesson:', error);
      toast.error(error.message || 'Failed to create lesson');
    } finally {
      setIsGenerating(false);
    }
  };

  const fetchYouTubeVideos = async (queries: string[]) => {
    // Simulated YouTube integration - would use YouTube Data API in production
    // For now, generate search URLs
    return queries.slice(0, 3).map(query => ({
      title: query,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
    }));
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <AlertDialogTitle className="text-2xl">Your Code Evolved Successfully!</AlertDialogTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <AlertDialogDescription className="text-base">
            Would you like to turn this optimization into an interactive learning lesson? You'll discover:
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 my-4">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex items-start gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">What changed and why</p>
                <p className="text-sm text-muted-foreground">AI-powered explanation of the optimization</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Sparkles className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Before & After comparison</p>
                <p className="text-sm text-muted-foreground">Side-by-side code visualization</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Sparkles className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Interactive quiz</p>
                <p className="text-sm text-muted-foreground">Test your understanding and earn XP</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Sparkles className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Video tutorials</p>
                <p className="text-sm text-muted-foreground">Related learning resources from YouTube</p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
            <p className="text-sm">
              <span className="font-medium">Optimization Type:</span> {mutationType}
            </p>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {explanation}
            </p>
          </div>
        </div>

        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isGenerating}
          >
            Skip for Now
          </Button>
          <Button
            onClick={handleConvertToLesson}
            disabled={isGenerating}
            className="gap-2"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Generating Lesson...
              </>
            ) : (
              <>
                <GraduationCap className="h-4 w-4" />
                Convert to Lesson
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
