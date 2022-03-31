import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import { ScrollView } from 'react-native-gesture-handler';
import ActionButton from '../../Components/ActionButton';
import FooterScreen from '../../Components/FooterScreen';
import {Container} from '../../Components';
import Routes from '../../Navigation/Routes';
import theme from '../../Themes/configs/default';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../Config';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const Dashboard = ({routes, navigation}) => {
  const {theme} = useAppTheme();
  const [user, setUser] = useState({});
  const [serverData, setServerData] = useState([]);
  const [viewMode, setViewMode] = useState(false);
  const isFocused = useIsFocused();
  useEffect( async () => {
    var userInfo = JSON.parse(await AsyncStorage.getItem('USER_INFO'));
    setUser(userInfo);
    await axios.post(`${BASE_URL}card/getList`, {move_type: 3, user_id: userInfo.id}).then( res => {
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
                  return <DashboardItem key={data.id} type="4" data={data}></DashboardItem>
                })}
              </View>
        </View>
      )
    }else {
      return (
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
              <Text>There is no data</Text>
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
          <ActionButton url={Routes.ACCESS_CARD_ADD}/>
        </Container>
      </LoadingActionContainer>
  );
};

const DashboardItem = (props) => {
  const {data} = props;
    const [statusColor, setStatusColor] = useState({color: theme.colors.background});
    const [statusText, setStatusText] = useState('Pending');
    const navigation = useNavigation();

    const goReplyHandle = () => {
        navigation.navigate(Routes.MOVE_RESPONSE_SCREEN, {data: data});
    }

    return (
        <TouchableOpacity>
            <View
            style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomColor: '#e2e2e2', borderBottomWidth: 0.8}}>
                <View style={{flexDirection: 'column', alignItems: 'flex-start', alignContent: 'center'}}>
                    <Text>Date:</Text>
                    <Text>{data.reg_date}</Text>
                </View>
                <View style={{flexDirection: 'column', alignItems: 'flex-start', alignContent: 'center'}}>
                    <Text>Building:</Text>
                    <Text>{data.building_name}</Text>
                </View>
                <View style={{flexDirection: 'column', alignItems: 'flex-start', alignContent: 'center'}}>
                    <Text>Unit:</Text>
                    <Text>{data.unit_name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

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

export default Dashboard;
