import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import {useStoreState} from 'easy-peasy';
import { ScrollView } from 'react-native-gesture-handler';
import AssociationFooterScreen from '../../Components/AssociationFooterScreen';
import {Container} from '../../Components';
import theme from '../../Themes/configs/default';
import AssociationBuildingItem from '../../Components/AssociationBuildingItem';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../Config';
import { useIsFocused } from '@react-navigation/native';
import Routes from '../../Navigation/Routes';
import { useNavigation } from '@react-navigation/native';

const Dashboard = ({route, navigation}) => {
  const {theme} = useAppTheme();
  const [user, setUser] = useState({});
  const [serverData, setServerData] = useState([]);
  const [viewMode, setViewMode] = useState(false);
  const isFocused = useIsFocused();
  const navigate = useNavigation();
  useEffect( async () => {
    var userInfo = JSON.parse(await AsyncStorage.getItem('USER_INFO'));
    setUser(userInfo);
    await axios.post(`${BASE_URL}/user/getUserList`, {type: 1}).then( res => {
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
                  return (
                    <TouchableOpacity key={data.id} onPress={() => {navigate.navigate(Routes.ASSOCIATION_SENDOUT_DETAIL_SCREEN, {data: data})}}>
                    <View
                    style={{borderRadius: 3, backgroundColor: '#ddd', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomColor: '#e2e2e2', borderBottomWidth: 0.8, marginTop: 5}}>
                        <View style={{flexDirection: 'column', justifyContent: "space-between", alignItems: 'flex-start', alignContent: 'center'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between'}}>
                                <Text>{data.first_name}</Text>
                                <Text>{data.last_name}</Text>
                            </View>
                        </View>
                    </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
        </View>
      )
    }else {
      return (
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
              <Text>There is no Request datas</Text>
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
          <AssociationFooterScreen />
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

export default Dashboard;
