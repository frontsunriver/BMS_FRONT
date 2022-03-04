import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import {useStoreState} from 'easy-peasy';
import { ScrollView } from 'react-native-gesture-handler';
import AssociationFooterScreen from '../../Components/AssociationFooterScreen';
import {Container} from '../../Components';
import theme from '../../Themes/configs/default';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../Config';
import { useIsFocused } from '@react-navigation/native';
import Routes from '../../Navigation/Routes';
import { useNavigation } from '@react-navigation/native';
import { showErrorToast, showSuccessToast } from '../../Lib/Toast';
import { Searchbar } from 'react-native-paper';
import FontAwesome, { parseIconFromClassName, Icons } from 'react-native-fontawesome'

const ManageOwners = ({route, navigation}) => {
  const {theme} = useAppTheme();
  const [user, setUser] = useState({});
  const [serverData, setServerData] = useState([]);
  const [viewMode, setViewMode] = useState(false);
  const isFocused = useIsFocused();
  const navigate = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const addIcon = parseIconFromClassName('fas fa-plus');

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

  const onChangeSearch = async (t) => {
    setSearchQuery(t);
  }

  useEffect(async () => {
    if(searchQuery != ''){
      await axios.post(`${BASE_URL}/user/getUserList`, {query: searchQuery, type: 1}).then( res => {
        if(res.data.success) {
          setServerData(res.data.data);
          if(res.data.data.length > 0) {
            setViewMode(true);
          }
        }
      }).catch(err => {
      });
    }else {
      await axios.post(`${BASE_URL}/user/getUserList`, {type: 1}).then( res => {
        if(res.data.success) {
          setServerData(res.data.data);
          if(res.data.data.length > 0) {
            setViewMode(true);
          }
        }
      }).catch(err => {
      });
    }
    
  }, [searchQuery])

  const submitHandle = () => {
    navigate.navigate(Routes.ASSOCIATION_OWNER_DETAIL, {tmp: {}})
  }

  const deleteOwner = (item) => {
    Alert.alert(
      "Confirm",
      "Are you sure to delete?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          axios.post(`${BASE_URL}/user/delete`, {id: item.id}).then( resp => {
            if(resp.data.success) {
              showSuccessToast('Delete Successfully');
              var index = serverData.indexOf(item);
              if (index !== -1) {
                var tmp = serverData.filter((res1, i)=>{
                  return index != i
                });
                setServerData(tmp);
              }
            }
          }).catch(err => {
            showErrorToast(err);
          });
        }}
      ]
    );
  }
  
  const renderView = () => {
    if(viewMode) {
      return (
        <View
          style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 20, paddingRight: 20}}>
              {serverData.map(data => {
                return (
                  // <TouchableOpacity key={data.id} onPress={() => {navigate.navigate(Routes.ASSOCIATION_OWNER_BUILDINGS_UNITS, {data: data})}}>
                  // <View
                  // style={{borderRadius: 3, backgroundColor: '#ddd', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomColor: '#e2e2e2', borderBottomWidth: 0.8, marginTop: 5}}>
                  //     <View style={{flexDirection: 'column', justifyContent: "space-between", alignItems: 'flex-start', alignContent: 'center'}}>
                  //         <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between'}}>
                  //             <Text>{data.first_name}</Text>
                  //             <Text>{data.last_name}</Text>
                  //         </View>
                  //     </View>
                  // </View>
                  // </TouchableOpacity>
                  <View style={[styles.card, styles.shadowProp]}>
                    <TouchableOpacity key={data.id} onPress={() => {navigate.navigate(Routes.ASSOCIATION_OWNER_BUILDINGS_UNITS, {data: data})}}>
                      <View
                      style={{borderRadius: 3, padding: 20, borderBottomColor: '#ddd', borderBottomWidth: 2, }}>
                          <View style={{flex: 1}}>
                              <View style={{flexDirection: 'row', flex: 1}}>
                                  <Text style={{flexDirection: 'row', marginLeft: 5, fontSize: 20}}>{data.first_name} {data.last_name}</Text>
                              </View>
                          </View>
                      </View>
                    </TouchableOpacity>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5, paddingBottom: 10}}>
                      
                      <Button mode="contained" style={{borderRadius: 5, marginLeft: 5}} color={theme.colors.background}
                        onPress={() => {
                          navigate.navigate(Routes.ASSOCIATION_OWNER_DETAIL, {data: data})
                        }}
                      >
                        <Text style={{ fontSize: 11, textAlign: 'center', color: theme.colors.primary }}>
                          Edit
                        </Text>
                      </Button>
                      <Button mode="contained" style={{borderRadius: 5, marginLeft: 5}} color={theme.colors.background}
                        onPress={() => {
                          deleteOwner(data);
                        }}
                      >
                        <Text style={{ fontSize: 11, textAlign: 'center', color: theme.colors.primary }}>
                          Delete
                        </Text>
                      </Button>
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
              <Text>There is no datas</Text>
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
              <View style={{flexDirection: 'column', padding: 20, }}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5, borderBottomColor: '#e2e2e2', borderBottomWidth: 1}}>
                    <Searchbar
                      placeholder="Search user name, email, mobile"
                      onChangeText={onChangeSearch}
                      inputStyle={theme.colors.background}
                      style={{backgroundColor: '#e2e2e2', marginRight: 5, flex: 4}}
                      iconColor='#000'
                      value={searchQuery}
                    />
                    <Button
                      mode="contained"
                      style={{borderRadius: 5,}}
                      color={theme.colors.background}
                      onPress={submitHandle}
                    >
                      {/* <Text
                        style={{
                          fontSize: 15,
                          textAlign: 'center',
                          color: theme.colors.primary
                        }}>
                        ADD
                      </Text> */}
                      <FontAwesome icon={addIcon} style={{color: theme.colors.primary, fontSize: 20}} />
                    </Button>
                  </View>
              </View>
              {renderView()}
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

export default ManageOwners;
