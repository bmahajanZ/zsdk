import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { ViewStyle, ColorValue } from 'react-native';

interface ActionButtonProps {
  color: ColorValue;
  text: string;
  textColor?: ColorValue;
  style?: ViewStyle;
  onPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  color,
  text,
  textColor = 'white',
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 10,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '400',
  },
});

export default ActionButton;
