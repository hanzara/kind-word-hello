-- AI Education Mode Database Tables

-- Lessons table (enhanced with mutation linking)
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  mutation_id uuid REFERENCES mutations(id) ON DELETE SET NULL,
  title text NOT NULL,
  summary text NOT NULL,
  code_snippet text NOT NULL,
  code_before text, -- Original code before mutation
  code_after text, -- Code after mutation
  language text NOT NULL,
  concepts text[] NOT NULL DEFAULT '{}',
  youtube_videos jsonb DEFAULT '[]',
  quiz_data jsonb NOT NULL DEFAULT '[]',
  difficulty_level text NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  duration_minutes integer NOT NULL DEFAULT 10,
  xp_points integer NOT NULL DEFAULT 10,
  learning_objectives text[] DEFAULT '{}',
  key_takeaways text[] DEFAULT '{}',
  next_topics text[] DEFAULT '{}',
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User progress tracking
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  completed boolean DEFAULT false,
  quiz_score integer DEFAULT 0,
  time_spent_minutes integer DEFAULT 0,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Lesson comments/discussions
CREATE TABLE IF NOT EXISTS lesson_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  comment text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Concept tags for adaptive learning
CREATE TABLE IF NOT EXISTS lesson_concepts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  concept_name text NOT NULL,
  difficulty_level text NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(lesson_id, concept_name)
);

-- User learning profile (adaptive learning)
CREATE TABLE IF NOT EXISTS user_learning_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  mastered_concepts text[] DEFAULT '{}',
  weak_concepts text[] DEFAULT '{}',
  preferred_difficulty text DEFAULT 'intermediate',
  total_xp integer DEFAULT 0,
  streak_days integer DEFAULT 0,
  last_activity_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS Policies
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_learning_profile ENABLE ROW LEVEL SECURITY;

-- Lessons policies
CREATE POLICY "Users can view public lessons" ON lessons
  FOR SELECT USING (is_public = true OR user_id = auth.uid());

CREATE POLICY "Users can create their own lessons" ON lessons
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own lessons" ON lessons
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own lessons" ON lessons
  FOR DELETE USING (user_id = auth.uid());

-- User progress policies
CREATE POLICY "Users can view their own progress" ON user_progress
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own progress" ON user_progress
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own progress" ON user_progress
  FOR UPDATE USING (user_id = auth.uid());

-- Lesson comments policies
CREATE POLICY "Everyone can view comments" ON lesson_comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create comments" ON lesson_comments
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own comments" ON lesson_comments
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own comments" ON lesson_comments
  FOR DELETE USING (user_id = auth.uid());

-- Lesson concepts policies
CREATE POLICY "Everyone can view lesson concepts" ON lesson_concepts
  FOR SELECT USING (true);

CREATE POLICY "Users can create concepts for their lessons" ON lesson_concepts
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM lessons 
      WHERE lessons.id = lesson_concepts.lesson_id 
      AND lessons.user_id = auth.uid()
    )
  );

-- User learning profile policies
CREATE POLICY "Users can view their own profile" ON user_learning_profile
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own profile" ON user_learning_profile
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own profile" ON user_learning_profile
  FOR UPDATE USING (user_id = auth.uid());

-- Indexes for performance
CREATE INDEX idx_lessons_user_id ON lessons(user_id);
CREATE INDEX idx_lessons_mutation_id ON lessons(mutation_id);
CREATE INDEX idx_lessons_is_public ON lessons(is_public);
CREATE INDEX idx_lessons_difficulty ON lessons(difficulty_level);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_lesson_id ON user_progress(lesson_id);
CREATE INDEX idx_user_progress_completed ON user_progress(completed);
CREATE INDEX idx_lesson_comments_lesson_id ON lesson_comments(lesson_id);
CREATE INDEX idx_lesson_concepts_lesson_id ON lesson_concepts(lesson_id);
CREATE INDEX idx_lesson_concepts_concept_name ON lesson_concepts(concept_name);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lesson_comments_updated_at BEFORE UPDATE ON lesson_comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_learning_profile_updated_at BEFORE UPDATE ON user_learning_profile
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
