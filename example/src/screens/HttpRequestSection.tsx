import { StyleSheet, View } from 'react-native';
import InputRow from '../components/InputRow';
import ActionButton from '../components/ActionButton';
import { AppStrings } from '../Enums/AppStrings';
import { AppColors } from '../Enums/AppColors';

const HttpRequestSection: React.FC = () => {
  return (
    <View style={styles.httpRequestSection}>
      <View style={styles.requestInput}>
        <InputRow label={''} placeholder="about:blank" />
      </View>

      <View style={styles.requestButtonRow}>
        <ActionButton
          color={AppColors.Blue}
          text={AppStrings.RequestMethodGET}
          style={styles.requestButton}
          onPress={function (): void {
            console.log('Pressed');
          }}
        />
        <ActionButton
          color={AppColors.Blue}
          text={AppStrings.SubmitRequest}
          style={styles.requestButton}
          onPress={function (): void {
            console.log('Pressed');
          }}
        />
        <ActionButton
          color={AppColors.Blue}
          text={AppStrings.Options}
          style={styles.requestButton}
          onPress={function (): void {
            console.log('Pressed');
          }}
        />
      </View>
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

  // ///////
  httpRequestSection: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  requestInput: {
    flex: 1,
    flexDirection: 'column',
  },
  requestButtonRow: {
    flex: 1,
    flexDirection: 'row',
  },
  requestButton: {
    flex: 1,
    margin: 4,
  },
  // ///////

  webViewSection: {
    flex: 6,
    backgroundColor: 'beige',
  },
});

export default HttpRequestSection;
