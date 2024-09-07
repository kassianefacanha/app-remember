import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

const RadioButtonC = ({ label, value, status, onPress }) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[
                styles.radioContainer, 
                status === 'checked' ? styles.checkedBackground : styles.uncheckedBackground
            ]}
        >
            <View style={styles.radioButtonWrapper}>
                <RadioButton
                    value={value}
                    status={status}
                    onPress={onPress}
                    color="#6750a4"  // Cor do ícone de seleção quando está checked
                    uncheckedColor="#ccc"  // Cor do ícone quando unchecked
                />
            </View>
            <Text style={styles.radioLabel}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        padding: 10,
        borderRadius: 8, 
    },
    radioButtonWrapper: {
        borderRadius: 50,
    },
    checkedBackground: {
        backgroundColor: '#EDE7F6', 
    },

    radioLabel: {
        fontSize: 14,
        color: '#000', 
    }
};

export default RadioButtonC;
