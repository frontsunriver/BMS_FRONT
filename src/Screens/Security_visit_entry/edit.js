import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Keyboard } from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import { Button } from 'react-native-paper';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import useTranslation from '../../i18n';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FooterScreen from '../../Components/FooterScreen';
import {Container} from '../../Components';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {convertDateFormat, convertTimeFormat} from '../../Utils/DateHelper';
import axios from 'axios';
import { BASE_URL } from '../../Config';
import AsyncStorage from '@react-native-community/async-storage';
import {showInfoToast, showErrorToast, showSuccessToast} from '../../Lib/Toast';
import Toast from 'react-native-tiny-toast';
import NavigationService from '../../Navigation';
import Routes from '../../Navigation/Routes';
import moment from 'moment';

const SecurityVisitEdit = ({route, navigation}) => {
  const {t} = useTranslation();
  const {theme} = useAppTheme();
  const {data} = route.params;
  const [user, setUser] = useState({});
  const [dropdown, setDropdown] = useState(null);
  const [unitDropDown, setUnitDropDown] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [dateString, setDateString] = useState(new Date(data.visit_date));
  const [timeString, setTimeString] = useState(new Date('2022-01-03 ' + moment(data.visit_time, ["h:mm A"]).format("HH:mm:ss")));
  const [buildingData, setBuildingData] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [name, setName] = useState(data.name);
  const [eid, setEid] = useState(data.eid);
  const [mobile, setMobile] = useState(data.mobile);
  const [purpose, setPurpose] = useState(data.purpose);
  const [company, setCompany] = useState(data.company);

  useEffect( async () => {
    let isMounted = true;   
    if(isMounted) {
        var userInfo = JSON.parse(await AsyncStorage.getItem('USER_INFO'));
        let buildingList = [{id: userInfo.building_id, name: userInfo.building_name}];
        setBuildingData(buildingList);
        setDropdown(userInfo.building_id);
        setUser(userInfo);
    }
    return () => { isMounted = false };    
  }, []);

//   useEffect( () => {
//     setDropdown(data.building_id);
//   }, [buildingData])

  const _renderItem = item => {
    return (
    <View>
        <Text>{item.name}</Text>
    </View>
    );
  };

  const _renderItem1 = item => {
    return (
    <View>
        <Text>{item.unit_name}</Text>
    </View>
    );
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateString(date);
    hideDatePicker();
  };

  const handleTimeConfirm = (time) => {
    setTimeString(time);
    hideTimePicker();
  };

  useEffect( () => {
    console.log(dropdown);
    axios.post(`${BASE_URL}visit/getUnitList`, {building_id: dropdown}).then( res => {
      if(res.data.success) {
        setUnitData(res.data.data);
        setUnitDropDown(data.unit_id);
      }
    }).catch(err => {
    });
  }, [dropdown])

  useEffect(() => {
    setUnitDropDown(data.unit_id);
  }, [unitData])

  const objCast = (obj) => {
    return obj.name;
  }

  const submitHandle = async (e) => {
    Keyboard.dismiss();
    if(!formValidation().success){
      showErrorToast(formValidation().message);
      return;
    }
    
    var formData = new FormData();
    formData.append('name', name);
    formData.append('purpose', purpose);
    formData.append('mobile', mobile);
    formData.append('company', company);
    formData.append('eid', eid);
    formData.append('building_id', dropdown);
    formData.append('unit_id', unitDropDown);
    formData.append('visit_date', convertDateFormat(dateString));
    formData.append('visit_time', convertTimeFormat(timeString));
    formData.append('id', data.id);

    await axios.post(`${BASE_URL}visit/update`, formData,
    { headers: { 'Content-Type': 'multipart/form-data', 'X-Requested-With': 'XMLHttpRequest', }}).then(res => { 
      showSuccessToast('Update Successfully.');
      NavigationService.navigate(Routes.SECURITY_VISIT_ENTRY_HOME);
    }).catch(err => {
      console.log(err);
      showErrorToast('Something went wrong! Please try again.');
    });
  }

  const formValidation = () => {
    var result = true;
    var message = "";
    var res = {};
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!name || name == ''){
      message = "Please insert the Name";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }
    if(!mobile || mobile == ''){
      message = "Please insert the mobile";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }

    if(!purpose || purpose == ''){
      message = "Please insert the purpose";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }

    if(!dropdown) {
      message = "Please select the building";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }

    if(!unitDropDown) {
      message = "Please select the unit";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }

    if(!dateString) {
      message = "Please check the visit date";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }

    if(!timeString) {
        message = "Please check the visit time";
        result = false;
        res['success'] = result;
        res['message'] = message;
        return res;
    }

    if(!company) {
        message = "Please check the company";
        result = false;
        res['success'] = result;
        res['message'] = message;
        return res;
    }

    if(!eid) {
        message = "Please check the eid";
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
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Select Building')}</Text>
                  <Dropdown
                    data={buildingData}
                    style={styles.dropdown}
                    containerStyle={styles.shadow}
                    search
                    searchPlaceholder="Search Building"
                    labelField="name"
                    valueField="id"
                    label="Building"
                    placeholder="Select Building"
                    value={dropdown}
                    onChange={item => {
                      setDropdown(item.id);
                    }}
                    // renderLeftIcon={() => (
                    //     <Image style={styles.icon} source={require('./assets/account.png')} />
                    // )}
                    renderItem={item => _renderItem(item)}
                    textError="Error"
                  />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Select Unit')}</Text>
                  <Dropdown
                    data={unitData}
                    style={styles.dropdown}
                    containerStyle={styles.shadow}
                    search
                    searchPlaceholder="Search Unit"
                    labelField="unit_name"
                    valueField="unit_id"
                    label="Unit"
                    placeholder="Select Unit"
                    value={unitDropDown}
                    onChange={item => {
                      setUnitDropDown(item.unit_id);
                    }}
                    // renderLeftIcon={() => (
                    //     <Image style={styles.icon} source={require('./assets/account.png')} />
                    // )}
                    renderItem={item => _renderItem1(item)}
                    textError="Error"
                  />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Visit Date')}</Text>
                  <TouchableOpacity onPress={showDatePicker}>
                    <View style={styles.dateTouchable}>
                      <Text>{convertDateFormat(dateString)}</Text>
                      <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Visit Time')}</Text>
                  <TouchableOpacity onPress={showTimePicker}>
                    <View style={styles.dateTouchable}>
                      <Text>{convertTimeFormat(timeString)}</Text>
                      <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        format='h:mm a'
                        onConfirm={handleTimeConfirm}
                        onCancel={hideTimePicker}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Mobile')}</Text>
                  <TextInput value={mobile} style={styles.textfield} name="mobile" onChangeText={text => setMobile(text)}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Name')}</Text>
                  <TextInput value={name} style={styles.textfield} name="name" onChangeText={text => setName(text)}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Purpose')}</Text>
                  <TextInput value={purpose} style={styles.textfield} name="purpose" multiline={true} numberOfLines={5} onChangeText={text => setPurpose(text)}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Company')}</Text>
                  <TextInput value={company} style={styles.textfield} name="company" onChangeText={text => setCompany(text)}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('EID Number')}</Text>
                  <TextInput value={eid} style={styles.textfield} name="eid" onChangeText={text => setEid(text)}/>
                </View>
                <View style={{borderBottomWidth: 1, borderBottomColor: '#e2e2e2', marginTop: 15}}></View>
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

export default SecurityVisitEdit;
