import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TextInput, Image, Keyboard, PermissionsAndroid } from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import useTranslation from '../../i18n';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Container} from '../../Components';
import axios from 'axios';
import { BASE_URL, DOWNLOAD_URL } from '../../Config';
import Toast from 'react-native-tiny-toast';
import { Button } from 'react-native-paper'
import { showErrorToast, showSuccessToast } from '../../Lib/Toast';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Routes from '../../Navigation/Routes';

const Detail = ({route, navigation}) => {
  const {t} = useTranslation();
  const navigate = useNavigation();
  const {theme} = useAppTheme();
  const {data} = route.params;
  const [serverData, setServerData] = useState([]);

  useEffect(() => {
    axios.post(`${BASE_URL}/user/getUserList`, {building_id: data.id}).then( res => {
        if(res.data.success) {
            setServerData(res.data.data);
        }else {
          showErrorToast(res.data.message);
        }
      }).catch( err => {
        showErrorToast('Server Error. Please try again.');
    });
  }, [])

  const renderData = () => {
    if(serverData.length > 0) {
        return serverData.map(item => {
            return (
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex: 2}}>
                        <View style={{flexDirection: 'column', marginTop: 5}}>
                            <View style={{flexDirection: 'row', paddingTop: 5}}>
                                <View style={{flexDirection: 'row', flex: 3}}>
                                    <Text>{item.first_name} </Text>
                                    <Text>{item.last_name}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', paddingTop: 5}}>
                                <Text style={{flex: 3}}>{item.email}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1, marginTop: 10}}>
                        <Button
                            mode="contained"
                            style={{borderRadius: 5, padding: 2, marginLeft: 5, marginRight: 5}}
                            color={theme.colors.background}
                            onPress={() => {
                                navigate.navigate(Routes.ASSOCIATION_ANNOUNCE_SEND_OFFER, {data: item})
                            }}
                        >
                            <Text
                            style={{
                                fontSize: 12,
                                textAlign: 'center',
                                color: theme.colors.primary
                            }}>
                            Send
                            </Text>
                        </Button>
                    </View>
                </View>
            )
        })
    }else {
        return (
            <View style={{flexDirection: 'column', marginTop: 5, justifyContent: 'center', alignItems: 'center'}}>
                <Text>There is no owners in this building</Text>
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
                <View style={{flexDirection: 'column', justifyContent: 'center', padding: 20}}>
                    {renderData()}
                </View>
            </View>
            <Toast />
          </ScrollView>
        </Container>
      </LoadingActionContainer>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 40,
  },
  dropdown: {
      backgroundColor: 'white',
      borderColor: '#505252',
      borderWidth: 0.8,
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 10,
      width: '50%',
      borderRadius: 5
  },
  icon: {
      marginRight: 5,
      width: 18,
      height: 18,
  },
  item: {
      paddingVertical: 17,
      paddingHorizontal: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  textItem: {
      flex: 1,
      fontSize: 16,
  },
  shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      marginTop: -25
  },
  dateTouchable: {
    backgroundColor: 'white',
    borderColor: '#505252',
    borderWidth: 0.8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 10,
    borderRadius: 5,
  },
  textfield: {
    backgroundColor: 'white',
    borderColor: '#505252',
    borderWidth: 0.8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
    borderRadius: 5,
    width: '100%'
  }

});

export default Detail;
