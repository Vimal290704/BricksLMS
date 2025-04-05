import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const AnalyticsComponent = () => {
  const screenWidth = Dimensions.get('window').width - 32; // accounting for padding
  
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99],
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth: 2
      }
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics</Text>
      
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={screenWidth - 32}
          height={180}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>
      
      <View style={styles.statItem}>
        <View style={styles.statLeftContent}>
          <View style={styles.checkIconContainer}>
            <Ionicons name="checkmark" size={18} color="white" />
          </View>
          <Text style={styles.statLabel}>Quiz Completed</Text>
        </View>
        <Text style={styles.statValue}>18</Text>
      </View>
      
      <View style={styles.statItem}>
        <View style={styles.statLeftContent}>
          <View style={styles.flameIconContainer}>
            <Ionicons name="flame" size={18} color="#FF9800" />
          </View>
          <Text style={styles.statLabel}>Accuracy</Text>
        </View>
        <Text style={styles.statValue}>75%</Text>
      </View>
      
      <View style={styles.seeAllContainer}>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>SEE ALL</Text>
        </TouchableOpacity>
      </View>
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
  chartContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  chart: {
    borderRadius: 8,
    marginVertical: 8,
  },
  statItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIconContainer: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  flameIconContainer: {
    marginRight: 8,
  },
  statLabel: {
    fontSize: 16,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAllContainer: {
    alignItems: 'flex-end',
  },
  seeAllButton: {
    backgroundColor: '#7E57C2',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  seeAllText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 12,
  },
});

export default AnalyticsComponent;