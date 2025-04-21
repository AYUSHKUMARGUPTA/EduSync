import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, Clock, CircleAlert as AlertCircle, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function ScheduleScreen() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [isConnected, setIsConnected] = useState(false);
  
  const scheduleData = {
    'Monday': [
      { id: '1', time: '7:00 AM', title: 'Introduction to Machine Learning', duration: '30 min', source: 'YouTube' },
      { id: '2', time: '5:30 PM', title: 'Cloud DevOps Fundamentals', duration: '45 min', source: 'Spotify' },
    ],
    'Wednesday': [
      { id: '3', time: '6:30 AM', title: 'React Performance Optimization', duration: '25 min', source: 'YouTube' },
    ],
    'Friday': [
      { id: '4', time: '6:00 PM', title: 'Data Science Career Paths', duration: '35 min', source: 'Spotify' },
    ]
  };

  const connectToCalendar = () => {
    // Implement Google Calendar connection
    setIsConnected(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Your Schedule</Text>
      
      {!isConnected && (
        <View style={styles.connectCalendarCard}>
          <View style={styles.calendarIconContainer}>
            <CalendarIcon size={24} color="#7C3AED" />
          </View>
          <View style={styles.connectCalendarContent}>
            <Text style={styles.connectCalendarTitle}>Connect Google Calendar</Text>
            <Text style={styles.connectCalendarDescription}>
              Sync your learning schedule with Google Calendar to receive reminders
            </Text>
            <TouchableOpacity 
              style={styles.connectButton}
              onPress={connectToCalendar}
            >
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daySelector}
      >
        {days.map(day => (
          <TouchableOpacity 
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day && styles.selectedDayButton
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text 
              style={[
                styles.dayButtonText,
                selectedDay === day && styles.selectedDayButtonText
              ]}
            >
              {day.substring(0, 3)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {scheduleData[selectedDay] ? (
          scheduleData[selectedDay].map(item => (
            <View key={item.id} style={styles.scheduleItem}>
              <View style={styles.scheduleTimeContainer}>
                <Text style={styles.scheduleTime}>{item.time}</Text>
                <View style={styles.durationContainer}>
                  <Clock size={12} color="#64748B" />
                  <Text style={styles.durationText}>{item.duration}</Text>
                </View>
              </View>
              
              <View style={styles.scheduleContent}>
                <Text style={styles.scheduleTitle}>{item.title}</Text>
                <Text style={styles.scheduleSource}>{item.source}</Text>
                
                <View style={styles.scheduleActions}>
                  <TouchableOpacity style={styles.watchButton}>
                    <Text style={styles.watchButtonText}>Start</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.completeButton}>
                    <CheckCircle size={16} color="#10B981" />
                    <Text style={styles.completeButtonText}>Complete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyDayContainer}>
            <View style={styles.emptyDayIcon}>
              <CalendarIcon size={40} color="#94A3B8" />
            </View>
            <Text style={styles.emptyDayTitle}>Nothing Scheduled</Text>
            <Text style={styles.emptyDayMessage}>
              You don't have any learning sessions scheduled for {selectedDay}
            </Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Content</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.availabilitySection}>
          <Text style={styles.sectionTitle}>Your Availability</Text>
          <View style={styles.availabilityCard}>
            <View style={styles.availabilityHeader}>
              <Text style={styles.availabilityTitle}>Weekdays</Text>
              <TouchableOpacity>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.timeSlotContainer}>
              <View style={styles.timeSlot}>
                <Clock size={16} color="#7C3AED" />
                <Text style={styles.timeSlotText}>6:00 AM - 7:30 AM</Text>
              </View>
              <View style={styles.timeSlot}>
                <Clock size={16} color="#7C3AED" />
                <Text style={styles.timeSlotText}>5:00 PM - 7:00 PM</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.availabilityCard}>
            <View style={styles.availabilityHeader}>
              <Text style={styles.availabilityTitle}>Weekends</Text>
              <TouchableOpacity>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.timeSlotContainer}>
              <View style={styles.timeSlot}>
                <Clock size={16} color="#7C3AED" />
                <Text style={styles.timeSlotText}>9:00 AM - 11:00 AM</Text>
              </View>
              <View style={styles.timeSlot}>
                <Clock size={16} color="#7C3AED" />
                <Text style={styles.timeSlotText}>3:00 PM - 5:00 PM</Text>
              </View>
            </View>
          </View>
        </View>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 16,
  },
  connectCalendarCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  calendarIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#EDE9FE',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  connectCalendarContent: {
    flex: 1,
  },
  connectCalendarTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  connectCalendarDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  connectButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 14,
  },
  daySelector: {
    paddingBottom: 8,
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedDayButton: {
    backgroundColor: '#7C3AED',
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  selectedDayButtonText: {
    color: '#FFFFFF',
  },
  scheduleItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  scheduleTimeContainer: {
    width: 80,
    marginRight: 16,
  },
  scheduleTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 4,
  },
  scheduleSource: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  scheduleActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  watchButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  watchButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 14,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  completeButtonText: {
    color: '#10B981',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 4,
  },
  emptyDayContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    marginTop: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyDayIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#F1F5F9',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyDayTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  emptyDayMessage: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  availabilitySection: {
    marginTop: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  availabilityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  availabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  availabilityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  editText: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '500',
  },
  timeSlotContainer: {
    marginBottom: 8,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeSlotText: {
    fontSize: 14,
    color: '#1E293B',
    marginLeft: 8,
  },
});