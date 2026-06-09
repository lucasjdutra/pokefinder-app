import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function PokedexDetailScreen() {
  const route = useRoute<any>();

  const { id } = route.params; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Pokémon ID: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: {
    fontSize: 18,
    marginBottom: 10
  }
});