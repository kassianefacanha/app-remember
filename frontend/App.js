import * as React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider, IconButton, Modal, Portal, Button } from 'react-native-paper'; // Adicionando Modal e Portal
import { store } from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { logoutUser } from './src/store/authSlice';
import LoginScreen from './src/components/pages/LoginScreen';
import HomeScreen from './src/components/pages/HomeScreen';
import SignupScreen from './src/components/pages/SignupScreen';
import EditProfileScreen from './src/components/pages/EditProfileScreen';
import Menu from './src/components/organisms/Menu'; // Importa o componente Menu


const Stack = createStackNavigator();

const LogoutButton = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.replace('Login');
  };

  return (
    <IconButton
      icon="logout"
      iconColor="white"
      size={28}
      onPress={handleLogout}
    />
  );
};

const App = () => {
  const [menuVisible, setMenuVisible] = React.useState(false); 
  const [active, setActive] = React.useState('first'); 

  const menuOptions = [
    { label: 'First Item', value: 'first' },
    { label: 'Second Item', value: 'second' },
    { label: 'Third Item', value: 'third' },
  ];

  const handleOptionSelect = (value) => {
    setActive(value); 
    setMenuVisible(false); 
  };

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: 'Login',
                headerStyle: { backgroundColor: '#6750a4' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            />
            <Stack.Screen
              name="Início"
              component={HomeScreen}
              options={({ navigation }) => ({
                title: 'Início',
                headerStyle: { backgroundColor: '#6750a4' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
                headerLeft: () => (
                  <IconButton
                    icon="menu"
                    iconColor="white"
                    size={28}
                    onPress={() => setMenuVisible(true)} 
                  />
                ),
                headerRight: () => <LogoutButton navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="Cadastro"
              component={SignupScreen}
              options={{
                title: 'Cadastro',
                headerStyle: { backgroundColor: '#6750a4' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            />
            <Stack.Screen
              name="Editar Perfil"
              component={EditProfileScreen}
              options={{
                title: 'Editar Perfil',
                headerStyle: { backgroundColor: '#6750a4' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            />
          </Stack.Navigator>

          <Portal>
            <Modal visible={menuVisible} onDismiss={() => setMenuVisible(false)}>
              <Menu
                title="Menu"
                options={menuOptions}
                activeOption={active}
                onOptionSelect={handleOptionSelect}
              />
              <Button onPress={() => setMenuVisible(false)}>Fechar Menu</Button>
            </Modal>
          </Portal>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
