import { supabase } from './supabase.ts';
import type { Episode, Flashcard, EpisodeWithFlashcards } from './types';

export const episodeService = {
  // Fetch all episodes
  async getEpisodes(): Promise<Episode[]> {
    try {
      const { data, error } = await supabase
        .from('episodes')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching episodes:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch episodes:', error);
      throw error;
    }
  },

  // Fetch flashcards for a specific episode
  async getFlashcards(episodeId: number): Promise<Flashcard[]> {
    try {
      const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .eq('episode_id', episodeId)
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error fetching flashcards:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch flashcards:', error);
      throw error;
    }
  },

  // Fetch episodes with their flashcards
  async getEpisodesWithFlashcards(): Promise<EpisodeWithFlashcards[]> {
    try {
      const { data, error } = await supabase
        .from('episodes')
        .select(`
          *,
          flashcards (*)
        `)
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching episodes with flashcards:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch episodes with flashcards:', error);
      throw error;
    }
  }
}; 