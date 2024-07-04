// src/components/molecules/FormField.js
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import TextInput from '../atoms/TextInput';
import Text from '../atoms/Text';

const FormField = ({ label, value, onChangeText, secureTextEntry }) => (
  <View style={styles.container}>
    <Text>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});

export default FormField;

