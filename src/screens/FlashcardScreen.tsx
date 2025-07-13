import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { episodeService } from '../lib/episodeService';
import type { Episode, Flashcard } from '../lib/types';
import type { ViewStyle } from 'react-native';

// Define route params type
interface FlashcardScreenRouteParams {
  episode: Episode;
}

export default function FlashcardScreen() {
  const route = useRoute<RouteProp<{ params: FlashcardScreenRouteParams }, 'params'>>();
  const episode = route.params?.episode;
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const navigation = useNavigation();

  // Completion screen messages
  const openingMessages = [
    'Great session! 🧠✨',
    'Nice work! 🔥',
    'Way to go! 💪',
    'Solid effort! ⚡',
  ];
  const brainFreshMessages = [
    "You're keeping your brain fresh and sharp",
    'Your mind is getting stronger',
    'Building those mental muscles',
  ];
  const progressMessages = [
    'Nice work building stronger connections',
    'Those neural pathways are strengthening',
    'Great progress on your learning journey',
  ];
  function getRandom(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  useEffect(() => {
    if (!episode) return;
    episodeService.getFlashcards(episode.id)
      .then(setFlashcards)
      .catch((err) => Alert.alert('Error', err.message || 'Failed to load flashcards'))
      .finally(() => setLoading(false));
  }, [episode]);

  // Reset to question side when moving to a new card
  useEffect(() => {
    setShowAnswer(false);
  }, [currentIndex]);

  // Handler for emoji rating and auto-advance
  const handleRate = (rating: number) => {
    console.log('Rated card', currentIndex + 1, 'with', rating);
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowCompletion(true);
    }
  };

  const [showCompletion, setShowCompletion] = useState(false);

  // Reset state for review again
  const handleReviewAgain = () => {
    setCurrentIndex(0);
    setShowCompletion(false);
    setShowAnswer(false);
  };
  // Go back to Library
  const handleBackToLibrary = () => {
    navigation.goBack();
  };

  // Helper for emoji button styles
  const emojiButtonStyle = (color: string): ViewStyle => ({
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 40,
    backgroundColor: color,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center' as ViewStyle['alignItems'],
    justifyContent: 'center' as ViewStyle['justifyContent'],
  });

  if (!episode) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No episode data.</Text></View>;
  }

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  if (flashcards.length === 0) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No flashcards found.</Text></View>;
  }

  if (showCompletion) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 28, backgroundColor: '#fff' }}>
        {/* Hero: Celebration message */}
        <Text style={{ fontWeight: 'bold', fontSize: 34, marginBottom: 24, textAlign: 'center', color: '#1A365D' }}>{getRandom(openingMessages)}</Text>
        {/* Progress message */}
        <Text style={{ fontSize: 18, color: '#1A365D', marginBottom: 12, textAlign: 'center', fontWeight: '600' }}>{getRandom(brainFreshMessages)}</Text>
        {/* Card count */}
        <Text style={{ fontSize: 15, color: '#888', marginBottom: 36, textAlign: 'center' }}>{flashcards.length} cards reviewed</Text>
        {/* Buttons */}
        <View style={{ width: '100%', alignItems: 'center', marginBottom: 0 }}>
          <TouchableOpacity
            onPress={handleReviewAgain}
            style={{ backgroundColor: '#1A365D', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 10, minWidth: 220, alignItems: 'center', marginBottom: 16 }}
          >
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Review Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleBackToLibrary}
            style={{ backgroundColor: '#F6F6F6', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 10, minWidth: 220, alignItems: 'center', borderWidth: 1, borderColor: '#ccc' }}
          >
            <Text style={{ color: '#1A365D', fontSize: 18, fontWeight: 'bold' }}>Back to Library</Text>
          </TouchableOpacity>
        </View>
        {/* Episode title at bottom */}
        <View style={{ position: 'absolute', bottom: 32, left: 0, right: 0, alignItems: 'center' }}>
          <Text style={{ fontSize: 13, color: '#bbb', textAlign: 'center', fontWeight: '500' }}>{episode.title}</Text>
        </View>
      </View>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>{episode.title}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => !showAnswer && setShowAnswer(true)}
        style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 32,
          minWidth: 280,
          minHeight: 180,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
          marginBottom: 32,
        }}
      >
        <Text style={{ fontSize: 22, textAlign: 'center' }}>
          {showAnswer ? currentCard.answer : currentCard.question}
        </Text>
        {!showAnswer && (
          <Text style={{ color: '#888', marginTop: 16, fontSize: 14 }}>(Tap to flip)</Text>
        )}
      </TouchableOpacity>
      {showAnswer && (
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, marginBottom: 8 }}>
          <TouchableOpacity
            onPress={() => handleRate(3)}
            activeOpacity={0.7}
            style={emojiButtonStyle('#FFE066')} // yellow for easy
          >
            <Text style={{ fontSize: 36 }}>⚡</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleRate(2)}
            activeOpacity={0.7}
            style={emojiButtonStyle('#B3D8F7')} // blue for thinking
          >
            <Text style={{ fontSize: 36 }}>💭</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleRate(1)}
            activeOpacity={0.7}
            style={emojiButtonStyle('#FFB3B3')} // red for confused
          >
            <Text style={{ fontSize: 36 }}>❓</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={{ marginTop: 16, color: '#888' }}>{currentIndex + 1} / {flashcards.length}</Text>
    </View>
  );
} 