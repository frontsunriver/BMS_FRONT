import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Keyboard } from 'react-native';
import { Button } from 'react-native-paper';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import useTranslation from '../../i18n';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Container} from '../../Components';
import axios from 'axios';
import { BASE_URL } from '../../Config';

import AsyncStorage from '@react-native-community/async-storage';
import {showInfoToast, showErrorToast, showSuccessToast} from '../../Lib/Toast';
import Toast from 'react-native-tiny-toast';
import { useNavigation } from '@react-navigation/native';

const OwnerDetail = ({route, navigation}) => {
  const {t} = useTranslation();
  const {theme} = useAppTheme();
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const { data } = route.params;
  const navigate = useNavigation();

  useEffect( async () => {
    let isMounted = true;   
    if(data) {
      setFirstName(data.first_name)
      setLastName(data.last_name)
      setMobile(data.mobile)
      setAddress(data.address)
      setEmail(data.email)
    }
    if(isMounted) {
      setUser(JSON.parse(await AsyncStorage.getItem('USER_INFO')));
    }
    return () => { isMounted = false };    
  }, []);

  
  const showPasswordPanel = () => {
    if(data) {
      return (
        <></>
      )
    }else {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text style={{width: '50%', marginTop: 15}}>Password</Text>
          <TextInput style={styles.textfield} value={password} secureTextEntry={true} onChangeText={text => setPassword(text)}/>
        </View>
      )
    }
  }

  const submitHandle = async (e) => {
    Keyboard.dismiss();
    if(!formValidation().success){
      showErrorToast(formValidation().message);
      return;
    }
    
    var formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('type', 1);
    
    if(!data) {
      formData.append('password', password);
    }else {
      formData.append('id', data.id);
    }

    var dataUrl = `${BASE_URL}user/add`;
    if(data) {
      dataUrl = `${BASE_URL}user/update`;
    }
    await axios.post(dataUrl, formData,
    { headers: { 'Content-Type': 'multipart/form-data', 'X-Requested-With': 'XMLHttpRequest', }}).then(res => { 
      setAddress('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setMobile('');
      showSuccessToast('Your request is sent successfully. Please wait for the reply.');
      navigate.goBack();
    }).catch(err => {
      showErrorToast('Something went wrong! Please try again.');
    });
  }

  const formValidation = () => {
    var result = true;
    var message = "";
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var res = {};
    if(!firstName || firstName == ''){
      message = "Please insert the First Name";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }
    if(!lastName || lastName == ''){
      message = "Please insert the Last Name";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }
    if(!email || email == ''){
      message = "Please insert the Email";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }
    if(!reg.test(email)) {
      message = "Please insert correct email";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }
    if(!mobile || mobile == ''){
      message = "Please insert the Mobile";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }
    if(!address || address == ''){
      message = "Please insert the address";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }
    if(!data) {
      if(!password || password == ''){
        message = "Please insert the password";
        result = false;
        res['success'] = result;
        res['message'] = message;
        return res;
      }
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
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>First Name</Text>
                  <TextInput style={styles.textfield} value={firstName} onChangeText={text => setFirstName(text)}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>Last Name</Text>
                  <TextInput style={styles.textfield} value={lastName} onChangeText={text => setLastName(text)}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>Email</Text>
                  <TextInput style={styles.textfield} value={email} onChangeText={text => setEmail(text)}/>
                </View>
                {showPasswordPanel()}
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>Address</Text>
                  <TextInput style={styles.textfield} value={address} onChangeText={text => setAddress(text)}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>Mobile</Text>
                  <TextInput style={styles.textfield} value={mobile} onChangeText={text => setMobile(text)}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 15}}>
                  <Button
                    mode="contained"
                    style={{borderRadius: 5}}
                    color={theme.colors.background}
                    onPress={submitHandle}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: 'center',
                        color: theme.colors.primary
                      }}>
                      { data ? 'UPDATE' : 'ADD' }
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
    width: '50%'
  }

});

export default OwnerDetail;
