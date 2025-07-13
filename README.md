# StokeApp - Flashcard Learning App

A React Native app for learning with flashcards, powered by Supabase.

## Features

- ✅ Supabase integration with React Native
- ✅ Fetch and display episodes from database
- ✅ TypeScript support with proper type definitions
- ✅ Error handling and loading states
- ✅ Modern UI with clean design

## Database Schema

The app uses two main tables:

### Episodes Table
- `id` (primary key)
- `title` (string)
- `description` (text)
- `duration_minutes` (integer)
- `category` (string)
- `difficulty` (string)

### Flashcards Table
- `id` (primary key)
- `episode_id` (foreign key to episodes)
- `question` (text)
- `answer` (text)
- `difficulty` (string)
- `order_index` (integer)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the app:**
   ```bash
   # iOS
   npx react-native run-ios
   
   # Android
   npx react-native run-android
   ```

## Supabase Configuration

The app is configured to work with React Native and Hermes engine. The Supabase client includes:

- Proper headers for React Native
- Auto-refresh token enabled
- Session persistence enabled
- URL detection disabled (for React Native)

## Project Structure

```
src/
├── lib/
│   ├── supabase.ts          # Supabase client configuration
│   ├── episodeService.ts    # Service for fetching episodes and flashcards
│   └── types.ts            # TypeScript type definitions
```

## Current Status

The app successfully:
- Connects to Supabase without protocol errors
- Fetches episodes from the database
- Displays episode information with loading states
- Handles errors gracefully

## Test Data

The app expects at least one episode in the database with the following structure:
- Title: "Test Episode: Building Better Habits"
- Associated flashcards for the episode

## Next Steps

To extend the app, you can:
1. Add flashcard display functionality
2. Implement user authentication
3. Add episode creation/editing
4. Implement flashcard study sessions
