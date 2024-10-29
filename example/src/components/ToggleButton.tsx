import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { AppColors } from '../Enums/AppColors';

interface ToggleButtonProps {
  text: string;
  onValueChange?: (isToggled: boolean) => void;
  failed?: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  text,
  onValueChange,
  failed,
}) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  useEffect(() => {
    if (failed) {
      setIsToggled(false);
    }
  }, [failed]);

  const handleToggle = (value: boolean) => {
    if (onValueChange) {
      onValueChange(value);
    }
    setIsToggled(value);
  };

  return (
    <View style={styles.switch}>
      <Switch
        value={isToggled}
        onValueChange={handleToggle}
        trackColor={{ false: AppColors.ToggleOff, true: AppColors.ToggleOn }}
        thumbColor={AppColors.White}
      />
      <Text style={styles.label}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  label: {
    marginLeft: 10,
  },
});

export default ToggleButton;
