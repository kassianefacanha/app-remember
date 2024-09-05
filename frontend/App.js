import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import LoginScreen from './src/components/pages/LoginScreen';
import HomeScreen from './src/components/pages/HomeScreen';
import SignupScreen from './src/components/pages/SignupScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            title: 'Login',
            headerStyle: { backgroundColor: '#6750a4' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },}}   />
          <Stack.Screen 
            name="Início" 
            component={HomeScreen}  
            options={{
              title: 'Início',
              headerStyle: { backgroundColor: '#6750a4' },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerLeft: () => (
                <IconButton
                  icon="menu"
                  color="white"
                  size={28}
                  onPress={() => alert('Perfil pressionado!')}
                />
              ),
              headerRight: () => (
                <IconButton
                  icon="logout"
                  color="white"
                  size={28}
                  onPress={() => alert('Sair pressionado!')}
                />
              ),
            }} 
          />
          <Stack.Screen 
           options={{
            title: 'Cadastro',
            headerStyle: { backgroundColor: '#6750a4' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },}}  
            name="Cadastro" 
            component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
