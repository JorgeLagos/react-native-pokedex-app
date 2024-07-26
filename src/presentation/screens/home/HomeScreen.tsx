import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { getPokemons } from '../../../actions/pokemons';

import { PokeballBg } from '../../components/ui/PokeballBg';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { globalTheme } from '../../../config/theme/global.theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const queryClient = useQueryClient();

  // Esta es la forma tradicional de una peticion http
  // const { isLoading, data: pokemons = [] } = useQuery({
  //   queryKey: ['pokemons'],
  //   queryFn: () => getPokemons(0),
  //   staleTime: 1000 * 60 * 60, // 60 minutes
  // });

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: async (params) => {
      const pokemons = await getPokemons(params.pageParam);
      pokemons.forEach((pokemon) => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });
      return pokemons;
    },
    getNextPageParam: (lastPage, pages) => pages.length,
    staleTime: 1000 * 60 * 60, // 60 minutes
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={style.imgPosition}></PokeballBg>

      {/* Esta es la forma tradicional de una peticion http */}
      {/* <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        ListHeaderComponent={() => <Text variant="displaySmall">Pokedex</Text>}
        renderItem={({ item }) => <PokemonCard pokemon={item}></PokemonCard>} /> */}

      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        ListHeaderComponent={() => <Text variant="displaySmall">Pokedex</Text>}
        renderItem={({ item }) => <PokemonCard pokemon={item}></PokemonCard>}
        onEndReachedThreshold={0.5}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false} />
    </View>
  )
}

const style = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
})