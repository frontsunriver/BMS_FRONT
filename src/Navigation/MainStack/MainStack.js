import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabStack from './BottomStack';
import Routes from '../Routes';
import useAppTheme from '../../Themes/Context';
import useTranslation from '../../i18n';
import NavigationStyles from '../../Styles/NavigationStyles';
import AsyncStorage from '@react-native-community/async-storage';

import HeaderScreen from '../../Components/HeaderScreen';

import Home from '../../Screens/Home';

import ChargeDetail from '../../Screens/ChargeDetail';

import NocMoveIn from '../../Screens/Noc_move_in';
import NocMoveInDashboard from '../../Screens/Noc_move_in/dashboard';
import MoveInEdit from '../../Screens/Noc_move_in/edit';

import NocMoveOutDashboard from '../../Screens/Noc_move_out/dashboard';
import NocMoveOut from '../../Screens/Noc_move_out';
import MoveOutEdit from '../../Screens/Noc_move_out/edit';

import NocMaintenanceDashboard from '../../Screens/Noc_maintenance/dashboard';
import NocMaintenance from '../../Screens/Noc_maintenance';
import MaintenanceEdit from '../../Screens/Noc_maintenance/edit';

import ReportIssuesDashboard from '../../Screens/Report_issue/dashboard';
import ReportIssues from '../../Screens/Report_issue';
import ReportIssuesDetail from '../../Screens/Report_issue/detail';

import MessageDashboard from '../../Screens/Messages/dashboard';
import Message from '../../Screens/Messages';
import MessageDetail from '../../Screens/Messages/detail';

import Settings from '../../Screens/Settings';

import MoveDetail from '../../Screens/Move_response';

const HomeStackScreen = () => {
  const {t} = useTranslation();
  const {theme} = useAppTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        // options={{
        //   title: t('home'),
        //   headerStyle: [
        //     {backgroundColor: theme.colors.header},
        //   ],
        //   headerTitleStyle: [
        //     NavigationStyles.headerTitle,
        //     {color: theme.colors.headerTitle},
        //   ],
        // }}
        options={{
          header: () => (
          <HeaderScreen title1={t('dashboard')} title2={t('rafic')}/>
        ),
        }}
        name='home'
        component={Home}
      />
    </Stack.Navigator>
  );
};

const ChargeDetailScreen = () => {
  const {t} = useTranslation();
  const {theme} = useAppTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen title1={t('dashboard')} title2={t('rafic')}/>
        ),
        }}
        name='charge_detail'
        component={ChargeDetail}
      />
    </Stack.Navigator>
  );
};


const Stack = createStackNavigator();

export default props => {
  const {t} = useTranslation();
  const {theme} = useAppTheme();
  const [user, setUser] = useState({});
  useEffect( async () => {
    setUser(JSON.parse(await AsyncStorage.getItem('USER_INFO')));
  }, []);
  return (
    <Stack.Navigator
    initialRouteName={Routes.HOME_SCREEN}>
      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="home" title1={user.first_name + " " + user.last_name} title2={user.first_name + " " + user.last_name}/>
        ),
        }}
        name={Routes.HOME_SCREEN}
        component={Home}
      />

      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="back" title1={t('dashboard_detail')}/>
        ),
        }}
        name={Routes.CHARGE_DETAIL_SCREEN}
        component={ChargeDetail}
      />

      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="back" title1={t('noc_move_in')}/>
        ),
        }}
        name={Routes.NOC_MOVE_IN_SCREEN}
        component={NocMoveIn}
      />

      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="back" title1={t('noc_move_in_dashboard')}/>
        ),
        }}
        name={Routes.NOC_MOVE_IN_DASHBOARD_SCREEN}
        component={NocMoveInDashboard}
      />

      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="back" title1={t('noc_move_in_dashboard')}/>
        ),
        }}
        name={Routes.NOC_MOVE_IN_EDIT_SCREEN}
        component={MoveInEdit}
      />

      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="back" title1={t('noc_move_out')}/>
        ),
        }}
        name={Routes.NOC_MOVE_OUT_SCREEN}
        component={NocMoveOut}
      />

      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="back" title1={t('noc_move_out')}/>
        ),
        }}
        name={Routes.NOC_MOVE_OUT_EDIT_SCREEN}
        component={MoveOutEdit}
      />

      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="back" title1={t('noc_move_out_dashboard')}/>
        ),
        }}
        name={Routes.NOC_MOVE_OUT_DASHBOARD_SCREEN}
        component={NocMoveOutDashboard}
      />

      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="back" title1={t('noc_maintenance')}/>
        ),
        }}
        name={Routes.NOC_MAINTENANCE_SCREEN}
        component={NocMaintenance}
      />

      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="back" title1={t('noc_maintenance_dashboard')}/>
        ),
        }}
        name={Routes.NOC_MAINTENANCE_DASHBOARD_SCREEN}
        component={NocMaintenanceDashboard}
      />

      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="back" title1={t('noc_maintenance_dashboard')}/>
        ),
        }}
        name={Routes.NOC_MAINTENANCE_EDIT_SCREEN}
        component={MaintenanceEdit}
      />

      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="back" title1="REPORT ISSUES DASHBOARD"/>
        ),
        }}
        name={Routes.REPORT_ISSUES_DASHBOARD_SCREEN}
        component={ReportIssuesDashboard}
      />

      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="back" title1={t('report_issue')}/>
        ),
        }}
        name={Routes.REPORT_ISSUES_SCREEN}
        component={ReportIssues}
      />

      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="back" title1="REPORT ISSUES DETAIL"/>
        ),
        }}
        name={Routes.REPORT_ISSUES_DETAIL_SCREEN}
        component={ReportIssuesDetail}
      />

      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="back" title1="MESSAGE"/>
        ),
        }}
        name={Routes.MESSAGES_DASHBOARD}
        component={MessageDashboard}
      />

      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="back" title1="CREATE CHANNEL"/>
        ),
        }}
        name={Routes.MESSAGES_SCREEN}
        component={Message}
      />

      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="back" title1="CHATTING"/>
        ),
        }}
        name={Routes.MESSAGES_DETAIL_SCREEN}
        component={MessageDetail}
      />
      
      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="back" title1={t('settings')}/>
        ),
        }}
        name={Routes.SETTINGS_SCREEN}
        component={Settings}
      />

      <Stack.Screen
        options={{
          header: () => (
          <HeaderScreen type="back" title1="ADMIN MESSAGES"/>
        ),
        }}
        name={Routes.MOVE_RESPONSE_SCREEN}
        component={MoveDetail}
      />
    </Stack.Navigator>
  );
};
