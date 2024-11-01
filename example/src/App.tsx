import { StyleSheet, View, SafeAreaView } from 'react-native';
import HomeScreen from './screens/home/HomeScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <HomeScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
  },
  box: {
    color: 'green',
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
