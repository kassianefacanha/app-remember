import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';

const SignupForm = ({
  username,
  email,
  name,
  city,
  street,
  neighborhood,
  number,
  cep,
  password,
  confirmPassword,
  onUsernameChange,
  onEmailChange,
  onNameChange,
  onCityChange,
  onStreetChange,
  onNeighborhoodChange,
  onNumberChange,
  onCepChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onCepBlur,
}) => {
  const [step, setStep] = useState(1);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const areFieldsFilled =
      name &&
      email &&
      username &&
      password &&
      confirmPassword &&
      cep &&
      city &&
      street &&
      neighborhood &&
      number;
    
    const arePasswordsEqual = password === confirmPassword;

    setIsNextButtonEnabled(areFieldsFilled && arePasswordsEqual);

    setErrors({
      confirmPassword: arePasswordsEqual ? '' : 'As senhas não coincidem',
    });
  };

  useEffect(() => {
    validateFields();
  }, [
    name,
    cep,
    city,
    street,
    neighborhood,
    number,
    email,
    username,
    password,
    confirmPassword,
  ]);

  const nextStep = () => {
    if (isNextButtonEnabled) {
      setStep(prevStep => prevStep + 1);
    }
  };

  const prevStep = () => setStep(prevStep => prevStep - 1);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.image}
        />

        {step === 1 && (
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
        )}

        {step === 2 && (
          <View>
            <FormField
              label="CEP"
              value={cep}
              onChangeText={onCepChange}
              onBlur={onCepBlur}
            />
            <FormField
              label="Cidade"
              value={city}
              onChangeText={onCityChange}
            />
            <FormField
              label="Rua"
              value={street}
              onChangeText={onStreetChange}
            />
            <FormField
              label="Bairro"
              value={neighborhood}
              onChangeText={onNeighborhoodChange}
            />
            <FormField
              label="Número"
              value={number}
              onChangeText={onNumberChange}
            />
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        {step > 1 && <Button title="Anterior" onPress={prevStep} style={styles.buttonLeft} />}
        <Button
          title={step < 2 ? "Próximo" : "Cadastrar"}
          onPress={step < 2 ? nextStep : onSubmit}
          style={styles.buttonRight}
          disabled={!isNextButtonEnabled}
        />
      </View>
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
    justifyContent: 'space-between',
    padding: 16,
  },
  buttonLeft: {
    alignSelf: 'flex-start',
  },
  buttonRight: {
    alignSelf: 'flex-end',
  },
});

export default SignupForm;
