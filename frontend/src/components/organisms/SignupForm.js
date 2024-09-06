// src/components/organisms/Singup.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';

const SignupForm = ({
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
}) => {
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const [errors, setErrors] = useState({});

  const validateFieldsStep1 = () => {
    let areFieldsFilled;

    if (
      name.length > 0 &&
      email.length > 0 &&
      username.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
    ) {
      areFieldsFilled = true;
    } else {
      areFieldsFilled = false;
    }

    setIsNextButtonEnabled(areFieldsFilled);
  };

  useEffect(() => {
    validateFieldsStep1();
  }, [
    name,
    email,
    username,
    password,
    confirmPassword,
  ]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.image}
        />

        <View>
          <FormField
            label="Nome"
            value={name}
            onChangeText={onNameChange}
          />
          <FormField
            label="Email"
            value={email}
            onChangeText={onEmailChange}
          />
          <FormField
            label="Usuário"
            value={username}
            onChangeText={onUsernameChange}
          />
          <FormField
            label="Senha"
            value={password}
            onChangeText={onPasswordChange}
            secureTextEntry
          />
          <FormField
            label="Confirmar Senha"
            value={confirmPassword}
            onChangeText={onConfirmPasswordChange}
            secureTextEntry
            error={errors.confirmPassword}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Cadastrar"
            onPress={onSubmit}
            style={styles.button}
            disabled={!isNextButtonEnabled}
          />
        </View>
      </ScrollView>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  formContainer: {
    padding: 16,
    flexGrow: 1,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 16,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    padding: 16,
  },
  button: {
    width: 150, 
  },
});

export default SignupForm;
