// src/components/atoms/Button.js
import * as React from 'react';
import { Button as PaperButton } from 'react-native-paper';

const Button = ({ title, onPress, disabled , style}) => (
  <PaperButton 
  style={style}
  disabled={disabled}
  mode="contained" 
  onPress={onPress}>
    {title}
  </PaperButton>
);

export default Button;
