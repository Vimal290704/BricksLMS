import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ManualQuizScreen = ({ navigation }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);

  const selectCorrectOption = (index) => {
    const updatedOptions = options.map((option, i) => ({
      ...option,
      isCorrect: i === index
    }));
    setOptions(updatedOptions);
  };

  const updateOptionText = (text, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = { ...updatedOptions[index], text };
    setOptions(updatedOptions);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Manual Quiz</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.quizInfoContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Quiz Title</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter quiz title"
              value={quizTitle}
              onChangeText={setQuizTitle}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Subject</Text>
            <View style={styles.pickerContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Select subject"
                value={subject}
                onChangeText={setSubject}
              />
              <Ionicons name="chevron-down" size={20} color="#757575" style={styles.pickerIcon} />
            </View>
          </View>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>Question 1</Text>
          <TextInput
            style={styles.questionInput}
            placeholder="Enter your question"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={question}
            onChangeText={setQuestion}
          />

          {options.map((option, index) => (
            <View key={index} style={styles.optionRow}>
              <TouchableOpacity 
                style={[
                  styles.radioButton,
                  option.isCorrect && styles.radioButtonSelected
                ]}
                onPress={() => selectCorrectOption(index)}
              >
                {option.isCorrect && <View style={styles.radioInner} />}
              </TouchableOpacity>
              <TextInput
                style={styles.optionInput}
                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                value={option.text}
                onChangeText={(text) => updateOptionText(text, index)}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Another Question</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Quiz</Text>
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
  quizInfoContainer: {
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
  pickerContainer: {
    position: 'relative',
  },
  pickerIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  questionContainer: {
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
  questionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  questionInput: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    minHeight: 80,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#757575',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#2196F3',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2196F3',
  },
  optionInput: {
    flex: 1,
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
  addButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ManualQuizScreen;