import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import SignupForm from '../organisms/SignupForm';
import AlertCustom from '../atoms/AlertCustom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../store/authSlice';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation(); 
    const { error } = useSelector((state) => state.auth);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [cep, setCep] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ title: '', message: '' });

    const handleSignup = async () => {
        try {
            await dispatch(signupUser({
                username,
                email,
                name,
                cep,
                password
            })).unwrap();
            navigation.navigate('Login');
            setAlertMessage({ title: 'Sucesso', message: 'Cadastro realizado com sucesso!' });
            setAlertVisible(true);
        } catch (err) {
            setAlertMessage({ title: 'Erro', message: `Não foi possível realizar o cadastro: ${error || err.message}` });
            setAlertVisible(true);
        }
    };

    const handleAlertClose = () => {
        setAlertVisible(false);
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
                <SignupForm
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
                    onSubmit={handleSignup}
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

export default SignupScreen;
