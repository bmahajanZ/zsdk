import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { AppColors } from '../Enums/AppColors';

interface ToggleButtonProps {
    text: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ text }) => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: "flex-start" }}>
            <Switch
                value={isToggled}
                onValueChange={handleToggle}
                trackColor={{ false: AppColors.ToggleOff, true: AppColors.ToggleOn }}
                thumbColor={AppColors.White}
            />
            <Text style={{ marginLeft: 10 }}>{text}</Text>
        </View>
    );
};

export default ToggleButton;
