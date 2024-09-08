// src/components/pages/ConfigScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TextInput } from 'react-native';
import { Menu } from 'react-native-paper'; // Importa o Menu do react-native-paper
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import BarButton from '../organisms/BarButton';

export default function ConfigScreen() {
  const user = useSelector((state) => state.auth.user);
  const settings = useSelector((state) => state.settings); // Redux state for settings
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [darkTheme, setDarkTheme] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('pt');
  const [languagePickerVisible, setLanguagePickerVisible] = useState(false); // Estado para controlar visibilidade do menu

  const toggleNotifications = () => {
    dispatch({ type: 'TOGGLE_NOTIFICATIONS' });
  };

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
    dispatch({ type: 'TOGGLE_THEME', payload: !darkTheme });
  };

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    dispatch({ type: 'CHANGE_LANGUAGE', payload: language });
  };

  if (!user) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.row}>
        <Text>Notificações</Text>
        <Switch
          onValueChange={toggleNotifications}
        />
      </View>
      
      <View style={styles.row}>
        <Text>Tema Escuro</Text>
        <Switch
          value={darkTheme}
          onValueChange={toggleDarkTheme}
        />
      </View>

      {/* Menu para selecionar idioma */}
      <View style={styles.row}>
        <Text>Idioma</Text>
        <Menu
          visible={languagePickerVisible}
          onDismiss={() => setLanguagePickerVisible(false)}
          anchor={
            <TextInput
              placeholder="Idioma"
              value={selectedLanguage === 'pt' ? 'Português' : 'Inglês'}
              editable={false}
              style={styles.input}
              onPressIn={() => setLanguagePickerVisible(true)}
            />
          }
        >
          {['Português', 'Inglês'].map((option, index) => (
            <Menu.Item
              key={index}
              title={option}
              onPress={() => {
                const value = option === 'Português' ? 'pt' : 'en';
                changeLanguage(value);
                setLanguagePickerVisible(false);
              }}
            />
          ))}
        </Menu>
      </View>
      
      <BarButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: 150,
    textAlign: 'center',
  },
});
