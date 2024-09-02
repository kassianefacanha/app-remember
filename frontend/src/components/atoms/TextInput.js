// src/components/atoms/TextInput.js
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

const TextInput = ({ label, error, value, onChangeText, secureTextEntry }) => (
  <PaperTextInput
    label={label}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    style={error ? styles.errorInput : undefined} 
    error={Boolean(error)} 
  />
);

const styles = StyleSheet.create({
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
});

export default TextInput;
