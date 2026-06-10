import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GameScreen from '../screens/GameScreen';
import PokedexScreen from '../screens/PokedexScreen';
import PokedexDetailScreen from '../screens/PokedexDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function PokedexStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="PokedexList" 
        component={PokedexScreen} 
        options={{ title: 'Pokédex' }} 
      />
      <Stack.Screen 
        name="PokedexDetail" 
        component={PokedexDetailScreen} 
        options={{ title: 'Details' }} 
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Game" 
        component={GameScreen} 
        options={{ tabBarLabel: 'Play' }} 
      />
      <Tab.Screen 
        name="PokedexTab" 
        component={PokedexStack} 
        options={{ tabBarLabel: 'Pokédex' }} 
      />
    </Tab.Navigator>
  );
}