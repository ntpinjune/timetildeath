import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './src/context/UserContext';
import { AgeInput } from './src/screens/Onboarding/AgeInput';
import { LifeProgress } from './src/screens/Onboarding/LifeProgress';
import { TimeLeft } from './src/screens/Onboarding/TimeLeft';
import { GoalInput } from './src/screens/Onboarding/GoalInput';
import { GoalList } from './src/screens/Dashboard/GoalList';
import { GoalDetail } from './src/screens/Dashboard/GoalDetail';
import { COLORS } from './src/constants/theme';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: COLORS.background },
          }}
          initialRouteName="AgeInput"
        >
          <Stack.Screen name="AgeInput" component={AgeInput} />
          <Stack.Screen name="LifeProgress" component={LifeProgress} />
          <Stack.Screen name="TimeLeft" component={TimeLeft} />
          <Stack.Screen name="GoalInput" component={GoalInput} />
          <Stack.Screen name="Dashboard" component={GoalList} />
          <Stack.Screen name="GoalDetail" component={GoalDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
