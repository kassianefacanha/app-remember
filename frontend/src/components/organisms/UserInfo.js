// src/components/organisms/UserInfo.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';


const UserInfo = ({ user, onPressProfile, navigation }) => {

    const handleSettingsPress = () => {
        navigation.navigate('Editar Perfil');
    };

    return (
        <View style={[styles.userInfo, { backgroundColor: 'rgba(103, 80, 164, 0.3)' }]}>
            <IconButton
                icon='account-circle'
                iconColor="black"
                size={80}
            />
            <View style={styles.userDetails}>
                <Text style={styles.greetingText}>Olá</Text>
                <Text style={styles.userName}>{user.name}!</Text>
            </View>
            <IconButton
                icon="cog"
                iconColor="black"
                size={30}
                onPress={handleSettingsPress}
                style={styles.settingsIcon}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 120,
        position: 'relative',
    },
    userDetails: {
        marginLeft: 16,
        justifyContent: 'center',
        flex: 1,
    },
    greetingText: {
        color: 'black',
        fontSize: 18,
    },
    userName: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
    },
    settingsIcon: {
        position: 'absolute',
        right: 16,
    },
});

export default UserInfo;
