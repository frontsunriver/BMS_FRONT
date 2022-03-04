/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {Text, Keyboard, View, Alert } from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {APP_STATE} from '../../Constants';
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
import AsyncStorage from '@react-native-community/async-storage';
import useAppTheme from '../../Themes/Context';
import useAuth from '../../Services/Auth';
import {showInfoToast, showErrorToast, showSuccessToast} from '../../Lib/Toast';
import Toast from 'react-native-tiny-toast';
import BottomPanel from '../../Components/Panel';
import useTranslation from '../../i18n';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { BASE_URL } from '../../Config';
import RemotePushController from '../../Services/RemotePushController';

export default () => {
  const onChange = useStoreActions(actions => actions.login.onLoginInputChange);
  const setState = useStoreActions(actions => actions.login.changeAppState);
  const state = useStoreState(store => store);
  const {t} = useTranslation();
  const {login} = useAuth();
  const {theme} = useAppTheme();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(false);

  const inputUserName = useRef();
  const inputPassword = useRef();

  const panelRef = useRef();

  useEffect( async () => {
    var userInfo = JSON.parse(await AsyncStorage.getItem('USER_INFO'));
    if(userInfo) {
      console.log("----------------------");
      setState(APP_STATE.PRIVATE);
    }
  }, [])
  

  const onSubmit = () => {
    inputPassword.current.focus();
  };

  const {username, password, status} = useStoreState(state => ({
    username: state.login.username,
    password: state.login.password,
    status: state.login.status,
  }));

  const loginUser = async () => {
    Keyboard.dismiss();
    setLoading(true);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!reg.test(username)) {
      showErrorToast('Please insert Correct Email format');
      setLoading(false);
      inputUserName.current.focus();
      return;
    }
    if (!username || !password) {
      showErrorToast('Username and password are mandatory, try again !');
      setLoading(false);
      return;
    }


    AsyncStorage.setItem("PUSH_TOKEN", token)

    var params = {email: username, password: password, token: token};

    axios.post(`${BASE_URL}/user/login`, params).then( res => {
      if(res.data.success) {
        showSuccessToast('Login success.');
        AsyncStorage.setItem("USER_INFO", JSON.stringify(res.data.data));
        setState(APP_STATE.PRIVATE);
      }else {
        console.log(res);
        setLoading(false);
        showErrorToast(res.data.message);
      }
    }).catch( err => {
      console.log(err);
      setLoading(false);
      showErrorToast('Server Error. Please try again.');
    });
  };

  const goRegister = () => {
    NavigationService.navigate(Routes.REGISTER_SCREEN);
  }

  const onToken = (token) => {
      setToken(token)
  }

  return (
    <Container style={{paddingLeft: 10, paddingRight: 10}}>
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
            label="USER NAME"
            // mode="outlined"
            ref={inputUserName}
            style={{backgroundColor: '#2695F0', borderBottom: '1px solid #fff', color:'#fff'}}
            autoCapitalize="none"
            returnKeyType={'next'}
            onSubmitEditing={onSubmit}
            underlineColor={theme.colors.primary}
            onChangeText={text =>
              onChange({
                key: 'username',
                value: text,
              })
            }
            value={username}
          />
          <PasswordInputX
            ref={inputPassword}
            value={password}
            // mode="outlined"
            style={{backgroundColor: '#2695F0', marginTop: 20}}
            label="PASSWORD"
            returnKeyType={'go'}
            onSubmitEditing={loginUser}
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
            onPress={loginUser}
          >
            <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                color: theme.colors.primaryText
              }}>
              {t('login')}
            </Text>
          </Button>
          {/* <View style={{alignItems: 'center', marginTop: 10}}>
            <View style={{flexDirection: "row", textAlign:'center', alignContent: "center",}}>
              <TouchableX onPress={goRegister}>
                <Text
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                  color: theme.colors.defaultText,
                  marginLeft: 5,
                }}>Forgot password?</Text>
              </TouchableX>
            </View>
          </View>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <View style={{flexDirection: "row", textAlign:'center', alignContent: "center",}}>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                  color: theme.colors.defaultText,
                }}>
                Don't have an account?
              </Text>
              <TouchableX onPress={goRegister}>
                <Text
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                  color: '#43c0ca',
                  marginLeft: 5,
                }}>{t('register')}</Text>
              </TouchableX>
            </View>
          </View> */}
          <Toast />
        </Section>
      </LoadingActionContainer>
      <BottomPanel ref={panelRef} />
      <RemotePushController onToken={onToken} />
    </Container>
  );
};
