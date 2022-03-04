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
import Routes from '../../Navigation/Routes';
import Toast from 'react-native-tiny-toast';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const UserOwnerBuilding = ({route, navigation}) => {
  const {t} = useTranslation();
  const {theme} = useAppTheme();
  const [serverData, setServerData] = useState([]);
  const { data } = route.params;
  const isFocused = useIsFocused();
  const navigate = useNavigation();

  useEffect(async () => {
    console.log(data.id);
    await axios.post(`${BASE_URL}user/search`, {id: data.id}).then(res => { 
    if(res.data.success) {
        if(res.data.data.length > 0){
          console.log(res.data.data);
          setServerData(res.data.data);
        }else {
          setServerData([]);
        }
    }
    }).catch(err => {
      console.log(err);
    });  
  }, [isFocused])

  const renderScreen = () => {
    if(serverData.length > 0) {
      var index = 0;
      return serverData.map(data => {
        return (
          <View key={index++} style={{backgroundColor: theme.colors.background, marginTop: 10, alignItems:'flex-start', alignContent:'space-between', marginTop: 5, padding: 10, borderRadius: 5}}>
              <UserInfo data={data.user_info}/>
              <View style={{flex: 1, padding: 10}}>
                <BuildingInfo data={data.building_info}/>
              </View>
              
          </View>
        )
      })
      
    }else {
      return(
        <View style={{flexDirection: 'column', marginTop: 10, justifyContent: 'center', alignItems:'center'}}>
          <Text>This user have no any buildings and units</Text>
        </View>
      )
    }
  }

  const submitHandle = () => {
    navigate.navigate(Routes.ASSOCIATION_ADD_BUILDINGS_UNITS, {data: data})
  }

  return (
      <LoadingActionContainer fixed>
        <Container
          style={{
            backgroundColor: theme.colors.primary,
            flex: 1,
          }}>
          <ScrollView>
          <View style={{flexDirection: 'column', padding: 20, }}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 5, borderBottomColor: '#e2e2e2', borderBottomWidth: 1}}>
                <Button
                    mode="contained"
                    style={{borderRadius: 5,}}
                    color={theme.colors.background}
                    onPress={submitHandle}
                >
                    <Text
                    style={{
                        fontSize: 15,
                        textAlign: 'center',
                        color: theme.colors.primary
                    }}>
                    ADD
                    </Text>
                </Button>
                </View>
            </View>
            <View style={{paddingBottom: 100}}>
              <View style={{flexDirection: 'column', justifyContent: 'center', padding: 20}}>
                {renderScreen()}
              </View>
            </View>
            <Toast />
          </ScrollView>
        </Container>
      </LoadingActionContainer>
  );
};

const UserInfo = (props) => {
  const {data} = props;
  return (
    <View style={{flexDirection:'column', paddingLeft: 10}}>
      <View><Text style={{fontSize: 18, borderBottomColor: '#e2e2e2', borderBottomWidth: 1, color: '#fff', paddingBottom: 5}}>{data.first_name} {data.last_name}</Text></View>
    </View>
  )
}

const BuildingInfo = (props) => {
  const navigation = useNavigation();
  const {data} = props;
  const [ownerData, setOwnerData] = useState(data);
  const goUpdateBuildingAndUnit = (item) => {
    navigation.navigate(Routes.ASSOCIATION_EDIT_OWNER_DETAIL, {data: item});
  }

  const deleteOwner = (item) => {
    console.log(item);
    Alert.alert(
      "Confirm",
      "Are you sure to delete?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          axios.post(`${BASE_URL}userowner/delete`, {id: item.id}).then(res => { 
            if(res.data.success){
              showSuccessToast('Delete success');
              var index = ownerData.indexOf(item);
              if (index !== -1) {
                var tmp = ownerData.filter((res1, i)=>{
                  return index != i
                });
                setOwnerData(tmp);
              }
            }else {
              showErrorToast(res.data.message);
            }
          });
          
        }}
      ]
    );
  }
  const renderContent = () => {
    if(data.length > 0) {
      return ownerData.map(item => {
        return (
          <TouchableOpacity key={item.id + item.unit_name + item.name} 
            onPress={() => {goUpdateBuildingAndUnit(item)}}
            onLongPress={() => {deleteOwner(item)}}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 20, borderRadius: 30, flexWrap: 'wrap', alignItems: 'flex-start', marginTop: 5}}>
              <Text style={{ color: '#000', width: '70%', fontSize: 15, fontWeight: 'bold'}}>{item.building_name}</Text>
              <View style={{width: '30%', justifyContent: 'flex-end', alignItems: 'flex-end', alignSelf: 'flex-end', alignContent: 'flex-end'}}>
                <Text style={{ color: '#000'}}>{item.unit_name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      })
    }else {
      return (
        <View><Text style={{ color: '#fff'}}>There is no unit and building</Text></View>
      )
    }
  }
  return (
    <View style={{flexDirection:'column', justifyContent: 'space-between', padding: 10}}>
      {renderContent()}
    </View>
  )
}

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

export default UserOwnerBuilding;