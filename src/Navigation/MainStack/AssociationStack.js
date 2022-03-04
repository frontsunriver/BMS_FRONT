import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabStack from './BottomStack';
import Routes from '../Routes';
import useAppTheme from '../../Themes/Context';
import useTranslation from '../../i18n';
import HeaderScreen from '../../Components/HeaderScreen';

import AssociationHome from '../../Screens/Association_home';
import AssociationAnnounce from '../../Screens/Association_announce/dashboard';
import AssociationAnnounceDetail from '../../Screens/Association_announce/Detail';
import AssociationAnnounceSendOffer from '../../Screens/Association_announce/SendAnnounce';
import AssociationRequest from '../../Screens/Association_request/dashboard'
import AssociationRequestDetail from '../../Screens/Association_request/Detail'
import AssociationArchieved from '../../Screens/Association_archieved/dashboard'
import AssociationArchievedDetail from '../../Screens/Association_archieved/Detail'
import AssociationSendOut from '../../Screens/Association_sendout/dashboard';
import AssociationSendOutDetail from '../../Screens/Association_sendout/SendoutContact';
import AssociationSettings from '../../Screens/Association_settings';
import AssociationIssuesReportDashboard from '../../Screens/Association_issues_reported/dashboard'
import AssociationIssuesReportDetail from '../../Screens/Association_issues_reported/detail'
import AssociationMessageDashboard from '../../Screens/Association_message/dashboard';
import AssociationMessageDetail from '../../Screens/Association_message/detail';
import GetAllBuildings from '../../Screens/Association_settings/GetAllBuildings';
import GetAllUnits from '../../Screens/Association_settings/GetAllUnits';
import AddBuilding from '../../Screens/Association_settings/AddBuilding';
import UpdateBuilding from '../../Screens/Association_settings/EditBuilding';
import UpdateUnit from '../../Screens/Association_settings/EditUnit';
import AddUnit from '../../Screens/Association_settings/AddUnit';
import OwnerDetail from '../../Screens/Association_settings/OwnerDetail';
import OnwerBuildingUnit from '../../Screens/Association_settings/UserOwnerBuilding';
import AddBuildingAndUnit from '../../Screens/Association_settings/AddUnitAndBuilding';
import EditBuildingAndUnit from '../../Screens/Association_settings/EditUnitAndBuilding';
import ManageOwners from '../../Screens/Association_settings/ManageOwners';
import ViewPdf from '../../Screens/ViewPdf';
import Report from '../../Screens/Association_Report';
import Search from '../../Screens/Association_Search';
import AsyncStorage from '@react-native-community/async-storage';

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
    initialRouteName={Routes.ASSOCIATION_HOME_SCREEN}>
      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="home" title1={user.first_name + " " + user.last_name}/>)}}
        name={Routes.ASSOCIATION_HOME_SCREEN}
        component={AssociationHome}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="PENDING REQUEST" />)}}
        name={Routes.ASSOCIATION_REQUEST_SCREEN}
        component={AssociationRequest}
      />

      <Stack.Screen
        options={{ header: () => (<HeaderScreen association="true" type="back" title1="REQUEST DETAIL"/>)}}
        name={Routes.ASSOCIATION_REQUEST_DETAIL}
        component={AssociationRequestDetail}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="ARCHIEVED REQUEST" />)}}
        name={Routes.ASSOCIATION_ARCHIEVED_SCREEN}
        component={AssociationArchieved}
      />

      <Stack.Screen
        options={{ header: () => (<HeaderScreen association="true" type="back" title1="ARCHIEVED REQUEST DETAIL"/>)}}
        name={Routes.ASSOCIATION_ARCHIEVED_DETAIL_SCREEN}
        component={AssociationArchievedDetail}
      />
      
      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="SEND ANNOUNCE TO OWNERS"/>)}}
        name={Routes.ASSOCIATION_ANNOUNCE_SCREEN}
        component={AssociationAnnounce}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="BUILDING GROUP USERS"/>)}}
        name={Routes.ASSOCIATION_ANNOUNCE_DETAIL_SCREEN}
        component={AssociationAnnounceDetail}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="SEND OFFER"/>)}}
        name={Routes.ASSOCIATION_ANNOUNCE_SEND_OFFER}
        component={AssociationAnnounceSendOffer}
      />

      <Stack.Screen
        options={{ header: () => (<HeaderScreen association="true" type="back" title1="SEND OUT UPDATE CONTACT DETAIL"/>)}}
        name={Routes.ASSOCIATION_SENDOUT_SCREEN}
        component={AssociationSendOut}
      />

      <Stack.Screen
        options={{ header: () => (<HeaderScreen association="true" type="back" title1={t('SEND OUT MESSAGES')}/>)}}
        name={Routes.ASSOCIATION_SENDOUT_DETAIL_SCREEN}
        component={AssociationSendOutDetail}
      />

      <Stack.Screen
        options={{ header: () => (<HeaderScreen association="true" type="back" title1="ISSUES REPORTED"/>)}}
        name={Routes.ASSOCIATION_ISSUES_REPORTED_DASHBOARD_SCREEN}
        component={AssociationIssuesReportDashboard}
      />

      <Stack.Screen
        options={{ header: () => (<HeaderScreen association="true" type="back" title1="ISSUES REPORTED"/>)}}
        name={Routes.ASSOCIATION_ISSUES_REPORTED_DETAIL_SCREEN}
        component={AssociationIssuesReportDetail}
      />

      <Stack.Screen
        options={{ header: () => (<HeaderScreen association="true" type="back" title1="MESSAGE"/>)}}
        name={Routes.ASSOCIATION_MESSAGES_DASHBOARD_SCREEN}
        component={AssociationMessageDashboard}
      />
      
      <Stack.Screen
        options={{ header: () => (<HeaderScreen association="true" type="back" title1="MESSAGE DETAIL"/>)}}
        name={Routes.ASSOCIATION_MESSAGES_DETAIL_SCREEN}
        component={AssociationMessageDetail}
      />

      <Stack.Screen
        options={{header: () => ( <HeaderScreen association="true" type="back" title1={t('settings')}/> )}}
        name={Routes.ASSOCIATION_SETTINGS_SCREEN}
        component={AssociationSettings}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="ALL BUILDINGS"/> )}}
        name={Routes.ASSOCIATION_GET_ALL_BUILDINGS}
        component={GetAllBuildings}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="ALL UNITS"/> )}}
        name={Routes.ASSOCIATION_GET_UNIT_LIST}
        component={GetAllUnits}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="ADD BUILDING"/> )}}
        name={Routes.ASSOCIATION_ADD_BUILDINGS}
        component={AddBuilding}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="UPDATE BUILDING"/> )}}
        name={Routes.ASSOCIATION_EDIT_BUILDING_SCREEN}
        component={UpdateBuilding}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="ADD UNIT"/> )}}
        name={Routes.ASSOCIATION_ADD_UNITS}
        component={AddUnit}
      />
      
      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="UPDATE UNIT"/> )}}
        name={Routes.ASSOCIATION_UPDATAE_UNITS_SCREEN}
        component={UpdateUnit}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="MANAGE OWNERS"/> )}}
        name={Routes.ASSOCIATION_MANAGE_OWNERS}
        component={ManageOwners}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="OWNER DETAIL"/> )}}
        name={Routes.ASSOCIATION_OWNER_DETAIL}
        component={OwnerDetail}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="BUILDINGS AND UNITS"/> )}}
        name={Routes.ASSOCIATION_OWNER_BUILDINGS_UNITS}
        component={OnwerBuildingUnit}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="ADD BUILDINGS AND UNITS"/> )}}
        name={Routes.ASSOCIATION_ADD_BUILDINGS_UNITS}
        component={AddBuildingAndUnit}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1="EDIT BUILDINGS AND UNITS"/> )}}
        name={Routes.ASSOCIATION_EDIT_OWNER_DETAIL}
        component={EditBuildingAndUnit}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen association="true" type="back" title1='REPORT'/> )}}
        name={Routes.ASSOCIATION_REPORT_SCREEN}
        component={Report}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen  association="true" type="back" title1="SEARCH"/> )}}
        name={Routes.ASSOCIATION_SEARCH_SCREEN}
        component={Search}
      />

      <Stack.Screen
        options={{ header: () => ( <HeaderScreen  association="true" type="back" title1=""/> )}}
        name={Routes.SHOW_VIEW_PDF_SCREEN}
        component={ViewPdf}
      />

    </Stack.Navigator>
  );
};
