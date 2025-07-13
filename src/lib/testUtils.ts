import { supabase } from './supabase.ts';

export const testUtils = {
  // Test Supabase connection
  async testConnection() {
    try {
      console.log('🔍 Testing Supabase connection...');
      const { data, error } = await supabase.from('episodes').select('count').limit(1);
      
      if (error) {
        console.error('❌ Supabase connection failed:', error);
        return false;
      }
      
      console.log('✅ Supabase connection successful');
      return true;
    } catch (err) {
      console.error('❌ Supabase connection error:', err);
      return false;
    }
  },

  // Test episodes table
  async testEpisodesTable() {
    try {
      console.log('🔍 Testing episodes table...');
      const { data, error } = await supabase.from('episodes').select('*');
      
      if (error) {
        console.error('❌ Episodes table error:', error);
        return false;
      }
      
      console.log('✅ Episodes table accessible, found', data?.length || 0, 'episodes');
      return true;
    } catch (err) {
      console.error('❌ Episodes table error:', err);
      return false;
    }
  },

  // Test flashcards table
  async testFlashcardsTable() {
    try {
      console.log('🔍 Testing flashcards table...');
      const { data, error } = await supabase.from('flashcards').select('*');
      
      if (error) {
        console.error('❌ Flashcards table error:', error);
        return false;
      }
      
      console.log('✅ Flashcards table accessible, found', data?.length || 0, 'flashcards');
      return true;
    } catch (err) {
      console.error('❌ Flashcards table error:', err);
      return false;
    }
  },

  // Run all tests
  async runAllTests() {
    console.log('🧪 Running all Supabase tests...');
    
    const connectionTest = await this.testConnection();
    const episodesTest = await this.testEpisodesTable();
    const flashcardsTest = await this.testFlashcardsTable();
    
    console.log('📊 Test Results:');
    console.log('  Connection:', connectionTest ? '✅' : '❌');
    console.log('  Episodes Table:', episodesTest ? '✅' : '❌');
    console.log('  Flashcards Table:', flashcardsTest ? '✅' : '❌');
    
    return connectionTest && episodesTest && flashcardsTest;
  }
}; 