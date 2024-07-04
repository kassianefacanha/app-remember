// src/components/organisms/LoginForm.js
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';

const LoginForm = ({ username, password, onUsernameChange, onPasswordChange, onSubmit }) => (
  <View style={styles.container}>
    <FormField
      label="Username"
      value={username}
      onChangeText={onUsernameChange}
    />
    <FormField
      label="Password"
      value={password}
      onChangeText={onPasswordChange}
      secureTextEntry
    />
    <Button title="Login" onPress={onSubmit} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default LoginForm;
