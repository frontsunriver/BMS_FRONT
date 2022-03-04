import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import {useStoreState} from 'easy-peasy';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ActionButton from '../../Components/ActionButton';
import FooterScreen from '../../Components/FooterScreen';
import {Container} from '../../Components';
import Routes from '../../Navigation/Routes';
import theme from '../../Themes/configs/default';
import DashboardItem from '../../Components/DashboardItem';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { BASE_URL, DOWNLOAD_URL } from '../../Config';
import { useIsFocused } from '@react-navigation/native';
import LongText from '../../Utils/LongText';
import { useNavigation } from '@react-navigation/native';

const Dashboard = ({route, navigation}) => {
  const {theme} = useAppTheme();
  const [user, setUser] = useState({});
  const [serverData, setServerData] = useState([]);
  const isFocused = useIsFocused();
  const [viewMode, setViewMode] = useState(false);
  useEffect( async () => {
    let isMounted = true;     
    if(isMounted) {
      var userInfo = JSON.parse(await AsyncStorage.getItem('USER_INFO'));
      setUser(userInfo);
    }
    await axios.post(`${BASE_URL}/notify/getList`, {user_id: userInfo.id}).then( res => {
      if(isMounted) {
        if(res.data.success) {
          if(res.data.data.length > 0) {
            setServerData(res.data.data);
            setViewMode(true);
          }
        }
      }
    }).catch(err => {
    });
    return () => { isMounted = false };
  }, [isFocused]);
  
  const renderView = () => {
    if(viewMode) {
      return (
        serverData.map(item => {
          return <NotifyListItem key={item.id} data={item}/>
        })
      )
    }else {
      return (
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
              <Text>There is no Issues</Text>
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
            <View style={{paddingBottom: 50}}>
              <View style={{flexDirection: 'column', margin: 10}}>
                {renderView()}
              </View>
            </View>
          </ScrollView>
          <ActionButton url={Routes.REPORT_ISSUES_SCREEN}/>
          <FooterScreen tabIndex={5}/>
        </Container>
      </LoadingActionContainer>
  );
};

const NotifyListItem = (props) => {
    const navigation = useNavigation();
    const {data} = props;
    const uri = DOWNLOAD_URL + data.photofile;
    const showReportDetail = () => {
      navigation.navigate(Routes.REPORT_ISSUES_DETAIL_SCREEN, {data: data});
    }
    return (
      <TouchableOpacity onPress={showReportDetail}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', flex: 1, borderBottomWidth: 0.8, borderBottomColor: '#000', padding: 5, marginTop: 5}}>
          <View style={{flex: 1}}>
            <Image source={{uri: uri}} style={{width: 80, height: 80}}></Image>
          </View>
          <View style={{flexDirection: 'column', flex: 3, marginLeft: 5}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: '#898989'}}>{data.first_name} {data.last_name}</Text>
              <Text style={{color: '#898989', fontSize: 11}}>{data.submit_date}</Text>
            </View>
            <Text style={{marginTop: 10, paddingBottom: 5, fontSize: 15}}><LongText text={data.content} maxLength={100}/></Text>
          </View>
        </View>
      </TouchableOpacity>
    )
}

export default Dashboard;
