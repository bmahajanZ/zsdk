import { StyleSheet, Text, View } from 'react-native';

const WebViewSection: React.FC = () => {
  return (
    <View style={styles.webViewSection}>
      <Text>WebView</Text>
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
