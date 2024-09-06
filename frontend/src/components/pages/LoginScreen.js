// src/components/pages/LoginScreen.js
import React from 'react';
import { StyleSheet, Alert,  KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import LoginForm from '../organisms/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/authSlice';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); 
  const { status, error } = useSelector((state) => state.auth);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ username, password })).unwrap();
      navigation.navigate('Início');
    } catch (err) {
      Alert.alert('Erro', `Não foi possível fazer o login: ${error || err.message}`);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <LoginForm
          username={username}
          password={password}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          onSubmit={handleLogin}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default LoginScreen;
