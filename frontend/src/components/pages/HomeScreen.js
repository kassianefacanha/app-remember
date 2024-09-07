// src/components/pages/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import BarButton from '../organisms/BarButton';
import UserInfo from '../organisms/UserInfo';
import { useNavigation } from '@react-navigation/native';
export default function HomeScreen() {
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation(); 


  if (!user) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <UserInfo user={user} onPressProfile={() => alert('Perfil pressionado!')}  navigation={navigation} />

      <BarButton />

    </View>
  );
}


