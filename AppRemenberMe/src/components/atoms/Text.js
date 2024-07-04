// src/components/atoms/Text.js
import * as React from 'react';
import { Text as PaperText } from 'react-native-paper';

const TextInput = ({ label, variant }) => (
    <PaperText
        variant={variant}
    > {label}
    </PaperText>
);

export default TextInput;
