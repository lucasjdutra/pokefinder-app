import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PokedexScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista da Pokédex (1-151)</Text>
      <Button 
        title="Ver detalhes de um Pokémon" 
        onPress={() => navigation.navigate('PokedexDetail', { id: 25 })} 
      />
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