import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import RadioButtonC from '../atoms/RadioButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Collapsible from 'react-native-collapsible';
import EmergencyContactModal from '../molecules/EmergencyContactModal';
import AddressModal from '../molecules/AddressModal';
import Button from '../atoms/Button';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { Image } from 'react-native';

const ProfileForm = ({
    username,
    email,
    name,
    onUsernameChange,
    onEmailChange,
    onNameChange,
    onSubmit,
}) => {
    const [collapsed, setCollapsed] = useState({
        userInfo: false,
        additionalInfo: false,
        addresses: false,
        emergencyContacts: false,
    });

    const [contacts, setContacts] = useState([]);
    const [addresses, setAddresses] = useState([]);

    const [showEmergencyModal, setShowEmergencyModal] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);

    const [searchContact, setSearchContact] = useState('');
    const [searchAddress, setSearchAddress] = useState('');

    const [alzheimerStatus, setAlzheimerStatus] = useState(null);
    const [alzheimerYear, setAlzheimerYear] = useState('');
    const [allergyStatus, setAllergyStatus] = useState(null);
    const [allergyDetails, setAllergyDetails] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [gender, setGender] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [genderPickerVisible, setGenderPickerVisible] = useState(false);
    const [bloodTypePickerVisible, setBloodTypePickerVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); 

    const onSelectPhoto = (uri) => {
        if (uri) {
            console.log("URI da imagem selecionada:", uri); 
            setSelectedImage(uri); 
        } else {
            console.error("URI está indefinido ou inválido.");
        }
    };

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissão Necessária', 'Precisamos de permissão para acessar suas fotos.');
            }
        })();
    }, []);

    const handleSelectPhoto = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const selectedImageUri = result.assets[0].uri;
                onSelectPhoto(selectedImageUri); 
            } else {
                console.log('A seleção de imagem foi cancelada ou não há imagem disponível.');
            }
        } catch (error) {
            console.error('Erro ao selecionar imagem:', error);
        }
    };



    const toggleCollapse = (section) => {
        setCollapsed((prev) => {
            const newCollapseState = { ...prev, [section]: !prev[section] };
            // Hide other sections when one is opened
            for (const key in newCollapseState) {
                if (key !== section) {
                    newCollapseState[key] = false;
                }
            }
            return newCollapseState;
        });
    };
    const formatDate = (input) => {

        const numbers = input.replace(/\D/g, '');
        const day = numbers.slice(0, 2);
        const month = numbers.slice(2, 4);
        const year = numbers.slice(4, 8);
        if (year.length > 0) return `${day}/${month}/${year}`;
        if (month.length > 0) return `${day}/${month}`;
        return day;
    };

    const handleAddContact = (contact) => {
        setContacts((prev) => [...prev, contact]);
        setShowEmergencyModal(false);
    };

    const handleAddAddress = (address) => {
        setAddresses((prev) => [...prev, address]);
        setShowAddressModal(false); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>

                <TouchableOpacity onPress={handleSelectPhoto}>
                    {selectedImage ? (
                        <Image source={{ uri: selectedImage }} style={styles.avatar} />
                    ) : (
                        <View style={styles.placeholderAvatar}>
                            <IconButton
                                icon="account-circle"
                                size={135}
                                onPress={handleSelectPhoto}
                            />
                        </View>
                    )}
                </TouchableOpacity>
                <Text style={styles.headerText}>Atualizar Foto</Text>
            </View>

            <TouchableOpacity onPress={() => toggleCollapse('userInfo')}>
                <View style={styles.sectionHeaderContainer}>
                    <Text style={styles.sectionHeader}>Informações do Usuário</Text>
                    <MaterialCommunityIcons
                        name={collapsed.userInfo ? 'chevron-up' : 'chevron-down'}
                        size={24}
                        color="#6750a4"
                    />
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={!collapsed.userInfo}>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={onUsernameChange}
                        placeholder="Nome de usuário"

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
                </View>
            </Collapsible>

            <TouchableOpacity onPress={() => toggleCollapse('additionalInfo')}>
                <View style={styles.sectionHeaderContainer}>
                    <Text style={styles.sectionHeader}>Informações Adicionais</Text>
                    <MaterialCommunityIcons
                        name={collapsed.additionalInfo ? 'chevron-up' : 'chevron-down'}
                        size={24}
                        color="#6750a4"
                    />
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={!collapsed.additionalInfo}>
                <View style={styles.form}>
                    <View style={styles.row}>
                        <View style={styles.pickerContainer}>
                            <Menu
                                visible={genderPickerVisible}
                                onDismiss={() => setGenderPickerVisible(false)}
                                anchor={<TextInput
                                    placeholder="Sexo"
                                    value={gender}
                                    editable={false}
                                    style={styles.input}
                                    onPressIn={() => setGenderPickerVisible(true)}
                                />}
                            >
                                {['Mulher Cis', 'Mulher Trans', 'Homem Cis', 'Homem Trans', 'Não-binário', 'Gênero Fluido', 'Agênero', 'Bigênero', 'Outros'].map((option, index) => (
                                    <Menu.Item
                                        style={styles.menuItem}
                                        key={index}
                                        title={option}
                                        onPress={() => {
                                            setGender(option);
                                            setGenderPickerVisible(false);
                                        }}
                                    />
                                ))}
                            </Menu>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Menu
                                visible={bloodTypePickerVisible}
                                onDismiss={() => setBloodTypePickerVisible(false)}
                                anchor={<TextInput
                                    placeholder="Tipo Sanguíneo"
                                    value={bloodType}
                                    editable={false}
                                    style={styles.input}
                                    onPressIn={() => setBloodTypePickerVisible(true)}
                                />}
                            >
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((option, index) => (
                                    <Menu.Item
                                        style={styles.menuItem}
                                        key={index}
                                        title={option}
                                        onPress={() => {
                                            setBloodType(option);
                                            setBloodTypePickerVisible(false);
                                        }}
                                    />
                                ))}
                            </Menu>
                        </View>
                    </View>
                    <TextInput
                        placeholder="Data de Nascimento"
                        style={styles.input}
                        value={birthDate}
                        onChangeText={(text) => setBirthDate(formatDate(text))}
                        keyboardType="numeric"
                        maxLength={10}
                    />
                    <View style={styles.radioGroupContainer}>
                        <Text style={styles.radioGroupLabel}>Tem Alzheimer?</Text>
                        <View style={styles.radioGroup}>
                            <RadioButtonC
                                label="Sim"
                                value="sim"
                                status={alzheimerStatus === 'sim' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setAlzheimerStatus('sim');
                                    setAlzheimerYear(''); // Limpar ano se marcar 'Sim'
                                }}
                            />
                            <RadioButtonC
                                label="Não"
                                value="não"
                                status={alzheimerStatus === 'não' ? 'checked' : 'unchecked'}
                                onPress={() => setAlzheimerStatus('não')}
                            />
                        </View>
                    </View>
                    {
                        alzheimerStatus === 'sim' && (
                            <TextInput
                                placeholder="Ano do Diagnóstico"
                                style={styles.input}
                                value={alzheimerYear}
                                onChangeText={setAlzheimerYear}
                            />
                        )
                    }
                    <View style={styles.radioGroupContainer}>
                        <Text style={styles.radioGroupLabel}>Tem Alergias?</Text>
                        <View style={styles.radioGroup}>
                            <RadioButtonC
                                label="Sim"
                                value="sim"
                                status={allergyStatus === 'sim' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setAllergyStatus('sim');
                                    setAllergyDetails('');
                                }}
                            />
                            <RadioButtonC
                                label="Não"
                                value="não"
                                status={allergyStatus === 'não' ? 'checked' : 'unchecked'}
                                onPress={() => setAllergyStatus('não')}
                            />
                        </View>
                    </View>
                    {
                        allergyStatus === 'sim' && (
                            <TextInput
                                placeholder="Detalhes sobre Alergias"
                                style={styles.input}
                                value={allergyDetails}
                                onChangeText={setAllergyDetails}
                            />
                        )
                    }
                    <TextInput
                        placeholder="Informações Adicionais"
                        style={[styles.input, styles.largeInput]}
                        multiline
                        numberOfLines={4}
                        value={additionalInfo}
                        onChangeText={setAdditionalInfo}
                    />
                </View >
            </Collapsible >

            <TouchableOpacity onPress={() => toggleCollapse('emergencyContacts')}>
                <View style={styles.sectionHeaderContainer}>
                    <Text style={styles.sectionHeader}>Contatos de Emergência</Text>
                    <MaterialCommunityIcons
                        name={collapsed.emergencyContacts ? 'chevron-up' : 'chevron-down'}
                        size={24}
                        color="#6750a4"
                    />
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={!collapsed.emergencyContacts}>
                <View style={styles.form}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            value={searchContact}
                            onChangeText={setSearchContact}
                            placeholder=" Buscar contato..."
                            style={styles.searchInput}
                        />
                        <TouchableOpacity style={styles.addButton} onPress={() => setShowEmergencyModal(true)}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    {contacts.length > 0 ? (
                        contacts.map((contact, index) => (
                            <View key={index} style={styles.contactItem}>
                                <View style={styles.contactBar} />
                                <View style={styles.contactContent}>
                                    <Text style={styles.titleList}>{contact.relationship}</Text>
                                    <Text style={styles.infoList}>{contact.name} - {contact.phone}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noDataText}>Nenhum contato adicionado.</Text>
                    )}
                </View>
            </Collapsible>

            <TouchableOpacity onPress={() => toggleCollapse('addresses')}>
                <View style={styles.sectionHeaderContainer}>
                    <Text style={styles.sectionHeader}>Endereços</Text>
                    <MaterialCommunityIcons
                        name={collapsed.addresses ? 'chevron-up' : 'chevron-down'}
                        size={24}
                        color="#6750a4"
                    />
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={!collapsed.addresses}>
                <View style={styles.form}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            value={searchAddress}
                            onChangeText={setSearchAddress}
                            placeholder=" Buscar endereço..."
                            style={styles.searchInput}
                        />
                        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddressModal(true)}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    {addresses.length > 0 ? (
                        addresses.map((address, index) => (
                            <View key={index} style={styles.addressItem}>
                                <View style={styles.addressBar} />
                                <View style={styles.addressContent}>
                                    <Text style={styles.titleList}>{address.title}</Text>
                                    <Text style={styles.infoList}>{address.street}, {address.number}, {address.neighborhood}, {address.city}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noDataText}>Nenhum endereço adicionado.</Text>
                    )}
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
        </View >
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
    sectionHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#6750a4',
    },
    form: {
        width: '100%',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 12,
    },
    halfInput: {
        flex: 1,
        marginRight: 8,
    },
    row: {
        flexDirection: 'row',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#6750a4',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
        marginBottom: 8,
    },
    pickerContainer: {
        flex: 1,
        marginRight: 8,
    },
    addButtonText: {
        color: 'white',
        fontSize: 20,
    },
    titleList: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoList: {
        fontSize: 14,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 12,
    },
    addressItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 12,
    },
    contactBar: {
        width: 4,
        height: '100%',
        backgroundColor: '#6750a4',
        marginRight: 12,
    },
    addressBar: {
        width: 4,
        height: '100%',
        backgroundColor: '#6750a4',
        marginRight: 12,
    },
    noDataText: {
        color: 'gray',
        textAlign: 'center',
        marginVertical: 10,
    },
    radioGroupLabel: {
        fontSize: 16,
        marginVertical: 10,
        color: '#6750a4',
    },
    radioGroupContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    radioGroup: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: 10,
    },
    largeInput: {
        height: 100,
        marginTop: 10,
        textAlignVertical: 'top',
    },
    menuItem: {
        width: 150,
        backgroundColor: '#f0f0f0',

    },
    menu: {
        backgroundColor: 'white',
    }, avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#6750a4',
    },
    placeholderAvatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#6750a4',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
    },
    placeholderText: {
        color: '#888',
        fontSize: 14,
    },

});

export default ProfileForm;

