// src/components/templates/LoginScreen.js
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginForm from '../organisms/LoginForm';

const LoginScreen = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    // Lógica de login aqui
    console.log('Login attempt with:', { username, password });
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
