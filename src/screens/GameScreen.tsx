import React, { useState, useEffect, useReducer, useContext } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { fetchRandomPokemon } from '../services/api';
import { GameContext } from '../context/GameContext';

type GameState = {
  status: 'loading' | 'guessing' | 'feedback' | 'finished';
  pokemon: { id: number; name: string; image: string } | null;
  isCorrect: boolean;
};

type GameAction = 
  | { type: 'START_LOADING' }
  | { type: 'SET_POKEMON'; payload: any }
  | { type: 'RESULT'; payload: boolean }
  | { type: 'FINISH_GAME' };

const initialState: GameState = { status: 'loading', pokemon: null, isCorrect: false };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_LOADING': return { ...state, status: 'loading' };
    case 'SET_POKEMON': return { ...state, status: 'guessing', pokemon: action.payload, isCorrect: false };
    case 'RESULT': return { ...state, status: 'feedback', isCorrect: action.payload };
    case 'FINISH_GAME': return { ...state, status: 'finished' };
    default: return state;
  }
}

export default function GameScreen() {
  const { unlockedPokemons, unlockPokemon } = useContext(GameContext);
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  const [guess, setGuess] = useState('');

  const loadNewPokemon = async () => {
    dispatch({ type: 'START_LOADING' });

    if (unlockedPokemons.length >= 151) {
      dispatch({ type: 'FINISH_GAME' });
      return;
    }

    try {
      let newPokemon;
      let isAlreadyUnlocked = true;

      while (isAlreadyUnlocked) {
        newPokemon = await fetchRandomPokemon(151);
        if (!unlockedPokemons.includes(newPokemon.id)) {
          isAlreadyUnlocked = false;
        }
      }

      dispatch({ type: 'SET_POKEMON', payload: newPokemon });
      setGuess('');
    } catch (error) {
      Alert.alert("Error", "Failed to load the Pokémon. Check your internet connection.");
    }
  };

  useEffect(() => {
    loadNewPokemon();
  }, []); 

  const handleGuess = () => {
    if (!state.pokemon || guess.trim() === '') return;

    const isMatch = guess.toLowerCase().trim() === state.pokemon.name.toLowerCase();
    
    dispatch({ type: 'RESULT', payload: isMatch });

    if (isMatch) {
      unlockPokemon(state.pokemon.id);
    }
  };

  if (state.status === 'finished') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Parabéns! Você completou a Pokédex!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who is this Pokémon?</Text>

      {state.status === 'loading' ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 50 }} />
      ) : (
        state.pokemon && (
          <Image 
            source={{ uri: state.pokemon.image }} 
            style={[
              styles.sprite, 
              state.status === 'guessing' && { tintColor: '#222224' }
            ]} 
          />
        )
      )}

      {state.status === 'feedback' ? (
        <View style={styles.feedbackContainer}>
          <Text style={[styles.feedbackText, { color: state.isCorrect ? 'green' : 'red' }]}>
            {state.isCorrect 
              ? `Correct! It's ${state.pokemon?.name.toUpperCase()}!` 
              : `Wrong answer... It was ${state.pokemon?.name.toUpperCase()}.`}
          </Text>
          <Button title="Next Pokémon" onPress={loadNewPokemon} />
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            placeholder="Type the name..."
            value={guess}
            onChangeText={setGuess}
            editable={state.status === 'guessing'}
          />
          <Button 
            title="Guess" 
            onPress={handleGuess} 
            disabled={state.status !== 'guessing' || guess.trim() === ''} 
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  sprite: { width: 250, height: 250, resizeMode: 'contain', marginVertical: 20 },
  inputContainer: { width: '100%', alignItems: 'center' },
  input: { width: '80%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15, backgroundColor: '#fff', fontSize: 16, textAlign: 'center' },
  feedbackContainer: { alignItems: 'center', marginTop: 20 },
  feedbackText: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' }
});