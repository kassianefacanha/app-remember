// AgendaScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import AgendaList from '../organisms/AgendaList';

const AgendaScreen = () => {
  return (
    <View style={styles.container}>
      <AgendaList/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});

export default AgendaScreen;
