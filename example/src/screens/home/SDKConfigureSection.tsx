import { StyleSheet, View } from 'react-native';
import InputRow from '../../components/InputRow';
import ActionButton from '../../components/ActionButton';
import { AppColors } from '../../Enums/AppColors';
import { AppStrings } from '../../Enums/AppStrings';
import { AppKeyContext } from '../../contexts/AppKeyContext';
import { useContext } from 'react';

const SDKConfigureSection: React.FC = () => {
  return (
    <View style={styles.sdkConfigSection}>
      <View style={styles.keyInput}>
        <AppKeyRow />
        <AccessTokenRow />
      </View>

      <View style={styles.buttonArea}>
        <ActionButton
          color={AppColors.Blue}
          text={AppStrings.ExportLogs}
          onPress={function (): void {
            console.log('Pressed');
          }}
        />
        <ActionButton
          color={AppColors.White}
          textColor={AppColors.Black}
          text={AppStrings.ClearLogs}
          onPress={function (): void {
            console.log('Pressed');
          }}
        />
      </View>
    </View>
  );
};

const AppKeyRow: React.FC = () => {
  const context = useContext(AppKeyContext);

  if (!context) {
    throw new Error(
      'InputRowWithContext must be used within an AppKeyProvider'
    );
  }

  const { appKey, setAppKey } = context;

  return (
    <InputRow
      label="Appkey"
      onChangeText={setAppKey} // Using the setText directly
      value={appKey} // Using the text directly
      placeholder="Enter AppKey"
    />
  );
};

const AccessTokenRow: React.FC = () => {
  // const context = useContext(AppKeyContext);

  // if (!context) {
  //     throw new Error('InputRowWithContext must be used within an AppKeyProvider');
  // }

  // const { text, setText } = context;

  return (
    <InputRow
      label="Access Token"
      // onChangeText={setText} // Using the setText directly
      // value={text}           // Using the text directly
      placeholder="Enter Access Token"
    />
  );
};

const styles = StyleSheet.create({
  sdkConfigSection: {
    width: '100%',
    padding: 10,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  keyInput: {
    flex: 4,
  },
  buttonArea: {
    flex: 2,
  },
});

export default SDKConfigureSection;
