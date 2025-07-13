# Stoke PRD & UX Vision

## Executive Summary

**Product Name:** Stoke
**Version:** MVP 1.0
**Target Launch:** Q2 2025

Stoke is a mobile application that uses spaced repetition to help users retain knowledge from podcasts, YouTube videos, and written content. The MVP focuses on pre-populated, curated content with professionally generated summaries and flashcards to combat information overload and improve long-term retention.

---

## Product Roadmap & Future Phases

### MVP (Current): Manual Curation
- 20-25 manually curated episodes with professional summaries
- Individual episode management (no show hierarchy)
- Basic spaced repetition with user-created study sessions
- 4-tab navigation with core learning features

### Phase 2: Content Organization
- Add shows table to group episodes by podcast series
- Organize existing episodes under show hierarchy
- Enhanced browsing with show-based filtering
- Improved content discovery and navigation

### Phase 3: User Autonomy + AI Integration
- Show subscriptions with RSS auto-import
- AI-powered flashcard generation for new episodes
- Quality control shifts from manual to AI + user feedback
- Expanded content library with user choice

### Phase 4: Universal Content Ingestion
- Share-to-Stoke from external apps (Spotify, web browsers)
- AI processing of any audio/text content
- Cross-platform content integration
- Advanced personalization and recommendations

---

## Product Requirements Document (PRD)

### 1. Product Overview

**Mission Statement:** Keep your brain fresh against a sea of brainrot through intelligent, spaced repetition learning from quality content.

**Problem Statement:** 
- Users consume vast amounts of content but retain minimal information
- Information overload leads to passive consumption without active learning
- No systematic way to reinforce key insights from consumed content
- Traditional note-taking is time-consuming and lacks scientific retention methods

**Solution:**
Stoke transforms passive content consumption into active learning through:
- Curated, high-quality content summaries
- Scientifically-backed spaced repetition flashcards
- Minimal time investment for maximum retention
- Gamified learning experience

### 2. Target Audience

**Primary Users:**
- Age: 25-45
- Interests: Self-development, productivity, learning
- Behavior: Regular podcast/YouTube consumers
- Pain Points: Information overload, poor retention, lack of learning structure
- Goals: Personal growth, skill development, knowledge retention

**User Personas:**

**Sarah, 32, Marketing Manager**
- Listens to 5+ hours of podcasts weekly during commutes
- Struggles to remember key insights from business podcasts
- Values efficiency and structured learning
- Willing to pay for premium learning tools

**Michael, 28, Software Engineer**
- Consumes tech content on YouTube and podcasts
- Wants to retain technical knowledge and industry insights
- Prefers bite-sized, systematic learning approaches
- Active in self-improvement communities

### 3. MVP Feature Requirements

#### 3.1 Core Features

**Content Library**
- 20-25 pre-selected podcast episodes from popular self-development shows
- Professional summaries (300-500 words per episode)
- 8-10 flashcards per hour of content
- Content categories: Productivity, Psychology, Business, Health, Technology
- Episode metadata: duration, difficulty level, key topics

**Spaced Repetition System**
- Algorithm-driven review scheduling
- Three difficulty levels per flashcard: Easy, Medium, Hard
- Performance tracking and interval adjustment
- Daily review recommendations (5-15 minutes)
- Streak tracking and progress metrics

**User Experience**
- Clean, distraction-free interface
- Swipe-based flashcard interactions
- Progress visualization (completion rates, streak counters)
- Content discovery through browsing and search
- Onboarding flow with learning style assessment

#### 3.2 Technical Requirements

**Platform:** iOS and Android (React Native CLI)
**Backend:** Supabase (PostgreSQL, real-time subscriptions, auth)
**Web Dashboard:** Simple Next.js admin panel on Vercel (content management only)
**Authentication:** Email/password only for beta (social login for public launch)
**Payment:** Not required for MVP - simple user allowlist in database
**Analytics:** Basic Supabase Analytics + simple custom event tracking
**Offline Support:** React Native MMKV for local storage, basic offline flashcard access
**File Storage:** Supabase Storage for audio files and images
**Push Notifications:** Simple local notifications for review reminders

#### 3.3 Subscription Model

**Free Tier (Friends & Family Beta):**
- Access to full content library (20-25 episodes)
- All flashcards and spaced repetition features
- Basic progress tracking
- Email support

**Future Premium Tier ($4.99/month):**
- Everything in beta, plus:
- User-generated content (upload transcripts/links)
- AI-powered flashcard generation
- Advanced analytics and insights
- Priority support
- Early access to new features

### 4. Success Metrics (Beta Phase)

**Primary KPIs:**
- User completion rate (target: 80% complete onboarding)
- Daily engagement (target: 15+ users active per week)
- Session duration (target: 5-10 minutes avg)
- Feedback quality and feature requests
- Technical stability (crash-free sessions >95%)

**Feedback Collection:**
- In-app feedback form
- Weekly check-ins with power users
- Usage analytics via Supabase
- Bug reporting through TestFlight/Play Console
- Direct messages/calls with friends and family

**Learning Metrics:**
- Cards completed per user per week
- Retention of reviewed material (self-reported)
- Preferred content categories
- Optimal session length discovery

### 5. Technical Architecture

**Frontend:**
- React Native CLI for cross-platform mobile development
- Next.js web dashboard for content management (deployed on Vercel)
- State management with Zustand + React Query for server state
- React Navigation v6 for navigation
- React Native Gesture Handler for smooth card interactions
- React Native Reanimated for performant animations

**Backend (Supabase):**
- PostgreSQL database with Row Level Security (RLS)
- Real-time subscriptions for live progress updates
- Supabase Auth for user management
- Edge Functions for Stripe webhook handling and push notifications
- Supabase Storage for content assets

**Mobile-Specific Libraries:**
- **Storage:** React Native MMKV (fast key-value storage)
- **Database:** React Native SQLite (offline data persistence)
- **Notifications:** @react-native-async-storage/async-storage + native push
- **Audio:** React Native Sound (for podcast playback)
- **Gestures:** React Native Gesture Handler (flashcard swiping)
- **Animations:** React Native Reanimated (smooth transitions)

**Database Schema (Supabase):**
```sql
-- Users table (managed by Supabase Auth)
-- Additional profile data in user_profiles table

-- Content structure
episodes (id, title, description, duration, category, difficulty, audio_url, created_at)
summaries (id, episode_id, content, word_count, created_at)
flashcards (id, episode_id, question, answer, difficulty, order_index, created_at)

-- User progress
user_progress (id, user_id, episode_id, cards_completed, last_reviewed, created_at)
card_reviews (id, user_id, card_id, difficulty_rating, next_review_date, interval_days, created_at)
user_stats (id, user_id, streak_count, total_cards_reviewed, avg_session_duration, created_at)

-- Subscriptions
subscriptions (id, user_id, stripe_customer_id, status, current_period_end, created_at)
```

**Deployment:**
- Mobile apps: Manual builds via Xcode/Android Studio initially, CI/CD via GitHub Actions
- Web dashboard: Vercel with automatic deployments from Git
- Database: Supabase hosted PostgreSQL
- Edge Functions: Supabase Edge Runtime

---

## UX Vision

### 1. Design Philosophy

**Core Principles:**
- **Simplicity:** Remove cognitive load from the learning process
- **Focus:** Eliminate distractions to maximize retention
- **Progress:** Clear visual feedback on learning advancement
- **Accessibility:** Inclusive design for diverse learning styles
- **Delight:** Subtle animations and micro-interactions

### 2. User Journey

#### 2.1 Onboarding Flow (Simplified)
1. **Welcome Screen:** Brief value proposition (30 seconds max)
2. **Account Creation:** Email/password signup with beta access code
3. **Quick Tutorial:** 3-card demo of flashcard interaction
4. **First Session:** Start with 5-8 flashcards from popular episode
5. **Feedback Prompt:** "How was that?" with simple rating

#### 2.2 Daily Usage Flow (Bottom Navigation)
1. **Home Screen:** Continue Learning card, recent episodes carousel, streak counter
2. **Review Tab:** Quick shuffle or curated study session creation
3. **Library Tab:** Browse all episodes with filtering and search
4. **Profile Tab:** Account settings and preferences
5. **Study Session Flow:** Flashcard presentation with save/exit options

### 3. Key Screens & Interactions

#### 3.1 Home Screen
**Layout:**
- Top: User streak and daily goal progress
- Carousel: Recently added episodes for discovery
- Center: "Continue Learning" card with previous review sessions
- Future: Curated category-based study sessions

**Interactions:**
- Tap to continue previous study session
- Swipe through recently added episodes
- Pull-to-refresh for new content

#### 3.2 Review Screen
**Layout:**
- Quick Actions: "Shuffle All Cards" for immediate review
- Curation: "Create Study Session" for custom content selection
- Study session interface with progress indicator
- Save/Exit options during sessions

**Interactions:**
- Tap "Shuffle All" for quick-start review
- Select episodes for custom study session
- Swipe/tap for flashcard difficulty rating
- Save progress or exit without saving

#### 3.3 Library Screen
**Layout:**
- List view of all episodes (sorted by recently added)
- Filter options by content type and category
- Search functionality with fuzzy matching
- Episode cards with cover art and metadata

**Interactions:**
- Tap episode to view details or start review
- Use filters to narrow content selection
- Search for specific topics or episodes
- Long-press for additional episode actions

#### 3.4 Profile Screen
**Layout:**
- Account information and settings
- User preferences and notifications
- Study statistics and achievements
- App settings and support

**Interactions:**
- Edit profile information
- Adjust notification preferences
- View detailed progress analytics
- Access help and support resources

### 4. Visual Design System

#### 4.1 Color Palette
- **Primary:** Deep blue (#1A365D) - trust, focus, learning
- **Secondary:** Warm orange (#FF8C00) - energy, motivation
- **Success:** Green (#38A169) - progress, achievement
- **Background:** Off-white (#FAFAFA) - clean, readable
- **Text:** Dark gray (#2D3748) - high contrast, accessible

#### 4.2 Typography
- **Headers:** Bold, sans-serif (Poppins or similar)
- **Body:** Regular, highly readable (Inter or system font)
- **Emphasis:** Medium weight for important information
- **Sizing:** 16px minimum for body text (accessibility)

#### 4.3 Components
- **Bottom Navigation:** 4-tab structure (Home, Review, Library, Profile)
- **Episode Cards:** Cover art, title, description, progress indicators
- **Study Session Cards:** Custom artwork, content summary, progress
- **Flashcards:** Swipe-based interaction with difficulty rating
- **Progress Indicators:** Visual and numerical feedback
- **Carousels:** Horizontal scrolling for content discovery

### 5. Accessibility & Inclusive Design

**Requirements:**
- WCAG 2.1 AA compliance
- Voice-over support for screen readers
- High contrast mode compatibility
- Adjustable text sizing
- Keyboard navigation support
- Color-blind friendly palette

### 6. Performance & Technical UX

**Loading States:**
- Skeleton screens during content loading
- Smooth transitions between screens
- Offline mode with clear indicators

**Error Handling:**
- Graceful degradation for network issues
- Clear error messages with actionable solutions
- Retry mechanisms for failed operations

**Data Efficiency:**
- Progressive content loading
- Cached content for offline use
- Optimized images and assets

---

## Implementation Priority

### Phase 1: Beta MVP (Weeks 1-8)
- Supabase database setup with simple user allowlist
- React Native CLI project with basic navigation
- Email/password auth with beta access codes
- Content library with 20-25 episodes (manually seeded)
- Basic spaced repetition with MMKV storage
- Simple review interface with gesture handling
- Basic progress tracking

### Phase 2: Beta Refinement (Weeks 9-10)
- Simple admin panel for content management
- Local push notifications for review reminders
- In-app feedback collection
- Basic analytics and usage tracking
- TestFlight/Play Console distribution to beta users

### Phase 3: Public Launch Preparation (Weeks 11-14)
- Stripe integration for subscriptions
- Social authentication (Google, Apple)
- Enhanced analytics and user management
- App store submission and marketing materials
- Scale infrastructure for public launch

---

## Success Criteria

**MVP Success Defined By:**
- App successfully deployed to both iOS and Android stores
- Core learning loop functional and engaging
- Subscription system operational
- Initial user cohort showing positive retention metrics
- Foundation established for future AI-powered content generation

**Long-term Vision:**
Stoke becomes the go-to platform for transforming passive content consumption into active learning, expanding to user-generated content and AI-powered personalization while maintaining its core value of effortless knowledge retention.