import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome, { parseIconFromClassName, Icons } from 'react-native-fontawesome'
import {Container} from '../../Components';
import Routes from '../../Navigation/Routes';
import theme from '../../Themes/configs/default';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../Config';
import { useIsFocused } from '@react-navigation/native';

const MoveDetail = ({route, navigation}) => {
  const {theme} = useAppTheme();
  const [user, setUser] = useState({});
  const [serverData, setServerData] = useState([]);
  const [viewMode, setViewMode] = useState(false);
  const {data} = route.params;
  const isFocused = useIsFocused();
  const moveInIcon = parseIconFromClassName('fas fa-hand-point-right') 
  useEffect( async () => {
    console.log(data);
    let isMounted = true;     
    var userInfo = JSON.parse(await AsyncStorage.getItem('USER_INFO'));
    if(isMounted) {
      setUser(userInfo);
    }
    await axios.post(`${BASE_URL}move/getIssuesReply`, {move_id: data.id}).then( res => {
      if(isMounted) {
        if(res.data.success) {
          setServerData(res.data.data);
          if(res.data.data.length > 0) {
            setViewMode(true);
          }
        }
      }
    }).catch(err => {
        console.log(err);
    });
    return () => { isMounted = false };
  }, [isFocused]);
  
  const renderView = () => {
    if(viewMode) {
      return (
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
            {serverData.map(item => {
                return (
                    <View style={[styles.card, styles.shadowProp]}>
                        <View>
                            <Text>{item.content}</Text>
                            <Text style={{alignSelf: 'flex-end', fontSize: 11, fontColor: '#ddd', marginTop: 3}}>{item.reg_date}</Text>
                        </View>
                    </View>
                )
            })}
        </View>
      )
    }else {
      return (
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
              <Text>There is no issues from Admin</Text>
        </View>
      )
    }
  }

  const repostHandle = () => {
    if(data.move_type == 1) {
        navigation.navigate(Routes.NOC_MOVE_IN_EDIT_SCREEN, {data: data});
    }else if(data.move_type == 2) {
        navigation.navigate(Routes.NOC_MOVE_OUT_EDIT_SCREEN, {data: data});
    }else {
        navigation.navigate(Routes.NOC_MAINTENANCE_EDIT_SCREEN, {data: data});
    }
  }

  const showRepost = () => {
      if(data.status == 3) {
        return (
            <TouchableOpacity onPress={repostHandle}>
                <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20, alignSelf:'flex-end'}}>
                    <Text style={{color: theme.colors.background, fontSize: 20, marginRight: 5, marginTop: 7}} >Go</Text>
                    <FontAwesome icon={moveInIcon} style={{color: theme.colors.background, fontSize: 40}} />
                </View>
            </TouchableOpacity>
        )
      }else {
          return <></>
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
            <View>
              {renderView()}
              {showRepost()}
            </View>
          </ScrollView>
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

export default MoveDetail;
