import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Drawer } from 'react-native-paper';
import { useSelector } from 'react-redux';

const Menu = ({ options, activeOption, onOptionSelect, title }) => {
    const user = useSelector((state) => state.auth.user);

    return (
        <View style={styles.container}>
            <Drawer.Section title={title}>
                {options.map((option, index) => (
                    <Drawer.Item
                        key={index}
                        label={option.label}
                        active={activeOption === option.value}
                        onPress={() => onOptionSelect(option.value)}
                    />
                ))}
            </Drawer.Section>
        </View>
    );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '60%',
        height: height - 80, 
        marginTop: 95, 

    },
});

export default Menu;
