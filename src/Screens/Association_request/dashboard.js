import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import { ScrollView } from 'react-native-gesture-handler';
import TabBar from 'react-native-tab-bar-footer'
import AssociationFooterScreen from '../../Components/AssociationFooterScreen';
import {Container} from '../../Components';
import Routes from '../../Navigation/Routes';
import theme from '../../Themes/configs/default';
import AssociationDashboardItem from '../../Components/AssociationDashboardItem';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../Config';
import { useIsFocused } from '@react-navigation/native';

const Dashboard = ({route, navigation}) => {
  const {theme} = useAppTheme();
  const [user, setUser] = useState({});
  const [serverData, setServerData] = useState([]);
  const [viewMode, setViewMode] = useState(false);
  const isFocused = useIsFocused();
  useEffect( async () => {
    var userInfo = JSON.parse(await AsyncStorage.getItem('USER_INFO'));
    setUser(userInfo);
    await axios.post(`${BASE_URL}/move/getList`, {status: 1}).then( res => {
      if(res.data.success) {
        setServerData(res.data.data);
        if(res.data.data.length > 0) {
          setViewMode(true);
        }
      }
    }).catch(err => {
    });
  }, [isFocused]);
  
  const renderView = () => {
    if(viewMode) {
      return (
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
              <View style={[styles.card, styles.shadowProp]}>
                {serverData.map(data => {
                  return <AssociationDashboardItem key={data.id} type="2" data={data}></AssociationDashboardItem>
                })}
              </View>
        </View>
      )
    }else {
      return (
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
              <Text>There is no Request data</Text>
        </View>
      )
    }
  }
  return (
      <LoadingActionContainer fixed>
        <Container
          style={{
            backgroundColor: theme.colors.primary,
            flex: 1,
          }}>
          <ScrollView>
            <View style={{paddingBottom: 100}}>
              {renderView()}
            </View>
          </ScrollView>
          <AssociationFooterScreen tabIndex={1}/>
        </Container>
      </LoadingActionContainer>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {width: 5, height: -5},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 10,
  },
  card: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '100%',
    marginVertical: 10,
  },
});

const FootTabBar = () => {
  const tabs = [
    {
      title: 'Favorites'
    },
    {
      title: 'Play'
    },
    {
      title: 'Profile'
    },
  ]

  const tabs1 = [
    {
      title: 'Favorites1'
    },
    {
      title: 'Play1'
    },
    {
      title: 'Profile1'
    },
  ]

  return (
    <>
      <TabBar onTabChange={(index) => alert(index)} tabs={tabs} />
      <TabBar onTabChange={(index) => alert(index)} tabs={tabs1} index={3}/>
    </>
  )
}

export default Dashboard;
