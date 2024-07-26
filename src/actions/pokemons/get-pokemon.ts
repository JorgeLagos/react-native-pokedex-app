import { pokeapi } from '../../config/api/pokeapi';
import type { Pokemon } from '../../domain/entities/pokemon';
import type { PokeApiPokemon, PokeApiResponse } from '../../infrastructure/interfaces/pokeapi.interface';
import { PokemonMapper } from '../../infrastructure/mappers/pokemon.mapper';

export const getPokemon = async (id: number): Promise<Pokemon> => {
  try {
    const { data } = await pokeapi.get<PokeApiPokemon>(`/pokemon/${id}`);
    return PokemonMapper.pokeApiPokemonEntity(data);
  }

  catch (error) {
    console.log(error);
    throw new Error(`Error getting pokemon`);
  }
}