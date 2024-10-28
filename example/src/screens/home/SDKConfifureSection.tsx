import { StyleSheet, View } from "react-native"
import InputRow from "../../components/InputRow"
import ActionButton from "../../components/ActionButton"
import { AppColors } from "../../Enums/AppColors"
import { AppStrings } from "../../Enums/AppStrings"

const SDKConfigureSection: React.FC = () => {
    return (
        <View style={styles.sdkConfigSection}>
            <View style={styles.keyInput}>
                <InputRow label='Appkey' />
                <InputRow label='Access Token' />

            </View>

            <View style={styles.buttonArea}>
                <ActionButton
                    color={AppColors.Blue}
                    text={AppStrings.ExportLogs}
                    onPress={
                        function (): void {
                            console.log("Pressed")
                        }
                    } />
                <ActionButton
                    color={AppColors.White}
                    textColor={AppColors.Black}
                    text={AppStrings.ClearLogs} onPress={
                        function (): void {
                            console.log("Pressed")
                        }
                    } />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sdkConfigSection: {
        width: "100%",
        padding: 10,
        flex: 2,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    keyInput: {
        flex: 4,
    },
    buttonArea: {
        flex: 2
    },
});


export default SDKConfigureSection;