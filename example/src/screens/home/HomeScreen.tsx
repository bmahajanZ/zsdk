import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppColors } from '../../Enums/AppColors';
import Divider from '../../components/Divider';
import SDKConfigureSection from './SDKConfigureSection';
import TunnelStartStopSection from './TunnelStartStopSection';
import HttpRequestSection from './HttpRequestSection';
import WebViewSection from './WebviewSection';
import NativeZsdk, { LogLevel } from '../../../../src/NativeZsdk';
import { AppKeyProvider } from '../../providers/AppKeyProvider';
import { RequestProvider } from '../../providers/RequestProvider';

const HomeScreen: React.FC = () => {
  useEffect(() => {
    async function setConfig() {
      try {
        await NativeZsdk.setConfiguration({
          enableDebugLogsInConsole: true,
          useProxyAuthentication: true,
          logLevel: LogLevel.LogLevelDebug.valueOf(),
        });
      } catch (error) {
        console.log('Error setting configuration', error);
      }
    }
    setConfig();
  }, []);
  return (
    <View style={styles.home}>
      <AppKeyProvider>
        <SDKConfigureSection />
        <Divider />
        <TunnelStartStopSection />
      </AppKeyProvider>
      <Divider />
      <RequestProvider>
        <HttpRequestSection />
        <Divider />
        <WebViewSection />
      </RequestProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: AppColors.Background,
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default HomeScreen;
