import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { Play, CircleCheck as CheckCircle } from 'lucide-react-native';
import UpcomingSession from '@/components/UpcomingSession';
import ProgressStats from '@/components/ProgressStats';

export default function HomeScreen() {
  const [greeting, setGreeting] = useState('Good morning');
  const [upcomingSessions, setUpcomingSessions] = useState([
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      source: 'YouTube',
      creator: 'Tech Learning',
      duration: '22 min',
      scheduledFor: new Date(Date.now() + 3600000), // 1 hour from now
      imageUrl: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=300',
      completed: false,
    },
    {
      id: '2',
      title: 'Cloud DevOps Fundamentals',
      source: 'Spotify',
      creator: 'Cloud Experts',
      duration: '35 min',
      scheduledFor: new Date(Date.now() + 7200000), // 2 hours from now
      imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=300',
      completed: false,
    }
  ]);

  useEffect(() => {
    // Set appropriate greeting based on time of day
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good morning');
    } else if (currentHour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  const markAsCompleted = (id) => {
    setUpcomingSessions(prevSessions => 
      prevSessions.map(session => 
        session.id === id ? { ...session, completed: true } : session
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.name}>Alex</Text>
          </View>
          <TouchableOpacity>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300' }} 
              style={styles.avatar} 
            />
          </TouchableOpacity>
        </View>

        <ProgressStats 
          currentStreak={5} 
          hoursCompleted={12} 
          topicsExplored={4} 
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {upcomingSessions.length > 0 ? (
          upcomingSessions.map(session => (
            <UpcomingSession
              key={session.id}
              session={session}
              onComplete={() => markAsCompleted(session.id)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No sessions scheduled today</Text>
            <TouchableOpacity style={styles.emptyStateButton}>
              <Text style={styles.emptyStateButtonText}>Add a topic</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Completed</Text>
        </View>

        <TouchableOpacity style={styles.completedSession}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=300' }} 
            style={styles.completedImage} 
          />
          <View style={styles.completedInfo}>
            <Text style={styles.completedTitle}>JavaScript Promises Deep Dive</Text>
            <Text style={styles.completedMeta}>YouTube • 28 min • Yesterday</Text>
          </View>
          <CheckCircle size={22} color="#10B981" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#64748B',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  seeAll: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 32,
    borderRadius: 12,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 16,
  },
  emptyStateButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  completedSession: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  completedImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  completedInfo: {
    flex: 1,
    marginLeft: 12,
  },
  completedTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 4,
  },
  completedMeta: {
    fontSize: 14,
    color: '#64748B',
  },
});