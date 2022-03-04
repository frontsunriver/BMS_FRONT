/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Section, TouchableX} from '../../Components';
import {Image, View} from 'react-native';
import {Text} from 'react-native';
import metrics from '../../Themes/Metrics';
import useAuth from '../../Services/Auth';
import useAppTheme from '../../Themes/Context';
import useTranslation from '../../i18n';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../../Navigation';
import FontAwesome, { parseIconFromClassName, Icons } from 'react-native-fontawesome';
import Routes from '../../Navigation/Routes';

const Drawer = props => {
  return (
    <DrawerContentScrollView {...props}>
      <Content />
    </DrawerContentScrollView>
  );
};

const Content = () => {
  const {logout} = useAuth();
  const [user, setUser] = useState(null);
  const {theme} = useAppTheme();
  const {t} = useTranslation();
  const homeIcon = parseIconFromClassName('fas fa-home');
  const keyIcon = parseIconFromClassName('fas fa-key');
  const requestIcon = parseIconFromClassName('fas fa-user-edit')
  const archievedIcon = parseIconFromClassName('fas fa-check-double')
  const reportedIcon = parseIconFromClassName('fas fa-file-import');
  const reportIcon = parseIconFromClassName('fas fa-pencil-alt');
  const settingIcon = parseIconFromClassName('fas fa-cogs');
  const messageIcon = parseIconFromClassName('fas fa-envelope');

  useEffect( async () => {
    var userInfo = JSON.parse(await AsyncStorage.getItem('USER_INFO'));
    setUser(userInfo);
  }, []);

  const renderName = () => {
    if(user != null) {
      return (
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
          <Text style={{fontSize: 20, flex: 1, color: theme.colors.primary}}>{user.first_name} {user.last_name}</Text>
          <Text style={{fontSize: 15, flex: 1, color: theme.colors.primary}}>{user.email}</Text>
        </View>
      )
    }
  }

  return (
    <Section
      style={{
        minHeight: metrics.screenHeight,
        backgroundColor: theme.colors.background,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        padding: 30
      }}>
      {renderName()}
      <View style={{marginTop: 20}}>
        <TouchableX border onPress={() => {
          NavigationService.navigate(Routes.ASSOCIATION_HOME_SCREEN)
        }}>
          <View style={{padding: 16, flexDirection: 'row'}}>
            <FontAwesome icon={homeIcon} style={{color: theme.colors.primary, fontSize: 18}} />
            <Text style={{color: theme.colors.primary, marginLeft: 10}}>HOME</Text>
          </View>
        </TouchableX>

        <TouchableX border onPress={() => {
          NavigationService.navigate(Routes.ASSOCIATION_REQUEST_SCREEN)
        }}>
          <View style={{padding: 16, flexDirection: 'row'}}>
            <FontAwesome icon={requestIcon} style={{color: theme.colors.primary, fontSize: 16}} />
            <Text style={{color: theme.colors.primary, marginLeft: 10}}>PENDING REQUEST</Text>
          </View>
        </TouchableX>

        <TouchableX border onPress={() => {
          NavigationService.navigate(Routes.ASSOCIATION_ARCHIEVED_SCREEN)
        }}>
          <View style={{padding: 16, flexDirection: 'row'}}>
            <FontAwesome icon={archievedIcon} style={{color: theme.colors.primary, fontSize: 19}} />
            <Text style={{color: theme.colors.primary, marginLeft: 10}}>ARCHIEVED REQUEST</Text>
          </View>
        </TouchableX>
        <TouchableX border onPress={() => {
          NavigationService.navigate(Routes.ASSOCIATION_REPORT_SCREEN)
        }}>
          <View style={{padding: 16, flexDirection: 'row'}}>
            <FontAwesome icon={reportIcon} style={{color: theme.colors.primary, fontSize: 20}} />
            <Text style={{color: theme.colors.primary, marginLeft: 10}}>REPORTS</Text>
          </View>
        </TouchableX>

        <TouchableX border onPress={() => {
          NavigationService.navigate(Routes.ASSOCIATION_MESSAGES_DASHBOARD_SCREEN)
        }}>
          <View style={{padding: 16, flexDirection: 'row'}}>
            <FontAwesome icon={messageIcon} style={{color: theme.colors.primary, fontSize: 20}} />
            <Text style={{color: theme.colors.primary, marginLeft: 10}}>MESSAGES</Text>
          </View>
        </TouchableX>
        <TouchableX border onPress={() => {
          NavigationService.navigate(Routes.ASSOCIATION_ISSUES_REPORTED_DASHBOARD_SCREEN)
        }}>
          <View style={{padding: 16, flexDirection: 'row'}}>
            <FontAwesome icon={reportedIcon} style={{color: theme.colors.primary, fontSize: 20}} />
            <Text style={{color: theme.colors.primary, marginLeft: 10}}>ISSUES REPORTED</Text>
          </View>
        </TouchableX>
        
        <TouchableX border onPress={() => {
          NavigationService.navigate(Routes.ASSOCIATION_SETTINGS_SCREEN)
        }}>
          <View style={{padding: 16, flexDirection: 'row'}}>
            <FontAwesome icon={settingIcon} style={{color: theme.colors.primary, fontSize: 15}} />
            <Text style={{color: theme.colors.primary, marginLeft: 10}}>SETTINGS</Text>
          </View>
        </TouchableX>
      </View>
      <View style={{position: "absolute", bottom: 50, left: 30, flexDirection: 'row'}}>
        <TouchableX border onPress={logout}>
          <View style={{padding: 16, flexDirection: 'row'}}>
            <FontAwesome icon={keyIcon} style={{color: theme.colors.primary, fontSize: 20}} />
            <Text style={{color: theme.colors.primary, marginLeft: 10}}>Logout</Text>
          </View>
        </TouchableX>
      </View>
    </Section>
  );
};

const Item = ({name, color = 'black', onPress = () => {}}) => {
  
  return (
    <TouchableX border onPress={onPress}>
      <View style={{padding: 16}}>
        <FontAwesome icon={moveInIcon} style={{color: theme.colors.primary, fontSize: 20}} />
        <Text style={{color}}>{name}</Text>
      </View>
    </TouchableX>
  );
};

export default Drawer;
