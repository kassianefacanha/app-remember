// src/components/molecules/EmergencyContactModal.js
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Modal } from 'react-native';
import { useTheme } from 'react-native-paper';

const EmergencyContactModal = ({ visible, onClose, onAddContact }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const theme = useTheme();

  const handleAddContact = () => {
    onAddContact({ name, phone });
    setName('');
    setPhone('');
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
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Telefone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <Button title="Adicionar" onPress={handleAddContact} />
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

export default EmergencyContactModal;
