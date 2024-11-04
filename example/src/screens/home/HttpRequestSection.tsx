import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import InputRow from '../../components/InputRow';
import ActionButton from '../../components/ActionButton';
import { AppStrings } from '../../Enums/AppStrings';
import { AppColors } from '../../Enums/AppColors';
import type React from 'react';
import { useContext, useState } from 'react';
import { RequestContext, RequestType } from '../../contexts/RequestContext';
import { fetchData } from '../../api/ApiService';

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

      <Modal transparent={true} visible={dropdownVisible} animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={toggleModal}>
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => selectOption(item)}
                >
                  <Text style={styles.option}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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

  dropDownBox: { flex: 1, zIndex: 10 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    width: 200,
    backgroundColor: AppColors.White,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});

export default HttpRequestSection;
