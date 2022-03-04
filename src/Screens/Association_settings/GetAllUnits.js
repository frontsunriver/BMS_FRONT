import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import { ScrollView } from 'react-native-gesture-handler';
import {Container} from '../../Components';
import theme from '../../Themes/configs/default';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import DocumentPicker from 'react-native-document-picker';
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
  const { data } = route.params;
  const [serverData, setServerData] = useState([]);
  const [viewMode, setViewMode] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [singleFile, setSingleFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isFocused = useIsFocused();
  const navigate = useNavigation();
  const addIcon = parseIconFromClassName('fas fa-plus');
  const uploadIcon = parseIconFromClassName('fas fa-upload');

  useEffect( async () => {
    var userInfo = JSON.parse(await AsyncStorage.getItem('USER_INFO'));
    setUser(userInfo);
    await axios.post(`${BASE_URL}/unit/getList`, {building_id: data.id}).then( res => {
      if(res.data.success) {
        setServerData(res.data.data);
        setTotalCount(res.data.data.length);
        if(res.data.data.length > 0) {
          setViewMode(true);
        }
      }
    }).catch(err => {
    });
  }, [isFocused]);

  const importHandle = async () => {
    setLoading(true);
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSingleFile(res[0]);
      var formData = new FormData();
      const fileToUpload = res[0];
      formData.append('importexcel', fileToUpload);
      formData.append('building_id', data.id);
      await axios.post(`${BASE_URL}import/unit_excel`, formData,
      { headers: { 'Content-Type': 'multipart/form-data', 'X-Requested-With': 'XMLHttpRequest', }}).then(res => { 
        console.log(res.data);
        if(res.data.success) {
          setLoading(false);
          showSuccessToast('Database is imported successfully.');
          
          setSingleFile(null);
        }else {
          setLoading(false);
          showErrorToast(res.data.message);
        }
      }).catch(err => {
        console.log(err);
        setLoading(false);
        showErrorToast('Something went wrong! Please try again.');
      });
    } catch (err) {
      console.log('reject')
      setLoading(false);
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        
      } else {
        
      }
    }
  }

  const submitHandle = () => {
    navigate.navigate(Routes.ASSOCIATION_ADD_UNITS, {data: data});
  }

  const deleteUnit = async (id) => {
    await axios.post(`${BASE_URL}/unit/delete`, {id: id}).then( resp => {
      if(resp.data.success) {
        showSuccessToast('Delete Successfully');
        fetchData();
      }
    }).catch(err => {
      showErrorToast(err);
    });
  }

  const fetchData = async () => {
    await axios.post(`${BASE_URL}/unit/getList`, {building_id: data.id}).then( resp => {
      if(resp.data.success) {
        setServerData(resp.data.data);
        setTotalCount(resp.data.data.length);
        if(resp.data.data.length > 0) {
          setViewMode(true);
        }
      }
    }).catch(err => {
      showErrorToast(err);
    });
  }
  
  const onChangeSearch = async (t) => {
    setSearchQuery(t);
  }

  useEffect(async () => {
    if(searchQuery != ''){
      await axios.post(`${BASE_URL}/unit/getList`, {building_id: data.id, query: searchQuery}).then( res => {
        if(res.data.success) {
          setServerData(res.data.data);
          if(res.data.data.length > 0) {
            setViewMode(true);
          }
        }
      }).catch(err => {
      });
    }else {
      fetchData();
    }
    
  }, [searchQuery])

  const renderView = () => {
    if(viewMode) {
      return (
        <View
          style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 20, paddingRight: 20}}>
                {serverData.map(data => {
                  return (
                    <View key={data.id} style={[styles.card, styles.shadowProp]}>
                      <View 
                      style={{borderRadius: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomColor: '#ddd', borderBottomWidth: 2, marginTop: 5}}>
                          <View style={{flexDirection: 'column', justifyContent: "space-between", alignItems: 'flex-start', alignContent: 'center'}}>
                              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between'}}>
                                  <View><Text>{data.unit_name}</Text></View>
                              </View>
                          </View>
                      </View>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5, paddingBottom: 10}}>
                        <Button loading={loading} mode="contained" style={{borderRadius: 5, marginLeft: 5}} color={theme.colors.background}
                          onPress={() => {
                            navigate.navigate(Routes.ASSOCIATION_UPDATAE_UNITS_SCREEN, {data: data})
                          }}
                        >
                          <Text style={{ fontSize: 11, textAlign: 'center', color: theme.colors.primary }}>
                            Edit
                          </Text>
                        </Button>
                        <Button loading={loading} mode="contained" style={{borderRadius: 5, marginLeft: 5}} color={theme.colors.background}
                          onPress={() => {
                            deleteUnit(data.id);
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
              <Text>There are no units</Text>
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
                    {/* <Text style={{top: 10}}>Total {totalCount}</Text> */}
                    <Searchbar
                        placeholder="Search building name"
                        onChangeText={onChangeSearch}
                        inputStyle={theme.colors.background}
                        style={{backgroundColor: '#e2e2e2', marginRight: 5, flex: 3}}
                        iconColor='#000'
                        value={searchQuery}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Button
                        loading={loading}
                        mode="contained"
                        style={{borderRadius: 5}}
                        color={loading ? theme.colors.accent : theme.colors.background}
                        onPress={importHandle}
                      >
                        <FontAwesome icon={uploadIcon} style={{color: theme.colors.primary, fontSize: 20}} />
                      </Button>
                      <Button
                        mode="contained"
                        style={{borderRadius: 5, marginLeft: 5}}
                        color={theme.colors.background}
                        onPress={submitHandle}
                      >
                        <FontAwesome icon={addIcon} style={{color: theme.colors.primary, fontSize: 20}} />
                      </Button>
                    </View>
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
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '100%',
    marginVertical: 10,
  },
});

export default ManageOwners;
