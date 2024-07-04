// src/components/atoms/TextInput.js
import * as React from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';

const TextInput = ({ label, value, onChangeText, secureTextEntry }) => (
  <PaperTextInput
    label={label}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
  />
);

export default TextInput;
