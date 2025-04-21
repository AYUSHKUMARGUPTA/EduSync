import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Play, Clock } from 'lucide-react-native';
import { formatDistanceToNow } from '@/utils/dateUtils';

type SessionProps = {
  session: {
    id: string;
    title: string;
    source: string;
    creator: string;
    duration: string;
    scheduledFor: Date;
    imageUrl: string;
    completed: boolean;
  };
  onComplete: () => void;
};

export default function UpcomingSession({ session, onComplete }: SessionProps) {
  const timeUntil = formatDistanceToNow(session.scheduledFor);
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: session.imageUrl }} style={styles.image} />
      <View style={styles.contentContainer}>
        <View style={styles.timeRow}>
          <Clock size={14} color="#64748B" />
          <Text style={styles.timeText}>{timeUntil}</Text>
        </View>
        <Text style={styles.title}>{session.title}</Text>
        <Text style={styles.meta}>{session.source} • {session.creator} • {session.duration}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.playButton}>
            <Play size={16} color="#FFFFFF" />
            <Text style={styles.playText}>Start Learning</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
            <Text style={styles.completeText}>Mark Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeText: {
    color: '#64748B',
    fontSize: 14,
    marginLeft: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7C3AED',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  playText: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 8,
  },
  completeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  completeText: {
    color: '#64748B',
    fontWeight: '500',
  },
});