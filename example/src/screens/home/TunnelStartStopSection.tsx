import { StyleSheet, Text, View } from 'react-native';
import ToggleButton from '../../components/ToggleButton';
import NativeZsdk from '../../../../src/NativeZsdk';
import React, { useContext, useEffect, useState } from 'react';
import { AppKeyContext } from '../../context/AppKeyContext';

const TunnelStartStopSection: React.FC = () => {
  return (
    <View style={styles.tunnelStartStopSection}>
      <View style={styles.tunnelToggle}>
        <PreloginToggel />
        <ToggleButton text="Zero Trust Tunnel" />
      </View>
      <Status />
    </View>
  );
};

const PreloginToggel: React.FC = () => {
  const [failed, setFailed] = useState<boolean>(false);
  const context = useContext(AppKeyContext);

  useEffect(() => {
    if (failed) {
      setTimeout(() => {
        setFailed(false);
      }, 500); // 2000 milliseconds = 2 seconds
    }
  }, [failed]);

  if (!context) {
    throw new Error(
      'InputRowWithContext must be used within an AppKeyProvider'
    );
  }

  const { appKey } = context;

  async function handleToggle(isSelected: boolean) {
    if (isSelected === true) {
      try {
        // Bhaskar TODO: Add udid
        await NativeZsdk.startPreloginTunnel(appKey, 'udid');
        console.log('Tunnel started');
        setFailed(false);
      } catch (error) {
        console.log('Error starting tunnel', error);
        setFailed(true);
      }
    } else {
      console.log(await NativeZsdk.stopTunnel());
    }
  }

  return (
    <ToggleButton
      text="Pre Login Tunnel"
      onValueChange={handleToggle}
      failed={failed}
    />
  );
};

const Status: React.FC = () => {
  const [status, setStatus] = useState<string>('');

  // Function you want to poll
  const fetchUpdatedStatus = async () => {
    // Call your function here
    const updatedStatus = NativeZsdk.status();
    if (updatedStatus !== status) {
      setStatus(updatedStatus);
    }
  };

  useEffect(() => {
    // Set up polling every 5 seconds
    const interval = setInterval(fetchUpdatedStatus, 1000);

    // Initial fetch
    fetchUpdatedStatus();

    // Clean up on component unmount
    return () => clearInterval(interval);
  });

  return (
    <View style={styles.status}>
      <Text> Status:{status} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // ///////
  tunnelStartStopSection: {
    width: '100%',
    padding: 10,
    flex: 1.5,
    flexDirection: 'row',
  },
  tunnelToggle: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  status: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default TunnelStartStopSection;
