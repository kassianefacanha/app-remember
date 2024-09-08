// src/components/organisms/MenuModal.js
import React from 'react';
import { Modal, Portal, Button } from 'react-native-paper';
import Menu from './Menu';
import { useNavigation } from '@react-navigation/native';

const MenuModal = ({ visible, onDismiss }) => {
    const navigation = useNavigation(); 
    const menuOptions = [
        { label: 'Editar Perfil', value: 'first' ,  icon: 'account-edit' },
        { label: 'Agenda', value: 'second' ,  icon: 'calendar-multiselect' },
        { label: 'Configurações', value: 'third',  icon: 'cog'  },
    ];

    const handleOptionSelect = (value) => {
        switch (value) {
            case 'first':
                navigation.navigate('Editar Perfil');
                break;
            case 'second':
                navigation.navigate('Agenda');
                break;
            case 'third':
                navigation.navigate('Configurações'); 
                break;
            default:
                break;
        }
        onDismiss();
    };

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss}>
                <Menu
                    activeOption=""
                    title="Menu"
                    options={menuOptions}
                    onOptionSelect={handleOptionSelect}
                    navigation={navigation}
                />
                <Button onPress={onDismiss}>Fechar Menu</Button>
            </Modal>
        </Portal>
    );
};

export default MenuModal;
