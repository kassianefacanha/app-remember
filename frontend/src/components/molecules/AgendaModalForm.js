import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AgendaModalForm = ({ isVisible, onClose, onSave }) => {
  const [eventDate, setEventDate] = useState('');
  const [eventName, setEventName] = useState('');

  const handleSave = () => {
    if (eventDate && eventName) {
      onSave(eventDate, eventName);
      setEventDate('');
      setEventName('');
    }
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.label}>Data do Evento (YYYY-MM-DD):</Text>
          <TextInput
            style={styles.input}
            value={eventDate}
            onChangeText={setEventDate}
            placeholder="2024-09-07"
          />
          <Text style={styles.label}>Nome do Evento:</Text>
          <TextInput
            style={styles.input}
            value={eventName}
            onChangeText={setEventName}
            placeholder="Nome do Evento"
          />
          <Button title="Salvar" onPress={handleSave} />
          <Button title="Cancelar" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
    fontSize: 16,
    padding: 8,
  },
});

export default AgendaModalForm;
