import { StyleSheet, Text, View } from 'react-native';
import { RequestContext } from '../../contexts/RequestContext';
import { useContext } from 'react';

const WebViewSection: React.FC = () => {
  const context = useContext(RequestContext);

  if (!context) {
    throw new Error('RequestContext must be used within an RequestProvider');
  }

  const { data } = context;
  return (
    <View style={styles.webViewSection}>
      <Text>{data ? data : 'WebView'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  webViewSection: {
    flex: 6,
    backgroundColor: 'beige',
  },
});

export default WebViewSection;
