// src/components/molecules/AddressModal.js
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Modal } from 'react-native';
import { useTheme } from 'react-native-paper';

const AddressModal = ({ visible, onClose, onAddAddress }) => {
  const [address, setAddress] = useState('');
  const theme = useTheme();

  const handleAddAddress = () => {
    onAddAddress(address);
    setAddress('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.modal}>
          <TextInput
            placeholder="Endereço"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
          <Button title="Adicionar" onPress={handleAddAddress} />
          <Button title="Cancelar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default AddressModal;
