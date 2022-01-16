import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateScreen from './src/screens/CreateScreen';
import NoteScreen from './src/screens/NoteScreen';
import ListScreen from './src/screens/ListScreen';

import { store, saga } from './src/redux/store';
import { sagaWatcher } from './src/redux/sagas';

const Stack = createNativeStackNavigator();

saga.run(sagaWatcher);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Заметки" component={ListScreen} />
          <Stack.Screen name="Заметка" component={NoteScreen} />
          <Stack.Screen name="Создать Заметку" component={CreateScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
