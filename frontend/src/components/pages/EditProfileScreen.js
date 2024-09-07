// src/components/pages/EditProfileScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import ProfileForm from '../organisms/ProfileForm'; // Componente de formulário para edição
import AlertCustom from '../atoms/AlertCustom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/authSlice'; // Ação para atualizar o usuário
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { user, error } = useSelector((state) => state.auth);

    const [username, setUsername] = useState(user.username || '');
    const [email, setEmail] = useState(user.email || '');
    const [name, setName] = useState(user.name || '');
    const [cep, setCep] = useState(user.cep || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ title: '', message: '' });

    useEffect(() => {
        // Atualiza o estado quando o usuário muda
        if (user) {
            setUsername(user.username);
            setEmail(user.email);
            setName(user.name);
            setCep(user.cep);
        }
    }, [user]);

    const handleUpdate = async () => {
        try {
            await dispatch(updateUser({
                username,
                email,
                name,
                cep,
                password
            })).unwrap();
            setAlertMessage({ title: 'Sucesso', message: 'Perfil atualizado com sucesso!' });
            setAlertVisible(true);
        } catch (err) {
            setAlertMessage({ title: 'Erro', message: `Não foi possível atualizar o perfil: ${error || err.message}` });
            setAlertVisible(true);
        }
    };

    const handleAlertClose = () => {
        setAlertVisible(false);
        navigation.goBack(); // Volta para a tela anterior após fechar o alerta
    };
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
                <ProfileForm
                    username={username}
                    email={email}
                    name={name}
                    cep={cep}
                    password={password}
                    confirmPassword={confirmPassword}
                    onUsernameChange={setUsername}
                    onEmailChange={setEmail}
                    onNameChange={setName}
                    onCepChange={setCep}
                    onPasswordChange={setPassword}
                    onConfirmPasswordChange={setConfirmPassword}
                    onSubmit={handleUpdate}
                />

                <AlertCustom
                    visible={alertVisible}
                    title={alertMessage.title}
                    message={alertMessage.message}
                    onClose={handleAlertClose}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
    },
});

export default EditProfileScreen;
