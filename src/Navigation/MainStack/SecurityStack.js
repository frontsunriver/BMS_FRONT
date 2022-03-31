import React, { useEffect, useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Routes from '../Routes';
import useAppTheme from '../../Themes/Context';
import useTranslation from '../../i18n';
import HeaderScreen from '../../Components/HeaderScreen';

import SecurityHome from '../../Screens/Security_home';
import SecurityVisitEntry from '../../Screens/Security_visit_entry/dashboard';
import SecurityVisitEdit from '../../Screens/Security_visit_entry/edit';
import SecurityVisitAdd from '../../Screens/Security_visit_entry/add';

import SecurityArchiveHome from '../../Screens/Security_Archive/dashboard';
import SecurityArchiveDetail from '../../Screens/Security_Archive/detail';

import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

export default props => {
  const {t} = useTranslation();
  const [user, setUser] = useState({});
  useEffect( async () => {
    setUser(JSON.parse(await AsyncStorage.getItem('USER_INFO')));
  }, []);
  return (
    <Stack.Navigator
    initialRouteName={Routes.SECURITY_HOME_SCREEN}>
      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="home" title1={user.first_name + " " + user.last_name}/>)}}
        name={Routes.SECURITY_HOME_SCREEN}
        component={SecurityHome}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="VISIT ENTRY" />)}}
        name={Routes.SECURITY_VISIT_ENTRY_HOME}
        component={SecurityVisitEntry}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="VISIT DETAIL" />)}}
        name={Routes.SECURITY_VISIT_EDIT}
        component={SecurityVisitEdit}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="VISIT ADD" />)}}
        name={Routes.SECURITY_VISIT_ADD}
        component={SecurityVisitAdd}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="ARCHIVE REQUEST" />)}}
        name={Routes.SECURITY_ARCHIVE_HOME}
        component={SecurityArchiveHome}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="ARCHIVE REQUEST" />)}}
        name={Routes.SECURITY_ARCHIVE_DETAIL}
        component={SecurityArchiveDetail}
      />

    </Stack.Navigator>
  );
};
