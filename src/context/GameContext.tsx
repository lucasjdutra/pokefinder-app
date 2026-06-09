import React, { createContext, useState, ReactNode } from 'react';

type GameContextData = {
  unlockedPokemons: number[];
  unlockPokemon: (id: number) => void;
};

export const GameContext = createContext<GameContextData>({} as GameContextData);

export function GameProvider({ children }: { children: ReactNode }) {
  const [unlockedPokemons, setUnlockedPokemons] = useState<number[]>([]);

  const unlockPokemon = (id: number) => {
    setUnlockedPokemons((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  return (
    <GameContext.Provider value={{ unlockedPokemons, unlockPokemon }}>
      {children}
    </GameContext.Provider>
  );
}