import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, Clock, BookOpen } from 'lucide-react-native';

type ProgressStatsProps = {
  currentStreak: number;
  hoursCompleted: number;
  topicsExplored: number;
};

export default function ProgressStats({ 
  currentStreak, 
  hoursCompleted, 
  topicsExplored 
}: ProgressStatsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <View style={[styles.iconContainer, { backgroundColor: '#EDE9FE' }]}>
          <TrendingUp size={18} color="#7C3AED" />
        </View>
        <View>
          <Text style={styles.statValue}>{currentStreak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.stat}>
        <View style={[styles.iconContainer, { backgroundColor: '#E0F2FE' }]}>
          <Clock size={18} color="#3B82F6" />
        </View>
        <View>
          <Text style={styles.statValue}>{hoursCompleted}</Text>
          <Text style={styles.statLabel}>Hours</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.stat}>
        <View style={[styles.iconContainer, { backgroundColor: '#DCFCE7' }]}>
          <BookOpen size={18} color="#10B981" />
        </View>
        <View>
          <Text style={styles.statValue}>{topicsExplored}</Text>
          <Text style={styles.statLabel}>Topics</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E2E8F0',
  },
});