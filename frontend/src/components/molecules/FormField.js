// src/components/molecules/FormField.js
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import TextInput from '../atoms/TextInput';
import Text from '../atoms/Text';

const FormField = ({ label, error, value, onChangeText, secureTextEntry }) => (
  <View style={styles.container}>
    <Text>{label}</Text>
    <TextInput
      label={label}
      error={error} 
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
    {error ? <Text style={styles.errorText}>{error}</Text> : null} 
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 2, 
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default FormField;
