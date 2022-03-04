import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TextInput, Image, Keyboard, PermissionsAndroid } from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import { Button } from 'react-native-paper';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import useTranslation from '../../i18n';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FooterScreen from '../../Components/FooterScreen';
import {Container} from '../../Components';
import axios from 'axios';
import { BASE_URL } from '../../Config';
import ImagePicker, {launchCamera} from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {showInfoToast, showErrorToast, showSuccessToast} from '../../Lib/Toast';
import Toast from 'react-native-tiny-toast';
import NavigationService from '../../Navigation';
import Routes from '../../Navigation/Routes';

const SendAnnounce = ({route, navigation}) => {
  const {t} = useTranslation();
  const {theme} = useAppTheme();
  const {data} = route.params;
  const [user, setUser] = useState({});
  const [summary, setSummary] = useState('');

  useEffect( async () => {
    setUser(JSON.parse(await AsyncStorage.getItem('USER_INFO')));
  }, [])

  const submitHandle = async () => {
    Keyboard.dismiss();
    if(!formValidation().success){
      showErrorToast(formValidation().message);
      return;
    }

    var formData = new FormData();
    formData.append('content', summary);
    formData.append('user_id', data.id);
    formData.append('type', 2);

    await axios.post(`${BASE_URL}notify/add`, formData,
    { headers: { 'Content-Type': 'multipart/form-data', 'X-Requested-With': 'XMLHttpRequest', }}).then(res => { 
      setSummary('');
      showSuccessToast('Your request is sent successfully. Please wait for the reply.');
    }).catch(err => {
      showErrorToast('Something went wrong! Please try again.');
    });
  }

  const formValidation = () => {
    var result = true;
    var message = "";
    var res = {};

    
    if(summary == '') {
      message = "Please insert the issue summary";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }

    res['success'] = result;
    res['message'] = message;
    return res;
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
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <TextInput
                    style={styles.textfield}
                    placeholder="Please write issues"
                    numberOfLines={10}
                    value={summary}
                    multiline={true}
                    onChangeText={text => setSummary(text)}
                  />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 15}}>
                  <Button
                    mode="contained"
                    style={{borderRadius: 30, marginLeft: 30, marginRight: 30, padding: 5}}
                    color={theme.colors.background}
                    onPress={submitHandle}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: 'center',
                        color: theme.colors.primary
                      }}>
                      SUBMIT
                    </Text>
                  </Button>
                </View>
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

export default SendAnnounce;
