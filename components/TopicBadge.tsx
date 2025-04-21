import { View, Text, StyleSheet } from 'react-native';

type TopicBadgeProps = {
  label: string;
};

export default function TopicBadge({ label }: TopicBadgeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    marginRight: 8,
  },
  label: {
    color: '#7C3AED',
    fontWeight: '500',
  },
});