import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import SignupForm from '../organisms/SignupForm';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../store/authSlice';
import axios from 'axios'; 

const SignupScreen = () => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [number, setNumber] = useState('');
    const [cep, setCep] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async () => {
        try {
            await dispatch(signupUser({
                username,
                email,
                name,
                city,
                street,
                neighborhood,
                number,
                cep,
                password
            })).unwrap();
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        } catch (err) {
            Alert.alert('Erro', `Não foi possível realizar o cadastro: ${error || err.message}`);
        }
    };


    const handleCepBlur = async () => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const data = response.data;
            if (data && !data.erro) {
                setCity(data.localidade);
                setStreet(data.logradouro);
                setNeighborhood(data.bairro);
            } else {
                Alert.alert('Erro', 'CEP não encontrado.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao buscar o CEP.');
            console.error('Erro ao buscar o CEP:', error);
        }
    };

    return (
        <View style={styles.container}>
            <SignupForm
                username={username}
                email={email}
                name={name}
                city={city}
                street={street}
                neighborhood={neighborhood}
                number={number}
                cep={cep}
                password={password}
                confirmPassword={confirmPassword}
                onUsernameChange={setUsername}
                onEmailChange={setEmail}
                onNameChange={setName}
                onCityChange={setCity}
                onStreetChange={setStreet}
                onNeighborhoodChange={setNeighborhood}
                onNumberChange={setNumber}
                onCepChange={setCep}
                onPasswordChange={setPassword}
                onConfirmPasswordChange={setConfirmPassword}
                onSubmit={handleSignup}
                onCepBlur={handleCepBlur}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
});

export default SignupScreen;
