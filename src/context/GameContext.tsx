import React, { createContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type GameContextData = {
  unlockedPokemons: number[];
  unlockPokemon: (id: number) => void;
};

export const GameContext = createContext<GameContextData>({} as GameContextData);

const STORAGE_KEY = '@pokefinder_unlocked';

export function GameProvider({ children }: { children: ReactNode }) {
  const [unlockedPokemons, setUnlockedPokemons] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          setUnlockedPokemons(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadStorageData();
  }, []);

  const unlockPokemon = (id: number) => {
    setUnlockedPokemons((prev) => {
      if (prev.includes(id)) return prev; 
      
      const newList = [...prev, id];
      
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newList)).catch((error) => {
        console.error("Erro ao salvar no AsyncStorage:", error);
      });
      
      return newList; 
    });
  };

  if (!isLoaded) {
    return null; 
  }

  return (
    <GameContext.Provider value={{ unlockedPokemons, unlockPokemon }}>
      {children}
    </GameContext.Provider>
  );
}