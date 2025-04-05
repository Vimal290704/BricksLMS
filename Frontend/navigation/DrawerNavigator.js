// navigation/DrawerNavigator.js
import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import MainNavigator from './MainNavigator';
import { useAuth } from '../context/AuthContext';
import SubjectsScreen from '../Screens/SubjectsScreen';
import QuizScreen from '../Screens/QuizScreen';
import InstituteScreen from '../Screens/InstituteScreen';
import AIassistScreen from '../Screens/AIassistScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import ConnectScreen from '../Screens/ConnectScreen';
import QuizNavigator from './QuizNavigator';

const Drawer = createDrawerNavigator();


const CustomDrawerContent = (props) => {
  const { logout } = useAuth();
  
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image 
          source={require('../assets/logo(1).png')} 
          style={styles.logo}
        />
        <Text style={styles.appName}>BricksLMS</Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => props.navigation.closeDrawer()}
        >
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <DrawerItemList {...props} />
      
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          try {
            await logout();
            props.navigation.closeDrawer();
          } catch (error) {
            console.error('Logout failed', error);
          }
        }}
      >
        <Ionicons name="log-out-outline" size={24} color="#815AD5" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
          headerShown: true, // Show the header
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 10 }}
            >
              <Image source={require('../assets/logo(1).png')} style={{ width: 50, height: 25 }} />
            </TouchableOpacity>
          ),
          
        })}
      >
        <Drawer.Screen 
          name="MainTabs" 
          component={MainNavigator} 
          options={{
            title: 'Home',
            drawerIcon: ({color}) => (
              <Ionicons name="home-outline" size={22} color={color} />
            )
          }}
        />
      <Drawer.Screen 
    
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="book-outline" size={22} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="QuizDrawer" 
        component={QuizNavigator} 
        options={{
          title: 'Quiz',
          drawerIcon: ({color}) => (
            <Ionicons name="help-circle-outline" size={22} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="InstitueDrawer" 
        component={InstituteScreen} 
        options={{
          title: 'Institue',
          drawerIcon: ({color}) => (
            <Ionicons name="school-outline" size={22} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Assist" 
        component={AIassistScreen} 
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="chatbubble-ellipses-outline" size={22} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Insights" 
        component={InstituteScreen} 
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="analytics-outline" size={22} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Connect" 
        component={ConnectScreen} 
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="link-outline" size={22} color={color} />
          )
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#815AD5',
    marginLeft: 10,
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 30,
    color: '#815AD5',
  },
});

export default DrawerNavigator;