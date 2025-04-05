import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AnalyticsComponent from '../components/Quiz/AnalyticsComponent';
import HistoryComponent from '../components/Quiz/HistoryComponent';
import QuizOptionsModal from '../components/Quiz/QuizOptionsModal';;

const QuizScreen = ({ navigation }) => {
  const [showQuizModal, setShowQuizModal] = useState(false);

  const handleQuizOptionSelect = (option) => {
    setShowQuizModal(false);
    
    // Navigate to the appropriate screen based on option
    if (option === 'custom') {
      navigation.navigate('CustomQuizScreen');
    } else if (option === 'manual') {
      navigation.navigate('ManualQuizScreen');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Create Quiz Button */}
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowQuizModal(true)}
        >
          <View style={styles.plusIconContainer}>
            <Ionicons name="add" size={24} color="white" />
          </View>
          <Text style={styles.createButtonText}>Create Quiz</Text>
        </TouchableOpacity>
        
        {/* Analytics Section */}
        <AnalyticsComponent />
        
        {/* History Section */}
        <HistoryComponent />
      </ScrollView>

      {/* Quiz Options Modal */}
      <QuizOptionsModal 
        visible={showQuizModal} 
        onClose={() => setShowQuizModal(false)} 
        onSelect={handleQuizOptionSelect}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  createButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  plusIconContainer: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default QuizScreen;