import { pokeapi } from '../../config/api/pokeapi';
import type { Pokemon } from '../../domain/entities/pokemon';
import type { PokeApiPokemon, PokeApiResponse } from '../../infrastructure/interfaces/pokeapi.interface';
import { PokemonMapper } from '../../infrastructure/mappers/pokemon.mapper';

// export const sleep = async () => {
//   return new Promise(resolve => setTimeout(resolve, 3000));
// }

export const getPokemons = async (page: number, limit: number=20): Promise<Pokemon[]> => {
  // await sleep();

  try {
    const { data } = await pokeapi.get<PokeApiResponse>(`/pokemon?offset=${page * 10}&limit=${limit}`);
    
    const pokemonPromise = data.results.map((info) => pokeapi.get<PokeApiPokemon>(info.url));

    const pokeapiPokemons = await Promise.all(pokemonPromise);
    const pokemonsPromises = pokeapiPokemons.map((data) => PokemonMapper.pokeApiPokemonEntity(data.data));

    return await Promise.all(pokemonsPromises);
  }

  catch (error) {
    console.log(error);
    throw new Error(`Error getting pokemons`);
  }
}