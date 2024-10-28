import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppColors } from '../../Enums/AppColors';
import Divider from '../../components/Divider';
import SDKConfigureSection from './SDKConfifureSection';
import TunnelStartStopSection from './TunnelStartStopSection';
import HttpRequestSection from '../HttpRequestSection';
import WebViewSection from './WebviewSection';

const HomeScreen: React.FC = () => {
    return (
        <View style={styles.home}>
            <SDKConfigureSection />
            <Divider />
            <TunnelStartStopSection />
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
