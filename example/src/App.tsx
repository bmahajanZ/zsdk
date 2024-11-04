import { StyleSheet, View, SafeAreaView } from 'react-native';
import HomeScreen from './screens/home/HomeScreen';
import { useEffect } from 'react';
import NativeZsdk from '../../src/NativeZsdk';

export default function App() {
  // Run this once to make sure tunnel is disconnected on app start
  useEffect(() => {
    async function stopTunnel() {
      console.log(await NativeZsdk.stopTunnel());
    }
    stopTunnel();
  }, []);
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
