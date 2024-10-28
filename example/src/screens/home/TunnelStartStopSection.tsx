import { StyleSheet, Text, View } from "react-native"
import ToggleButton from "../../components/ToggleButton"

const TunnelStartStopSection: React.FC = () => {
    return (
        <View style={styles.tunnelStartStopSection}>
            <View style={styles.tunnelToggle}>
                <ToggleButton text='Pre Login Tunnel' />
                <ToggleButton text='Zero Trust Tunnel' />
            </View>
            <View style={styles.status}>
                <Text> Status ... </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    // ///////
    tunnelStartStopSection: {
        width: "100%",
        padding: 10,
        flex: 1.5,
        flexDirection: 'row',
    },
    tunnelToggle: {
        flex: 1,
        justifyContent: "space-evenly",
    },
    status: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
});

export default TunnelStartStopSection;