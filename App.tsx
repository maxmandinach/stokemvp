import 'react-native-url-polyfill/auto';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lldtlysejtyvbbxmdfyb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsZHRseXNlanR5dmJieG1kZnliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzQ3NTYsImV4cCI6MjA2MzUxMDc1Nn0.EagjF9ElGMU0i0fOxVOFKw74HODotKwFlFzJNawhk90'; // <-- Replace with your actual anon key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('episodes')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          alert(error.message);
        } else {
          setEpisodes(data);
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text>Found {episodes.length} episodes!</Text>
      {episodes.map((ep) => (
        <View key={ep.id} style={{ marginVertical: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>{ep.title}</Text>
          <Text>{ep.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}