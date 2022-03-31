/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import {Container, HeaderButton} from '../../Components';
import useAppTheme from '../../Themes/Context';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import useTranslation from '../../i18n';
import AssociationHomeItem from '../../Components/AssociationHomeItem';
import SecurityHomeItem from '../../Components/SecurityHomeItem'; 

const MainScreen = ({routes, navigation}) => {
  const {theme} = useAppTheme();
  const {t} = useTranslation();
  const [user, setUser] = useState({});
  // eslint-disable-next-line prettier/prettier
  useEffect( async () => {
    setUser(JSON.parse(await AsyncStorage.getItem('USER_INFO')));
  }, []);
  return (
      <LoadingActionContainer fixed>
        <Container
          style={{
            backgroundColor: theme.colors.primary,
            flex: 1,
          }}>
          <ScrollView>
              <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20,}}>
                  <Text style={{color: theme.colors.background, fontSize: 50}}>{t('welcome')}</Text>
                  <Text style={{color: '#eb6161', fontSize: 20}}>Smart Security Account</Text>
              </View>
              <SecurityHomeItem />
          </ScrollView>
        </Container>
      </LoadingActionContainer>
  );
};

export default MainScreen;
