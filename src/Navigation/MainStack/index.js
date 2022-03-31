/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Routes from '../Routes';
import MainStack from './MainStack';
import AssociationStack from './AssociationStack';
import SecurityStack from './SecurityStack';
import DrawerScreen from '../../Screens/Drawer';
import AssociationDrawerScreen from '../../Screens/Drawer/AssociationDrawer';
import SecurityDrawer from '../../Screens/Drawer/SecurityDrawer';
import metrics from '../../Themes/Metrics';
import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();

export default props => {
  const [user, setUser] = useState({});
  useEffect( async () => {
    setUser(JSON.parse(await AsyncStorage.getItem('USER_INFO')));
    console.log(await AsyncStorage.getItem('USER_INFO'));
  }, []);

  const returnStack = () => {
    if(user.type == 1) {
      return (
        <Drawer.Navigator
          drawerPosition={'left'}
          drawerType={'slide'}
          edgeWidth={5}
          screenOptions={{
            headerShown: false,
          }}
          drawerStyle={{
            width: metrics.drawerWidth,
          }}
          drawerContent={DrawerScreen}>
          <Drawer.Screen name={Routes.HOME_STACK} component={MainStack} />
        </Drawer.Navigator>
      )
    } else {
      if(user.role == 2) {
        console.log("-----------------------------------------" + user.role);
        return (
          <Drawer.Navigator
            drawerPosition={'left'}
            drawerType={'slide'}
            edgeWidth={5}
            screenOptions={{
              headerShown: false,
            }}
            drawerStyle={{
              width: metrics.drawerWidth,
            }}
            drawerContent={AssociationDrawerScreen}>
            <Drawer.Screen name={Routes.ASSOCIATION_HOME_STACK} component={AssociationStack} />
          </Drawer.Navigator>
        )
      } else {
        console.log("********************************************" + user.role);
        return (
          <Drawer.Navigator
            drawerPosition={'left'}
            drawerType={'slide'}
            edgeWidth={5}
            screenOptions={{
              headerShown: false,
            }}
            drawerStyle={{
              width: metrics.drawerWidth,
            }}
            drawerContent={SecurityDrawer}>
            <Drawer.Screen name={Routes.SECURITY_HOME_STACK} component={SecurityStack} />
          </Drawer.Navigator>
        )
      }
      
    }
  }
  return (
    returnStack()
  );
};
