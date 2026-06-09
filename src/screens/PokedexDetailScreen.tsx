import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchPokemonDetails } from '../services/api';

type PokemonDetails = {
  id: number;
  name: string;
  types: string[];
  image: string;
  description: string;
};

export default function PokedexDetailScreen() {
  const route = useRoute<any>();
  const { id } = route.params; 

  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchPokemonDetails(id);
        setDetails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!details) {
    return (
      <View style={styles.centerContainer}>
        <Text>Erro ao carregar dados do Pokémon.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.number}>#{details.id.toString().padStart(3, '0')}</Text>
      <Text style={styles.name}>{details.name.toUpperCase()}</Text>

      <Image source={{ uri: details.image }} style={styles.image} />

      <View style={styles.typesContainer}>
        {details.types.map((type, index) => (
          <View key={index} style={styles.typeBadge}>
            <Text style={styles.typeText}>{type.toUpperCase()}</Text>
          </View>
        ))}
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Descrição</Text>
        <Text style={styles.descriptionText}>{details.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5', flexGrow: 1 },
  number: { fontSize: 20, fontWeight: 'bold', color: '#888', marginTop: 10 },
  name: { fontSize: 32, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  image: { width: 250, height: 250, resizeMode: 'contain' },
  typesContainer: { flexDirection: 'row', marginTop: 20, marginBottom: 30 },
  typeBadge: { backgroundColor: '#4A90E2', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginHorizontal: 5 },
  typeText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  descriptionContainer: { backgroundColor: '#fff', padding: 20, borderRadius: 12, width: '100%', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  descriptionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  descriptionText: { fontSize: 16, color: '#555', lineHeight: 24, textAlign: 'justify' }
});