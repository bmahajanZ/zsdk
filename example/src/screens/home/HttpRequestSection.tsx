import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InputRow from '../../components/InputRow';
import ActionButton from '../../components/ActionButton';
import { AppStrings } from '../../Enums/AppStrings';
import { AppColors } from '../../Enums/AppColors';
import type React from 'react';
import { useContext, useState } from 'react';
import { RequestContext, RequestType } from '../../contexts/RequestContext';
import { fetchData } from '../../services/ApiService';

const HttpRequestSection: React.FC = () => {
  return (
    <View style={styles.httpRequestSection}>
      <InputUrl />
      <View style={styles.requestButtonRow}>
        <HttpMethodSelectBtn />
        <GoBtn />
        <ActionButton
          color={AppColors.Blue}
          text={AppStrings.Options}
          style={styles.requestButton}
          onPress={function (): void {
            console.log('Pressed Options');
          }}
        />
      </View>
    </View>
  );
};

const InputUrl: React.FC = () => {
  const context = useContext(RequestContext);

  if (!context) {
    throw new Error('RequestContext must be used within an RequestProvider');
  }

  const { url, setUrl } = context;

  return (
    <View style={styles.requestInput}>
      <InputRow
        value={url}
        onChangeText={setUrl}
        label={''}
        placeholder="about:blank"
      />
    </View>
  );
};

const HttpMethodSelectBtn: React.FC = () => {
  const context = useContext(RequestContext);

  if (!context) {
    throw new Error('RequestContext must be used within an RequestProvider');
  }

  // const { requestType, setRequestType } = context;
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { requestType, setRequestType } = context;

  const options = Object.values(RequestType);

  const toggleModal = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectOption = (option: RequestType) => {
    setRequestType(option);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.dropDownBox}>
      <ActionButton
        color={AppColors.Blue}
        text={requestType}
        style={styles.requestButton}
        onPress={toggleModal}
      />
      {dropdownVisible && (
        <View style={styles.dropdownContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => selectOption(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const GoBtn: React.FC = () => {
  const context = useContext(RequestContext);

  if (!context) {
    throw new Error('RequestContext must be used within an RequestProvider');
  }

  const { url, requestType, setData } = context;
  return (
    <ActionButton
      color={AppColors.Blue}
      text={AppStrings.SubmitRequest}
      style={styles.requestButton}
      onPress={async function (): Promise<void> {
        var dataToDisplay = '';
        try {
          const { data } = await fetchData(url, requestType);
          console.log('Received data:' + data);
          dataToDisplay = data;
        } catch (error) {
          console.log('Api error:' + error);
          dataToDisplay = 'Some error occured, refer console for more details';
        }
        setData(dataToDisplay);
      }}
    />
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

  dropDownBox: { flex: 1 },
  dropdownContainer: {
    position: 'absolute',
    top: 50, // Adjust based on your layout
    width: 150,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    zIndex: 1,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default HttpRequestSection;
