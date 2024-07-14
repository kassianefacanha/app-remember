// src/components/templates/LoginScreen.js
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginForm from '../organisms/LoginForm';
import axios from 'axios';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users', {
        username,
        password,
      });
      console.log(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer o login');
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
