/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {Text, Keyboard, View} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {STATUS} from '../../Constants';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import {
  Section,
  Container,
  PasswordInputX,
  InputX,
  ButtonX,
  TouchableX,
} from '../../Components';
import NavigationService from '../../Navigation/index';
import Routes from '../../Navigation/Routes/index';

import useAppTheme from '../../Themes/Context';
import {showInfoToast, showErrorToast, showSuccessToast} from '../../Lib/Toast';
import BottomPanel from '../../Components/Panel';
import { Button } from 'react-native-paper';
import useTranslation from '../../i18n';
import Toast from 'react-native-tiny-toast';
import axios from 'axios';
import { BASE_URL } from '../../Config';

export default () => {
  const {theme} = useAppTheme();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);

  const onChange = ({key, value}) => {
    console.log(key, value);
    if(key == 'firstname') {
      setFirstName(value);
    }else if(key == 'lastname') {
      setLastName(value);
    }else if(key == 'email') {
      setEmail(value);
    }else if(key == 'password') {
      setPassword(value);
    }
  }

  const registerUser = () => {

    Keyboard.dismiss();
    setLoading(true);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!reg.test(email)) {
      showErrorToast('Please insert Correct Email format');
      setLoading(false);
      return;
    }
    if (!firstname || !lastname || !email || !password) {
      showErrorToast('Username and password are mandatory, try again !');
      setLoading(false);
      return;
    }

    axios.post(`${BASE_URL}/user/register`, {first_name: firstname, last_name: lastname, email: email, password: password}).then( res => {
      if(res.data.success) {
        showSuccessToast(res.data.message);
        NavigationService.navigate(Routes.LOGIN_SCREEN);
      }else {
        setLoading(false);
        showErrorToast(res.data.message);
      }
    }).catch( err => {
      setLoading(false);
      showErrorToast('Server Error. Please try again.');
    });
    
  }

  const goLogin = () => {
    NavigationService.navigate(Routes.LOGIN_SCREEN);
    // this.props.navigation.navigate('REGISTER_SCREEN');
  }

  return (
    <Container>
      <LoadingActionContainer>
        <Section>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 70,
              color: theme.colors.defaultText,
              marginTop: 60,
              marginBottom: 20,
            }}>
            {t('welcome')}
          </Text>
        </Section>
        <Section>
          <InputX
            label="FIRST NAME"
            style={{backgroundColor: '#2695F0', borderBottom: '1px solid #fff', color:'#fff'}}
            autoCapitalize="none"
            returnKeyType={'next'}
            underlineColor={theme.colors.primary}
            onChangeText={text =>
              onChange({
                key: 'firstname',
                value: text,
              })
            }
            value={firstname}
          />
          <InputX
            label="LAST NAME"
            style={{backgroundColor: '#2695F0'}}
            underlineColor={theme.colors.primary}
            autoCapitalize="none"
            returnKeyType={'next'}
            onChangeText={text =>
              onChange({
                key: 'lastname',
                value: text,
              })
            }
            value={lastname}
          />
          <InputX
            label="EMAIL"
            // mode="outlined"
            style={{backgroundColor: '#2695F0'}}
            autoCapitalize="none"
            returnKeyType={'next'}
            underlineColor={theme.colors.primary}
            onChangeText={text =>
              onChange({
                key: 'email',
                value: text,
              })
            }
            value={email}
          />
          <PasswordInputX
            value={password}
            // mode="outlined"
            style={{backgroundColor: '#2695F0'}}
            label="PASSWORD"
            returnKeyType={'go'}
            underlineColor={theme.colors.primary}
            onChangeText={text =>
              onChange({
                key: 'password',
                value: text,
              })
            }
          />
        </Section>
        <Section>
          <Button
            loading={loading}
            mode="contained"
            style={{borderRadius: 30, marginLeft: 30, marginRight: 30, padding: 5}}
            color={loading ? theme.colors.accent : theme.colors.primary}
            onPress={registerUser}
          >
            <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                color: theme.colors.primaryText
              }}>
              {t('register')}
            </Text>
          </Button>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <View style={{flexDirection: "row", textAlign:'center', alignContent: "center",}}>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                  color: theme.colors.defaultText,
                }}>
                You have already account?
              </Text>
              <TouchableX onPress={goLogin}>
                <Text
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                  color: '#43c0ca',
                  marginLeft: 5,
                }}>{t('login')}</Text>
              </TouchableX>
            </View>
          </View>
          <Toast />
        </Section>
      </LoadingActionContainer>
      <BottomPanel />
    </Container>
  );
};
