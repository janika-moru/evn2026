ALTER TABLE public.feedback DROP CONSTRAINT IF EXISTS feedback_feedback_type_check;
ALTER TABLE public.feedback ADD CONSTRAINT feedback_feedback_type_check CHECK (feedback_type IN ('keep','change','help','training'));
ALTER TABLE public.feedback ADD CONSTRAINT feedback_rating_range CHECK (rating IS NULL OR rating BETWEEN 1 AND 10);
ALTER TABLE public.feedback
  ADD COLUMN keep_text text CHECK (char_length(keep_text) <= 4000),
  ADD COLUMN change_text text CHECK (char_length(change_text) <= 4000),
  ADD COLUMN respondent_name text CHECK (char_length(respondent_name) <= 200),
  ADD COLUMN respondent_field text CHECK (char_length(respondent_field) <= 200);