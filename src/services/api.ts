import axios from 'axios';

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const fetchRandomPokemon = async (maxId: number = 151) => {
  try {
    const randomId = Math.floor(Math.random() * maxId) + 1;
    const response = await pokeApi.get(`/pokemon/${randomId}`);
    
    return {
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.other['official-artwork'].front_default, 
    };
  } catch (error) {
    console.error("Erro ao buscar Pokémon aleatório:", error);
    throw new Error("Falha ao carregar o Pokémon. Tente novamente.");
  }
};

export const fetchPokemonDetails = async (id: number) => {
  try {
    const [pokemonResponse, speciesResponse] = await Promise.all([
      pokeApi.get(`/pokemon/${id}`),
      pokeApi.get(`/pokemon-species/${id}`)
    ]);

    const englishEntry = speciesResponse.data.flavor_text_entries.find(
      (entry: any) => entry.language.name === 'en'
    );
    const description = englishEntry ? englishEntry.flavor_text.replace(/\n|\f/g, ' ') : 'No description available.';

    return {
      id: pokemonResponse.data.id,
      name: pokemonResponse.data.name,
      types: pokemonResponse.data.types.map((t: any) => t.type.name),
      image: pokemonResponse.data.sprites.other['official-artwork'].front_default,
      description: description,
    };
  } catch (error) {
    console.error(`Erro ao buscar detalhes do Pokémon ${id}:`, error);
    throw new Error("Falha ao carregar os detalhes deste Pokémon.");
  }
};

export const fetchPokedexList = async (limit: number = 151) => {
  try {
    const response = await pokeApi.get(`/pokemon?limit=${limit}`);
    return response.data.results.map((item: any, index: number) => ({
      id: index + 1,
      name: item.name,
    }));
  } catch (error) {
    console.error("Erro ao buscar a lista da Pokédex:", error);
    throw new Error("Falha ao carregar a lista.");
  }
};