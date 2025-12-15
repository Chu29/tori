import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CallsScreen from '@/screens/CallsScreen';
import { useScreenOptions } from '@/hooks/useScreenOptions';

export type CallsStackParamList = {
  CallsList: undefined;
};

const Stack = createNativeStackNavigator<CallsStackParamList>();

export default function CallsStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="CallsList"
        component={CallsScreen}
        options={{
          headerTitle: 'Calls',
        }}
      />
    </Stack.Navigator>
  );
}
