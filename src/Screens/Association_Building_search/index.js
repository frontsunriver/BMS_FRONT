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
import AssociationFooterScreen from '../../Components/AssociationFooterScreen';
import {showInfoToast, showErrorToast, showSuccessToast} from '../../Lib/Toast';
import { Searchbar } from 'react-native-paper';
import Toast from 'react-native-tiny-toast';
import NavigationService from '../../Navigation';
import Routes from '../../Navigation/Routes';


const A_Report = ({route, navigation}) => {
  const {t} = useTranslation();
  const {theme} = useAppTheme();
  const [serverData, setServerData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const renderScreen = () => {
    if(serverData.length > 0) {
      return serverData.map(data => {
        return (
          <View key={data.id} style={{flexDirection: 'column', marginTop: 10, alignItems:'center', alignContent:'space-between'}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignContent:'space-around', alignItems:'center'}}>
              <View style={{flex: 1}}><Text>{data.name}</Text></View>
              <View style={{flex: 1, alignItems:'flex-end'}}><Text>{data.address}</Text></View>
            </View>
          </View>
        )
      })
      
    }else {
      return(
        <View style={{flexDirection: 'column', marginTop: 10, justifyContent: 'center', alignItems:'center'}}>
          <Text>There is no matched data</Text>
        </View>
      )
    }
  }

  const onChangeSearch = async (t) => {
    setSearchQuery(t);
  }

  useEffect(async () => {
    if(searchQuery != ''){
      await axios.post(`${BASE_URL}building/search`, {query: searchQuery}).then(res => { 
        if(res.data.success)
          setServerData(res.data.data);
      }).catch(err => {
        showErrorToast('Something went wrong! Please try again.');
      });  
    }else {
      setServerData([]);
    }
    
  }, [searchQuery])

  return (
      <LoadingActionContainer fixed>
        <Container
          style={{
            backgroundColor: theme.colors.primary,
            flex: 1,
          }}>
          <Searchbar
            placeholder="Search the building name"
            onChangeText={onChangeSearch}
            inputStyle={theme.colors.background}
            style={{backgroundColor: '#e2e2e2', marginRight: 20, marginLeft: 20, marginTop: 10}}
            iconColor='#000'
            value={searchQuery}
          />
          <ScrollView>
            <View style={{paddingBottom: 100}}>
              <View style={{flexDirection: 'column', justifyContent: 'center', padding: 20}}>
                {renderScreen()}
              </View>
            </View>
            <Toast />
          </ScrollView>
          <AssociationFooterScreen />
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

export default A_Report;
