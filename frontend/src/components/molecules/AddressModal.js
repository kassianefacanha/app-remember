import React, { useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Modal, Portal, Button, useTheme, Text } from 'react-native-paper';
import axios from 'axios';

const AddressModal = ({ visible, onClose, onAddAddress }) => {
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [complement, setComplement] = useState('');
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const theme = useTheme();

  const handleAddAddress = () => {
    onAddAddress({ cep, street, number, neighborhood, complement, title, city });
    setCep('');
    setStreet('');
    setNumber('');
    setNeighborhood('');
    setComplement('');
    setTitle('');
    setCity('');
    onClose();
  };

  const handleCepChange = async (cep) => {
    setCep(cep);
    if (cep.length === 8) {
      try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        setStreet(data.logradouro);
        setNeighborhood(data.bairro);
        setCity(data.localidade);
        setComplement(data.complemento);
      } catch (error) {
        console.error('Erro ao buscar endereço:', error);
      }
    }
  };

  const isFormValid = title && cep && street && number && neighborhood && city;

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
              <Text style={styles.title}>Adicionar Endereço</Text>
              <TextInput
                placeholder="Título do Endereço"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
              />
              <TextInput
                placeholder="CEP"
                value={cep}
                onChangeText={handleCepChange}
                keyboardType="numeric"
                maxLength={8}
                style={styles.input}
              />
              <TextInput
                placeholder="Cidade"
                value={city}
                onChangeText={setCity}
                style={styles.input}
              />
              <TextInput
                placeholder="Bairro"
                value={neighborhood}
                onChangeText={setNeighborhood}
                style={styles.input}
              />
              <TextInput
                placeholder="Rua"
                value={street}
                onChangeText={setStreet}
                style={styles.input}
              />
              <TextInput
                placeholder="Número"
                value={number}
                onChangeText={setNumber}
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                placeholder="Complemento"
                value={complement}
                onChangeText={setComplement}
                style={styles.input}
              />

              <View style={styles.buttonContainer}>
                <Button mode="outlined" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  mode="contained"
                  onPress={handleAddAddress}
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

export default AddressModal;
