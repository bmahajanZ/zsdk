import { StyleSheet, View } from 'react-native';

const Divider: React.FC = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#dfdce0',
  },
});

export default Divider;
