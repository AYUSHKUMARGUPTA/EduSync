import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Info, ChevronDown, Calendar } from 'lucide-react-native';

export default function AddTopicScreen() {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('Medium (20-30 min)');
  const [durationMenuOpen, setDurationMenuOpen] = useState(false);
  const [includeYoutube, setIncludeYoutube] = useState(true);
  const [includeSpotify, setIncludeSpotify] = useState(true);
  
  const durations = [
    'Short (5-15 min)',
    'Medium (20-30 min)',
    'Long (30-60 min)'
  ];

  const handleSubmit = () => {
    // Process topic submission logic here
    console.log({ topic, description, selectedDuration, includeYoutube, includeSpotify });
    
    // Navigate to availability screen
    router.push('/schedule');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>Add Learning Topic</Text>
        
        <View style={styles.infoBox}>
          <Info size={20} color="#3B82F6" />
          <Text style={styles.infoText}>
            EduSync will use AI to find and schedule learning content based on your interests and availability.
          </Text>
        </View>
        
        <Text style={styles.label}>What do you want to learn?</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Machine Learning, Cloud DevOps"
          placeholderTextColor="#94A3B8"
          value={topic}
          onChangeText={setTopic}
        />
        
        <Text style={styles.label}>Additional details (optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Any specific aspects you're interested in..."
          placeholderTextColor="#94A3B8"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />
        
        <Text style={styles.label}>Preferred content duration</Text>
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={() => setDurationMenuOpen(!durationMenuOpen)}
        >
          <Text style={styles.dropdownButtonText}>{selectedDuration}</Text>
          <ChevronDown size={20} color="#64748B" />
        </TouchableOpacity>
        
        {durationMenuOpen && (
          <View style={styles.dropdownMenu}>
            {durations.map(duration => (
              <TouchableOpacity 
                key={duration}
                style={[
                  styles.dropdownItem,
                  selectedDuration === duration && styles.dropdownItemSelected
                ]}
                onPress={() => {
                  setSelectedDuration(duration);
                  setDurationMenuOpen(false);
                }}
              >
                <Text 
                  style={[
                    styles.dropdownItemText,
                    selectedDuration === duration && styles.dropdownItemTextSelected
                  ]}
                >
                  {duration}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        <Text style={styles.label}>Content sources</Text>
        <View style={styles.optionContainer}>
          <View style={styles.optionLeftContent}>
            <View style={[styles.sourceIcon, styles.youtubeIcon]}>
              <Text style={styles.sourceIconText}>YT</Text>
            </View>
            <Text style={styles.optionText}>YouTube Videos</Text>
          </View>
          <Switch
            trackColor={{ false: '#E2E8F0', true: '#C4B5FD' }}
            thumbColor={includeYoutube ? '#7C3AED' : '#F9FAFB'}
            ios_backgroundColor="#E2E8F0"
            onValueChange={() => setIncludeYoutube(!includeYoutube)}
            value={includeYoutube}
          />
        </View>
        
        <View style={styles.optionContainer}>
          <View style={styles.optionLeftContent}>
            <View style={[styles.sourceIcon, styles.spotifyIcon]}>
              <Text style={styles.sourceIconText}>SP</Text>
            </View>
            <Text style={styles.optionText}>Spotify Podcasts</Text>
          </View>
          <Switch
            trackColor={{ false: '#E2E8F0', true: '#C4B5FD' }}
            thumbColor={includeSpotify ? '#7C3AED' : '#F9FAFB'}
            ios_backgroundColor="#E2E8F0"
            onValueChange={() => setIncludeSpotify(!includeSpotify)}
            value={includeSpotify}
          />
        </View>
        
        <TouchableOpacity style={styles.calendarButtonContainer}>
          <View style={styles.calendarButton}>
            <Calendar size={20} color="#7C3AED" />
            <Text style={styles.calendarButtonText}>
              Set Availability Times
            </Text>
          </View>
          <Text style={styles.calendarInfo}>
            Configure your free time slots for scheduling content
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.submitButton,
            !topic ? styles.submitButtonDisabled : null
          ]}
          onPress={handleSubmit}
          disabled={!topic}
        >
          <Text style={styles.submitButtonText}>Add Topic</Text>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 16,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  infoText: {
    flex: 1,
    marginLeft: 8,
    color: '#1E40AF',
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  textArea: {
    minHeight: 100,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#1E293B',
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  dropdownItemSelected: {
    backgroundColor: '#F5F3FF',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#1E293B',
  },
  dropdownItemTextSelected: {
    color: '#7C3AED',
    fontWeight: '500',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  optionLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  youtubeIcon: {
    backgroundColor: '#FECACA',
  },
  spotifyIcon: {
    backgroundColor: '#D1FAE5',
  },
  sourceIconText: {
    fontWeight: '600',
    fontSize: 14,
  },
  optionText: {
    fontSize: 16,
    color: '#1E293B',
  },
  calendarButtonContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    marginBottom: 8,
  },
  calendarButtonText: {
    color: '#7C3AED',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  calendarInfo: {
    textAlign: 'center',
    fontSize: 14,
    color: '#64748B',
  },
  submitButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  submitButtonDisabled: {
    backgroundColor: '#C4B5FD',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});