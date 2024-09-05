// src/components/organisms/LoginForm.js
import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';

const LoginForm = ({ 
  username, 
  password, 
  onUsernameChange, 
  onPasswordChange, 
  onSubmit 
}) => {
    const navigation = useNavigation(); 

    return(
      <View style={styles.container}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.image}
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
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Criar Conta" onPress={() => navigation.navigate('Cadastro')} />
          <Button style={styles.button} title="Login" onPress={onSubmit} />
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
    marginTop: 16,
  },
  button: {
    flex: 1, 
    marginHorizontal: 8, 
  },
});

export default LoginForm;
