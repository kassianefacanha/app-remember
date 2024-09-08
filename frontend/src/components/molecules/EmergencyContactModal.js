import React, { useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Modal, Portal, Text, Button, useTheme } from 'react-native-paper';

const EmergencyContactModal = ({ visible, onClose, onAddContact }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState(''); 
  const theme = useTheme();

  const handleAddContact = () => {
    onAddContact({ name, phone, relationship }); 
    setName('');
    setPhone('');
    setRelationship(''); 
    onClose();
  };

  const isFormValid = name && phone && relationship;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Adicionar Contato de Emergência</Text>
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
              <TextInput
                placeholder="Parentesco"
                value={relationship}
                onChangeText={setRelationship}
                style={styles.input}
              />
              <View style={styles.buttonContainer}>
                <Button mode="outlined" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  mode="contained"
                  onPress={handleAddContact}
                  disabled={!isFormValid}
                >
                  Adicionar
                </Button>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 8,
    width: '90%',
    maxHeight: '100%', 
    alignSelf: 'center',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  modalContent: {
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
});

export default EmergencyContactModal;
