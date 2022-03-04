import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import { ScrollView } from 'react-native-gesture-handler';
import {Container} from '../../Components';
import theme from '../../Themes/configs/default';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
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
  const [totalCount, setTotalCount] = useState(0);
  const [singleFile, setSingleFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const navigate = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const apartmentIcon = parseIconFromClassName('far fa-building');
  const homeIcon = parseIconFromClassName('fas fa-home');
  const addIcon = parseIconFromClassName('fas fa-plus');
  const uploadIcon = parseIconFromClassName('fas fa-upload');

  useEffect( async () => {
    let isMounted = true;    
    if(isMounted) {
      var userInfo = JSON.parse(await AsyncStorage.getItem('USER_INFO'));
      setUser(userInfo);
      await axios.post(`${BASE_URL}/building/getListWithUnit`).then( res => {
        if(res.data.success) {
          setServerData(res.data.data);
          setTotalCount(res.data.data.length);
          if(res.data.data.length > 0) {
            setViewMode(true);
          }
        }
      }).catch(err => {
        showErrorToast(err);
      });
    }
    return () => { isMounted = false };
  }, [isFocused]);

  const importHandle = async () => {
    setLoading(true);
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      setSingleFile(res[0]);
      var formData = new FormData();
      const fileToUpload = res[0];
      formData.append('importexcel', fileToUpload);
      await axios.post(`${BASE_URL}import/building_excel`, formData,
      { headers: { 'Content-Type': 'multipart/form-data', 'X-Requested-With': 'XMLHttpRequest', }}).then(res => { 
        console.log(res.data);
        if(res.data.success) {
          setLoading(false);
          showSuccessToast('Database is imported successfully.');
          setSingleFile(null);
          fetchData();
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

  const fetchData = async () => {
    await axios.post(`${BASE_URL}/building/getListWithUnit`).then( resp => {
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

  const submitHandle = () => {
    navigate.navigate(Routes.ASSOCIATION_ADD_BUILDINGS)
  }

  const deleteBuilding = async (id) => {
    await axios.post(`${BASE_URL}/building/delete`, {id: id}).then( resp => {
      if(resp.data.success) {
        showSuccessToast('Delete Successfully');
          fetchData();
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
      await axios.post(`${BASE_URL}/building/getListWithUnit`, {query: searchQuery}).then( res => {
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
                    <View style={[styles.card, styles.shadowProp]}>
                      <TouchableOpacity key={data.id} onPress={() => {navigate.navigate(Routes.ASSOCIATION_GET_UNIT_LIST, {data: data})}}>
                        <View
                        style={{borderRadius: 3, padding: 20, borderBottomColor: '#ddd', borderBottomWidth: 2, }}>
                            <View style={{flex: 1}}>
                                <View style={{flexDirection: 'row', flex: 1}}>
                                    <FontAwesome icon={apartmentIcon} style={{color: theme.colors.background, fontSize: 20, marginTop: 3}} /><Text style={{flexDirection: 'row', marginLeft: 5, fontSize: 20}}>{data.name}</Text>
                                </View>
                                <View style={{flexDirection: 'row', flex: 1, paddingLeft:5, paddingTop: 10}}>
                                    <FontAwesome icon={homeIcon} style={{color: theme.colors.background, fontSize: 15, marginTop: 2}} /><Text style={{marginLeft: 5}}>Unit: {data.cnt}</Text>
                                </View>
                            </View>
                        </View>
                      </TouchableOpacity>

                      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5, paddingBottom: 10}}>
                        
                        <Button loading={loading} mode="contained" style={{borderRadius: 5, marginLeft: 5}} color={theme.colors.background}
                          onPress={() => {
                            navigate.navigate(Routes.ASSOCIATION_EDIT_BUILDING_SCREEN, {data: data})
                          }}
                        >
                          <Text style={{ fontSize: 11, textAlign: 'center', color: theme.colors.primary }}>
                            Edit
                          </Text>
                        </Button>
                        <Button loading={loading} mode="contained" style={{borderRadius: 5, marginLeft: 5}} color={theme.colors.background}
                          onPress={() => {
                            deleteBuilding(data.id);
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
              <Text>There are no buildings</Text>
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
            <View>
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
