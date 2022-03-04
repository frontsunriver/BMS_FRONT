import React, {useEffect, useCallback, useContext} from 'react';
import {Alert} from 'react-native';
import {APP_STATE} from '../../Constants';
import {resetLoginCredentials} from '../Keychain';
import {useStoreActions, useStoreState} from 'easy-peasy';
import useCheckVersion from '../CheckVersion';
import AsyncStorage from '@react-native-community/async-storage';

const AppStateContext = React.createContext();

export const useAppContext = () => {
  return useContext(AppStateContext);
};

export const AppContextProvider = props => {
  const {loginUser, setState, checkLogin, registerUser} = useStoreActions(actions => ({
    loginUser: actions.login.loginUser,
    setState: actions.login.changeAppState,
    checkLogin: actions.login.checkLogin,
    registerUser: actions.login.registerUser,
  }));
  useCheckVersion();
  const state = useStoreState(store => store.login.appstate);

  const _logoutUser = useCallback(async () => {
    const reset = resetLoginCredentials();
    if (reset) {
      // do logout
      await AsyncStorage.removeItem('USER_INFO');
      await AsyncStorage.removeItem('PUSH_TOKEN');
      setState(APP_STATE.PUBLIC);
    }
  }, [setState]);

  const logout = useCallback(() => {
    Alert.alert(
      'Please comfirm Logout',
      'Are you sure you want to logout from the app',
      [
        {
          text: 'Yes, Logout',
          onPress: _logoutUser,
        },
        {
          type: 'cancel',
          text: 'No, Stay here',
        },
      ],
    );
  }, [_logoutUser]);

  const login = useCallback(
    reqData => {
      console.log(reqData);
      loginUser(reqData);
    },
    [loginUser],
  );

  const register = useCallback(
    reqData => {
      registerUser(reqData);
    }, [registerUser],
  )

  // check loggedin on mount
  useEffect(() => {
    state === APP_STATE.UNKNOWN && checkLogin();
  }, [checkLogin, state]);

  return (
    <AppStateContext.Provider
      value={{
        state,
        logout,
        login,
        register,
      }}>
      {props.children}
    </AppStateContext.Provider>
  );
};

export default AppStateContext;
