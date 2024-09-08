import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Drawer, Appbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import UserInfo from './UserInfo';

const Menu = ({ options, activeOption, onOptionSelect, title, navigation }) => {
    const user = useSelector((state) => state.auth.user);

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appbar}>
                <Appbar.Content />
                <Appbar.Action icon="menu" iconColor="white" onPress={() =>  onOptionSelect()} />
            </Appbar.Header>
            <UserInfo user={user} onPressProfile={() => alert('Perfil pressionado!')} navigation={navigation} />
            <Drawer.Section>
                {options.map((option, index) => (
                    <Drawer.Item
                        key={index}
                        label={option.label}
                        active={activeOption === option.value}
                        onPress={() => onOptionSelect(option.value)}
                        icon={option.icon} // Add the icon here
                    />
                ))}
            </Drawer.Section>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '60%',
        height: 850,
    },
    appbar: {
        height: 44,
        backgroundColor: '#6750a4',
        elevation: 0, 
    },
});

export default Menu;
