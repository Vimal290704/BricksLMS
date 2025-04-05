import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomQuizScreen = ({ navigation }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [numQuestions, setNumQuestions] = useState('10');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Custom Quiz</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.uploadContainer}>
          <Text style={styles.sectionTitle}>Upload Materials</Text>
          <TouchableOpacity style={styles.uploadArea}>
            <Ionicons name="document-text" size={48} color="#BDBDBD" />
            <Text style={styles.uploadText}>Upload PDF, DOCX, or text files</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Choose Files</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Quiz Settings</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Quiz Title</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter title"
              value={quizTitle}
              onChangeText={setQuizTitle}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Number of Questions</Text>
            <TextInput
              style={styles.textInput}
              placeholder="10"
              keyboardType="number-pad"
              value={numQuestions}
              onChangeText={setNumQuestions}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.generateButton}>
          <Text style={styles.generateButtonText}>Generate Quiz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  uploadContainer: {
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  uploadArea: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#BDBDBD',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
  },
  uploadText: {
    color: '#757575',
    marginVertical: 12,
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  settingsContainer: {
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
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
  },
  textInput: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  generateButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomQuizScreen;