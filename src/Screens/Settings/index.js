import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-paper';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import { ScrollView } from 'react-native-gesture-handler';
import FooterScreen from '../../Components/FooterScreen';
import useTranslation from '../../i18n';
import {Container} from '../../Components';
import DocumentPicker from 'react-native-document-picker';
import { showErrorToast, showInfoToast, showSuccessToast } from '../../Lib/Toast';
import Toast from 'react-native-tiny-toast';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from '../../Config';

const Settings = ({routes, navigation}) => {
  const {theme} = useAppTheme();
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ mobile, setMobile ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ passport, setPassport ] = useState(null);

  useEffect( async () => {
    let isMounted = true;   
    if(isMounted) {
      setUser(JSON.parse(await AsyncStorage.getItem('USER_INFO')));
    }
    return () => { isMounted = false };
  }, [])

  const objCast = (obj) => {
    return obj.name;
  }

  const selectPassport = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setPassport(res[0]);
    } catch (err) {
      setPassport(null);
      if (DocumentPicker.isCancel(err)) {
      } else {
        
      }
    }
  };

  const submitHandle = async () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var formData = new FormData();
    var is_submit = false;
    formData.append('id', user.id);
    if(password != '') {
      formData.append('password', password);
      is_submit = true;
    }
    if(email != '') {
      if(!reg.test(email)) {
        message = "Please insert correct email";
        showErrorToast(message);
        return ;
      }else {
        formData.append('email', email);
        is_submit = true;
      }
    }
    if(mobile != '') {
      formData.append('mobile', mobile);
      is_submit = true;
    }
    if(address != '') {
      formData.append('address', address);
      is_submit = true;
    }
    if(passport) {
      formData.append('passport', passport);
      is_submit = true;
    }

    if(is_submit) {
      await axios.post(`${BASE_URL}user/update`, formData,
      { headers: { 'Content-Type': 'multipart/form-data', 'X-Requested-With': 'XMLHttpRequest', }}).then(res => { 
        showSuccessToast('Your account has been changed.');
        setPassport(null);
        setPassword('');
        setMobile('');
        setAddress('');
        setEmail('');
      }).catch(err => {
        showErrorToast('Something went wrong! Please try again.');
      });
    }else {
      showInfoToast('Please insert the information that you want change.');
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
              <View
              style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
                <View style={[styles.card, styles.shadowProp]}>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Text style={{width: '50%', marginTop: 15}}>{t('Change Password')}</Text>
                    <TextInput value={password} style={styles.textfield} secureTextEntry={true} onChangeText={text => setPassword(text)}/>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Text style={{width: '50%', marginTop: 15}}>{t('Change Email')}</Text>
                    <TextInput value={email} style={styles.textfield}  onChangeText={text => setEmail(text)}/>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Text style={{width: '50%', marginTop: 15}}>{t('Change Mobile')}</Text>
                    <TextInput value={mobile} style={styles.textfield}  onChangeText={text => setMobile(text)}/>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Text style={{width: '50%', marginTop: 15}}>{t('Change Address')}</Text>
                    <TextInput value={address} style={styles.textfield}  onChangeText={text => setAddress(text)}/>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Text style={{width: '50%', marginTop: 15}}>{t('Change Passport')}</Text>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={selectPassport}>
                      <View style={styles.dateTouchable}>
                        <Text>{passport != null ? ( passport.name ? objCast(passport) : '' ) : 'Select File'}</Text>
                      </View>
                    </TouchableOpacity>
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
                        {t('submit')}
                      </Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
            <Toast />
          </ScrollView>
          <FooterScreen tabIndex={6}/>
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

export default Settings;
