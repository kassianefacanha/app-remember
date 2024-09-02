import React from 'react';
import { View, StyleSheet, Alert, Button } from 'react-native';
import LoginForm from '../organisms/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/authSlice';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ username, password })).unwrap();
      navigation.navigate('Home');
    } catch (err) {
      Alert.alert('Erro', `Não foi possível fazer o login: ${error || err.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <LoginForm
        username={username}
        password={password}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
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

export default LoginScreen;
