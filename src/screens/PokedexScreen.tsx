import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchPokedexList } from '../services/api';
import { GameContext } from '../context/GameContext';

export default function PokedexScreen() {
  const [pokemonList, setPokemonList] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { unlockedPokemons } = useContext(GameContext);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadList = async () => {
      try {
        const list = await fetchPokedexList(151);
        setPokemonList(list);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadList();
  }, []);

  const renderItem = ({ item }: { item: { id: number; name: string } }) => {
    const isUnlocked = unlockedPokemons.includes(item.id);

    return (
      <TouchableOpacity
        style={[styles.itemCard, isUnlocked ? styles.unlockedCard : styles.lockedCard]}
        disabled={!isUnlocked}
        onPress={() => navigation.navigate('PokedexDetail', { id: item.id })}
      >
        <Text style={styles.pokemonNumber}>#{item.id.toString().padStart(3, '0')}</Text>
        <Text style={[styles.pokemonName, !isUnlocked && styles.lockedText]}>
          {isUnlocked ? item.name.toUpperCase() : '???'}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  listContent: { padding: 15 },
  itemCard: { padding: 15, borderRadius: 8, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  unlockedCard: { backgroundColor: '#ffffff', elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
  lockedCard: { backgroundColor: '#d3d3d3' },
  pokemonNumber: { fontSize: 16, fontWeight: 'bold', color: '#555' },
  pokemonName: { fontSize: 18, fontWeight: 'bold' },
  lockedText: { color: '#888' }
});