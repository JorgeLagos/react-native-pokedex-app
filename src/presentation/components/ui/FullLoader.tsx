import { Text, View, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-paper';

export const FullLoader = () => {
  const { colors } = useTheme();

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      }}>
      <ActivityIndicator size={50} />
    </View>
  )
}