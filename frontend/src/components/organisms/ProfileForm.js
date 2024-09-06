// src/components/organisms/ProfileForm.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import EmergencyContactModal from '../molecules/EmergencyContactModal';
import AddressModal from '../molecules/AddressModal';
import Button from '../atoms/Button';

const ProfileForm = ({
    username,
    email,
    name,
    password,
    confirmPassword,
    onUsernameChange,
    onEmailChange,
    onNameChange,
    onPasswordChange,
    onConfirmPasswordChange,
    onSubmit,
    onSelectPhoto 
}) => {
    const [collapsed, setCollapsed] = useState({
        userInfo: false,
        medicalInfo: false,
        addresses: false,
        emergencyContacts: false,
    });

    const [contacts, setContacts] = useState([]);
    const [addresses, setAddresses] = useState([]);

    const [showEmergencyModal, setShowEmergencyModal] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);

    const toggleCollapse = (section) => {
        setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const handleAddContact = (contact) => {
        setContacts((prev) => [...prev, contact]);
    };

    const handleAddAddress = (address) => {
        setAddresses((prev) => [...prev, address]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <TouchableOpacity onPress={onSelectPhoto}>
                    <IconButton
                        icon="account-circle"
                        size={80}
                        onPress={onSelectPhoto}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>Atualizar Foto</Text>
            </View>

            <TouchableOpacity onPress={() => toggleCollapse('userInfo')}>
                <Text style={styles.sectionHeader}>Informações do Usuário</Text>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed.userInfo}>
                <View style={styles.form}>
                    <TextInput
                        value={username}
                        onChangeText={onUsernameChange}
                        placeholder="Nome de usuário"
                        style={styles.input}
                    />
                    <TextInput
                        value={email}
                        onChangeText={onEmailChange}
                        placeholder="Email"
                        style={styles.input}
                        keyboardType="email-address"
                    />
                    <TextInput
                        value={name}
                        onChangeText={onNameChange}
                        placeholder="Nome"
                        style={styles.input}
                    />
                    <TextInput
                        value={password}
                        onChangeText={onPasswordChange}
                        placeholder="Senha"
                        secureTextEntry
                        style={styles.input}
                    />
                    <TextInput
                        value={confirmPassword}
                        onChangeText={onConfirmPasswordChange}
                        placeholder="Confirmar Senha"
                        secureTextEntry
                        style={styles.input}
                    />
                </View>
            </Collapsible>

            <TouchableOpacity onPress={() => toggleCollapse('medicalInfo')}>
                <Text style={styles.sectionHeader}>Informações Médicas</Text>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed.medicalInfo}>
                <View style={styles.form}>
                    <TextInput placeholder="Idade" style={styles.input} />
                    <TextInput placeholder="Sexo" style={styles.input} />
                    <TextInput placeholder="Tipo Sanguíneo" style={styles.input} />
                    <TextInput placeholder="Alzheimer (Ano de Diagnóstico)" style={styles.input} />
                    <TextInput placeholder="Alergias" style={styles.input} />
                </View>
            </Collapsible>

            <TouchableOpacity onPress={() => toggleCollapse('emergencyContacts')}>
                <Text style={styles.sectionHeader}>Contatos de Emergência</Text>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed.emergencyContacts}>
                <View style={styles.form}>
                    {contacts.map((contact, index) => (
                        <View key={index} style={styles.contactItem}>
                            <Text>{contact.name} - {contact.phone}</Text>
                        </View>
                    ))}
                    <TouchableOpacity onPress={() => setShowEmergencyModal(true)}>
                        <Text style={styles.addButton}>Adicionar Contato</Text>
                    </TouchableOpacity>
                </View>
            </Collapsible>

            <TouchableOpacity onPress={() => toggleCollapse('addresses')}>
                <Text style={styles.sectionHeader}>Endereços</Text>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed.addresses}>
                <View style={styles.form}>
                    {addresses.map((address, index) => (
                        <View key={index} style={styles.addressItem}>
                            <Text>{address}</Text>
                        </View>
                    ))}
                    <TouchableOpacity onPress={() => setShowAddressModal(true)}>
                        <Text style={styles.addButton}>Adicionar Endereço</Text>
                    </TouchableOpacity>
                </View>
            </Collapsible>

            <Button title="Salvar" onPress={onSubmit} />

            <EmergencyContactModal
                visible={showEmergencyModal}
                onClose={() => setShowEmergencyModal(false)}
                onAddContact={handleAddContact}
            />

            <AddressModal
                visible={showAddressModal}
                onClose={() => setShowAddressModal(false)}
                onAddAddress={handleAddAddress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 16,
        color: 'gray',
        marginTop: 8,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#6750a4', // Cor do título das sessões
    },
    form: {
        width: '100%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    addButton: {
        color: '#6750a4', // Cor do botão "Adicionar"
        fontSize: 16,
        marginVertical: 10,
    },
    contactItem: {
        paddingVertical: 8,
    },
    addressItem: {
        paddingVertical: 8,
    },
});

export default ProfileForm;
