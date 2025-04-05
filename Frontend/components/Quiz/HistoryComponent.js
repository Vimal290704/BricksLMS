import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HistoryComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      
      <TouchableOpacity style={styles.quizItem}>
        <View>
          <Text style={styles.subject}>Physics</Text>
          <Text style={styles.quizName}>Thermodynamics</Text>
          <Text style={styles.date}>11 Jan 2025</Text>
        </View>
        <Text style={styles.score}>70/100</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.quizItem, styles.secondQuizItem]}>
        <View>
          <Text style={styles.subject}>Mathematics</Text>
          <Text style={styles.quizName}>Calculus</Text>
          <Text style={styles.date}>5 Jan 2025</Text>
        </View>
        <Text style={styles.score}>85/100</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  quizItem: {
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  secondQuizItem: {
    backgroundColor: '#E3F2FD',
    marginBottom: 0,
  },
  subject: {
    fontSize: 14,
    color: '#666',
  },
  quizName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HistoryComponent;