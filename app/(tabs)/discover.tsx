import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Search, Clock, Plus } from 'lucide-react-native';
import TopicBadge from '@/components/TopicBadge';

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [topics, setTopics] = useState(['Machine Learning', 'Web Development', 'DevOps', 'Data Science']);

  const recommendations = [
    {
      id: '1',
      title: 'Introduction to Machine Learning Algorithms',
      creator: 'Stanford Online',
      source: 'YouTube',
      duration: '45 min',
      imageUrl: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '2',
      title: 'Cloud DevOps Best Practices',
      creator: 'Tech Talk',
      source: 'Spotify',
      duration: '32 min',
      imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '3',
      title: 'Data Science for Beginners',
      creator: 'Data School',
      source: 'YouTube',
      duration: '28 min',
      imageUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
  ];

  const popularTopics = [
    { id: '1', name: 'JavaScript', count: 2423 },
    { id: '2', name: 'Python', count: 1854 },
    { id: '3', name: 'React', count: 1208 },
    { id: '4', name: 'AWS', count: 982 },
    { id: '5', name: 'Data Science', count: 765 },
    { id: '6', name: 'UI/UX Design', count: 544 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Discover</Text>
      
      <View style={styles.searchContainer}>
        <Search size={20} color="#64748B" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search topics..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Your Topics</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.topicsContainer}
        >
          {topics.map((topic, index) => (
            <TopicBadge key={index} label={topic} />
          ))}
          
          <TouchableOpacity style={styles.addTopicButton}>
            <Plus size={16} color="#64748B" />
            <Text style={styles.addTopicText}>Add Topic</Text>
          </TouchableOpacity>
        </ScrollView>
        
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        {recommendations.map(item => (
          <TouchableOpacity key={item.id} style={styles.recommendationCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.recommendationImage} />
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationTitle}>{item.title}</Text>
              <Text style={styles.recommendationMeta}>{item.creator} • {item.source}</Text>
              <View style={styles.recommendationFooter}>
                <View style={styles.durationContainer}>
                  <Clock size={14} color="#64748B" />
                  <Text style={styles.durationText}>{item.duration}</Text>
                </View>
                <TouchableOpacity style={styles.scheduleButton}>
                  <Text style={styles.scheduleButtonText}>Schedule</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        
        <Text style={styles.sectionTitle}>Popular Topics</Text>
        <View style={styles.popularTopicsContainer}>
          {popularTopics.map(topic => (
            <TouchableOpacity key={topic.id} style={styles.popularTopic}>
              <Text style={styles.popularTopicName}>{topic.name}</Text>
              <Text style={styles.popularTopicCount}>{topic.count} content</Text>
            </TouchableOpacity>
          ))}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 24,
    marginBottom: 16,
  },
  topicsContainer: {
    paddingRight: 16,
  },
  addTopicButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    marginRight: 8,
  },
  addTopicText: {
    color: '#64748B',
    fontWeight: '500',
    marginLeft: 4,
  },
  recommendationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  recommendationImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  recommendationContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 4,
  },
  recommendationMeta: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  recommendationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 4,
  },
  scheduleButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  scheduleButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 14,
  },
  popularTopicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  popularTopic: {
    width: '48%',
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
  popularTopicName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  popularTopicCount: {
    fontSize: 14,
    color: '#64748B',
  },
});