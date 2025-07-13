import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

const supabaseUrl = 'https://lldtlysejtyvbbxmdfyb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsZHRseXNlanR5dmJieG1kZnliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzQ3NTYsImV4cCI6MjA2MzUxMDc1Nn0.EagjF9ElGMU0i0fOxVOFKw74HODotKwFlFzJNawhk90';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Episode {
  id: number;
  title: string;
  description: string;
}

type LibraryStackParamList = {
  LibraryMain: undefined;
  FlashcardScreen: { episode: Episode };
};

export default function LibraryScreen() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<StackNavigationProp<LibraryStackParamList>>();

  useEffect(() => {
    supabase
      .from('episodes')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          Alert.alert('Error', error.message);
        } else {
          setEpisodes(data || []);
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text>Found {episodes.length} episodes!</Text>
      {episodes.map((ep) => (
        <TouchableOpacity
          key={ep.id}
          style={{ marginVertical: 10 }}
          onPress={() => navigation.navigate('FlashcardScreen', { episode: ep })}
        >
          <Text style={{ fontWeight: 'bold' }}>{ep.title}</Text>
          <Text>{ep.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
} 