import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppColors } from '../../Enums/AppColors';
import Divider from '../../components/Divider';
import SDKConfigureSection from './SDKConfigureSection';
import TunnelStartStopSection from './TunnelStartStopSection';
import HttpRequestSection from '../HttpRequestSection';
import WebViewSection from './WebviewSection';
import NativeZsdk, { LogLevel } from '../../../../src/NativeZsdk';
import { AppKeyProvider } from '../../context/AppKeyContext';

const HomeScreen: React.FC = () => {
    useEffect(() => {
        NativeZsdk.setConfiguration({
            enableDebugLogsInConsole: true,
            useProxyAuthentication: true,
            logLevel: LogLevel.LogLevelDebug.valueOf(),
        });
    }, []);
    return (
        <View style={styles.home}>
            <AppKeyProvider>
                <SDKConfigureSection />
                <Divider />
                <TunnelStartStopSection />
            </AppKeyProvider>
            <Divider />
            <HttpRequestSection />
            <Divider />
            <WebViewSection />
        </View>
    );
};


const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: AppColors.Background,
        flexDirection: 'column',
        justifyContent: "space-around",
        width: "100%",
    },

});

export default HomeScreen;
