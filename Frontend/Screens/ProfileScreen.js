import React, { useEffect, useState } from 'react';
import * as SecureStore from "expo-secure-store";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import jwtDecode from 'jwt-decode';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const accessToken = await SecureStore.getItemAsync('accessToken');
        if (accessToken) {
          const decoded = jwtDecode(accessToken);
          setUserData(decoded);
        } else {
          setError('No access token found');
        }
      } catch (error) {
        console.error('Error decoding user data:', error);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  // Card component with null/undefined value handling
  const InfoCard = ({ title, data }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {Object.entries(data).map(([key, value], index) => (
        <View key={index} style={styles.infoRow}>
          <Text style={styles.infoLabel}>{key}</Text>
          <Text style={styles.infoValue}>{value || 'Not available'}</Text>
        </View>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#815AD5" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{uri: 'https://drive.google.com/thumbnail?id=1wkrqbocKW0UwSb4gsWYHNSlucjZjok1L'}}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.userName}>
            {userData ? `${userData.firstname || ''} ${userData.lastname || ''}` : 'User'}
          </Text>
        </View>

        {userData && (
          <>
            <InfoCard 
              title="Account Details" 
              data={{
                Username: userData.username,
                "School ID": userData.SchoolID,
                Email: userData.email,
                Phone: userData.phone,
                Gender: userData.gender,
                "Date of Birth": userData.date_of_birth
              }} 
            />

            <InfoCard 
              title="Personal Info" 
              data={{
                "Full Name": `${userData.firstname || ''} ${userData.lastname || ''}`,
                Email: userData.email,
                Phone: userData.phone,
                Gender: userData.gender,
                "Date of Birth": userData.date_of_birth
              }} 
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1e6ff',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#815AD5',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1e6ff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#815AD5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1e6ff',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default ProfileScreen;