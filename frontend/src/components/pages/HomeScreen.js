import * as React from 'react';
import { Avatar, Banner, Text } from 'react-native-paper';
import BarButton from '../organisms/BarButton';
import { View, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>

      <View style={styles.userInfo}>
        <Avatar.Image size={64} source={{ uri: 'https://example.com/user.png' }} />
        <View style={styles.userDetails}>
          <Banner visible={true} actions={[]}>
            <Text>Nome do Usuário</Text>
          </Banner>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <BarButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  userDetails: {
    marginLeft: 16,
  },
});
