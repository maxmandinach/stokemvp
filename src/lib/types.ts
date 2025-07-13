export interface Episode {
  id: number;
  title: string;
  description: string;
  duration_minutes: number;
  category: string;
  difficulty: string;
}

export interface Flashcard {
  id: number;
  episode_id: number;
  question: string;
  answer: string;
  difficulty: string;
  order_index: number;
}

export interface EpisodeWithFlashcards extends Episode {
  flashcards: Flashcard[];
} 