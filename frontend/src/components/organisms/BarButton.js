// src/components/organisms/BarButton.js
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BarButton = () => {
    const { bottom } = useSafeAreaInsets();
    const theme = useTheme();

    return (
        <View style={[styles.bottom, { paddingBottom: bottom }]}>
            <Appbar style={styles.appbar}>
                <Appbar.Action 
                    icon={() => <Icon name="camera-alt" size={24} color={theme.colors.primary} />} 
                    onPress={() => { }} 
                />
                <Appbar.Action 
                    icon={() =><Icon name="home" size={24} color={theme.colors.primary} />} 
                    onPress={() => { }} 
                />
                <Appbar.Action 
                    icon={() => <Icon name="mic" size={24} color={theme.colors.primary} />} 
                    onPress={() => { }} 
                />
            </Appbar>
        </View>
    );
};

const styles = StyleSheet.create({
    bottom: {
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 60, 
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    appbar: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 35, 
        height: 60, 
        borderRadius: 28, 
        padding: 8, 
    },
});

export default BarButton;
