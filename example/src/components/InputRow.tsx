import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import type { TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { AppColors } from '../Enums/AppColors';

interface InputRowProps extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
}

const InputRow: React.FC<InputRowProps> = ({
  label,
  containerStyle,
  labelStyle,
  inputStyle,
  ...inputProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null} 
      <TextInput
        style={[styles.input, inputStyle]}
        {...inputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  label: {
    fontSize: 16,
    fontWeight: '500', 
  },
  input: {
    height: 40,
    borderColor: AppColors.BorderColor,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default InputRow;
